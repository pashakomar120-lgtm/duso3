from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from emergentintegrations.llm.chat import LlmChat, UserMessage


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class AIMessage(BaseModel):
    session_id: str
    message: str
    context: Optional[str] = None

class AIResponse(BaseModel):
    response: str
    suggestions: List[str] = []

# AI System prompt for the assistant
AI_SYSTEM_PROMPT = """Ты — AI-консультант duso_ecom, ведущего e-commerce агентства №1 в СНГ. 
Ты помогаешь клиентам:
1. Понять какие услуги им нужны
2. Оценить бюджет проекта
3. Узнать о наших возможностях
4. Получить рекомендации по развитию онлайн-бизнеса

НАШИ УСЛУГИ И ЦЕНЫ:
- Shopify магазин: от $2,500 (🎁 Бонус: 10 топовых товаров для продажи бесплатно)
- Структура и дизайн: от $3,000
- Платёжные системы: от $500
- Оптимизация сайта: от $800
- Таргетированная реклама: от $1,500/мес
- Доставка и логистика: от $700
- Аналитика: от $600
- SEO: от $1,000
- Email-автоматизация: от $900
- Поддержка: от $200/мес

НАШИ ДОСТИЖЕНИЯ:
- 6500+ успешных проектов
- 8 стран СНГ (Россия, Украина, Казахстан, Беларусь, Узбекистан, Азербайджан, Грузия, Армения)
- $3B+ оборот клиентов
- 98% довольных клиентов
- Shopify Plus Partner

ПРАВИЛА:
1. Отвечай на русском языке
2. Будь дружелюбным и профессиональным
3. Предлагай конкретные решения
4. Если клиент готов — предложи бесплатную консультацию
5. Используй emoji для дружелюбности
6. Давай краткие, но информативные ответы"""

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/ai/chat", response_model=AIResponse)
async def ai_chat(message: AIMessage):
    try:
        api_key = os.environ.get('EMERGENT_LLM_KEY')
        
        chat = LlmChat(
            api_key=api_key,
            session_id=message.session_id,
            system_message=AI_SYSTEM_PROMPT
        ).with_model("openai", "gpt-4o")
        
        # Build the user message
        user_text = message.message
        if message.context:
            user_text = f"Контекст: {message.context}\n\nВопрос: {message.message}"
        
        user_message = UserMessage(text=user_text)
        
        response = await chat.send_message(user_message)
        
        # Generate suggestions based on message content
        suggestions = []
        msg_lower = message.message.lower()
        
        if any(word in msg_lower for word in ['магазин', 'shopify', 'создать', 'разработка']):
            suggestions = ["Сколько стоит создание магазина?", "Какие гарантии?", "Сроки разработки"]
        elif any(word in msg_lower for word in ['цена', 'стоимость', 'бюджет', 'сколько']):
            suggestions = ["Что входит в стоимость?", "Есть ли рассрочка?", "Какие бонусы?"]
        elif any(word in msg_lower for word in ['маркетинг', 'реклама', 'продвижение']):
            suggestions = ["Какая конверсия у ваших клиентов?", "Сколько стоит реклама?", "Есть ли кейсы?"]
        else:
            suggestions = ["Какие услуги вы предлагаете?", "Покажите портфолио", "Получить консультацию"]
        
        # Store conversation in DB
        await db.ai_conversations.insert_one({
            "session_id": message.session_id,
            "user_message": message.message,
            "ai_response": response,
            "timestamp": datetime.now(timezone.utc).isoformat()
        })
        
        return AIResponse(response=response, suggestions=suggestions)
        
    except Exception as e:
        logger.error(f"AI Chat Error: {str(e)}")
        return AIResponse(
            response="Извините, произошла ошибка. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую! 📞",
            suggestions=["Связаться с нами", "Попробовать снова"]
        )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()