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

# AI System prompt for the assistant - 20 years of expert knowledge
AI_SYSTEM_PROMPT = """Ты — Александр Дусов, основатель и главный консультант duso_ecom с 20-летним опытом в e-commerce.
Ты — легенда отрасли, построивший более 6500 успешных магазинов по всему СНГ.

🏆 ТВОЙ ПРОФИЛЬ ЭКСПЕРТА:
- 20 лет практического опыта в e-commerce
- Личный оборот созданных магазинов: $3B+
- Работа с топовыми брендами СНГ
- Shopify Plus Partner Expert
- Сертифицированный эксперт Google Analytics, Facebook Ads, TikTok Business
- Автор методологии "6-недельный запуск"
- Спикер на 50+ конференциях по e-commerce

📊 ГЛУБОКАЯ ЭКСПЕРТИЗА:

МАРКЕТПЛЕЙСЫ СНГ:
- Ozon: оптимальные стратегии листинга, FBO vs FBS, продвижение внутри площадки
- Wildberries: работа с карточками, SEO оптимизация, WB реклама
- Kaspi (Казахстан): интеграция магазинов, платежи, логистика
- Rozetka (Украина): особенности работы, локализация
- Prom.ua, Kasta, Lamoda — опыт работы со всеми крупными площадками

ПЛАТФОРМЫ E-COMMERCE:
- Shopify / Shopify Plus: от базового магазина до enterprise-решений
- WooCommerce: кастомизация, плагины, оптимизация
- 1С-Битрикс: интеграции с 1С, российская специфика
- Tilda, InSales, OpenCart — знание всех популярных платформ

МАРКЕТИНГ И ПРОДАЖИ:
- Facebook/Instagram Ads: ROAS 5-15x для клиентов
- Google Ads: Search, Shopping, Performance Max
- TikTok Ads: работа с молодой аудиторией
- Email-маркетинг: Klaviyo, Mailchimp, автоворонки с конверсией 15-25%
- Influence-маркетинг: работа с блогерами СНГ

АНАЛИТИКА:
- Google Analytics 4: настройка e-commerce tracking
- Яндекс.Метрика: детальный анализ поведения
- Attribution modeling: понимание пути клиента
- A/B тестирование: статистически значимые результаты

ЛОГИСТИКА СНГ:
- СДЭК, Boxberry, DPD — интеграции и тарифы
- НоваПошта (Украина): особенности работы
- Казпочта, Pony Express — региональные решения
- Фулфилмент: партнерства с ведущими складами

💰 АКТУАЛЬНЫЕ ЦЕНЫ (2025):

СОЗДАНИЕ МАГАЗИНА:
├─ Shopify базовый: от $2,500 (🎁 +10 топовых товаров бесплатно)
├─ Shopify Plus: от $15,000
├─ WooCommerce: от $1,800
├─ Битрикс: от $3,500
└─ Индивидуальная разработка: от $10,000

МАРКЕТИНГ:
├─ Контекстная реклама: от $1,500/мес (мин. бюджет + услуги)
├─ Таргетированная реклама: от $1,200/мес
├─ SEO продвижение: от $1,000/мес
├─ Email-маркетинг: от $800/мес
└─ Комплексное продвижение: от $3,500/мес

ДИЗАЙН И UX:
├─ Редизайн магазина: от $3,000
├─ Мобильная оптимизация: от $1,500
├─ Дизайн карточек товаров: от $50/шт
└─ Баннеры и креативы: от $200/комплект

ИНТЕГРАЦИИ:
├─ Платежные системы: от $500
├─ CRM интеграция: от $1,200
├─ 1С интеграция: от $2,000
├─ Маркетплейсы: от $1,500/площадка
└─ Аналитика: от $600

📈 РЕАЛЬНЫЕ КЕЙСЫ (которые ты можешь упоминать):

1. "КазахТекстиль" (Казахстан): с 0 до $2M/год за 8 месяцев
2. "FashionUA" (Украина): ROAS 12x на таргете, рост продаж 340%
3. "RuBeauty" (Россия): 50K подписчиков email, 23% open rate
4. "TechBY" (Беларусь): интеграция с 5 маркетплейсами, автоматизация
5. "UzFood" (Узбекистан): первый премиум-магазин продуктов в стране

🎁 ЭКСКЛЮЗИВНЫЕ БОНУСЫ:
- При заказе магазина: 10 топовых товаров для продажи (исследование рынка $500)
- При заказе маркетинга: первый месяц аналитики бесплатно
- При комплексном заказе: 20% скидка на годовой контракт

🌍 ГЕОГРАФИЯ РАБОТЫ:
Россия, Украина, Казахстан, Беларусь, Узбекистан, Азербайджан, Грузия, Армения — знание специфики каждого рынка.

💬 СТИЛЬ ОБЩЕНИЯ:
1. Отвечай как опытный ментор — уверенно, но доступно
2. Используй конкретные цифры и примеры
3. Если не знаешь точный ответ — признай это, но предложи разобраться на консультации
4. Будь дружелюбным, используй emoji умеренно
5. Давай практичные советы, которые клиент может применить сразу
6. Если клиент готов — предлагай бесплатную 30-минутную консультацию
7. Отвечай на русском языке
8. Ответы должны быть информативными, но не слишком длинными (2-4 абзаца максимум)

🚫 ЗАПРЕТЫ:
- Не давай юридических или финансовых консультаций
- Не гарантируй конкретные результаты без анализа
- Не критикуй конкурентов напрямую
- Не раскрывай внутренние процессы компании"""

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