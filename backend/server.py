from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
from emergentintegrations.llm.chat import LlmChat, UserMessage
import jwt
import hashlib
import secrets


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Configuration
JWT_SECRET = os.environ.get('JWT_SECRET', secrets.token_hex(32))
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

# Security
security = HTTPBearer()

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ============== MODELS ==============

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

# Admin Models
class AdminLogin(BaseModel):
    username: str
    password: str

class AdminCreate(BaseModel):
    username: str
    password: str
    email: Optional[str] = None

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    admin_id: str
    username: str

# Lead/Submission Models
class LeadCreate(BaseModel):
    name: str
    email: str
    phone: str
    telegram: Optional[str] = None
    company: Optional[str] = None
    service: str
    budget: str
    message: str
    source: str = "contact_form"

class LeadResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    telegram: Optional[str] = None
    company: Optional[str] = None
    service: str
    budget: str
    message: str
    source: str
    status: str
    created_at: str
    updated_at: str

class LeadStatusUpdate(BaseModel):
    status: str  # new, in_progress, closed

# Call Scheduling Models
class CallScheduleCreate(BaseModel):
    name: str
    phone: str
    telegram: Optional[str] = None
    date: str
    time: str

class CallScheduleResponse(BaseModel):
    id: str
    name: str
    phone: str
    telegram: Optional[str] = None
    date: str
    time: str
    status: str
    created_at: str

# Live Chat Models
class LiveChatCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    telegram: Optional[str] = None
    message: str

class LiveChatResponse(BaseModel):
    id: str
    name: str
    phone: str
    email: Optional[str] = None
    telegram: Optional[str] = None
    message: str
    status: str
    created_at: str

# AI Conversation Models
class AIConversationResponse(BaseModel):
    id: str
    session_id: str
    messages: List[dict]
    created_at: str
    last_message_at: str

# Statistics Models
class DashboardStats(BaseModel):
    total_leads: int
    new_leads: int
    in_progress_leads: int
    closed_leads: int
    total_calls: int
    total_chats: int
    total_ai_conversations: int
    leads_by_service: dict
    leads_by_budget: dict
    leads_by_day: List[dict]


# ============== HELPER FUNCTIONS ==============

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password: str, hashed: str) -> bool:
    return hash_password(password) == hashed

def create_jwt_token(admin_id: str, username: str) -> str:
    expiration = datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    payload = {
        "sub": admin_id,
        "username": username,
        "exp": expiration
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_jwt_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = verify_jwt_token(token)
    admin = await db.admins.find_one({"id": payload["sub"]}, {"_id": 0})
    if not admin:
        raise HTTPException(status_code=401, detail="Admin not found")
    return admin


# ============== AI SYSTEM PROMPT ==============

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

📈 РЕАЛЬНЫЕ КЕЙСЫ:
1. "КазахТекстиль" (Казахстан): с 0 до $2M/год за 8 месяцев
2. "FashionUA" (Украина): ROAS 12x на таргете, рост продаж 340%
3. "RuBeauty" (Россия): 50K подписчиков email, 23% open rate
4. "TechBY" (Беларусь): интеграция с 5 маркетплейсами, автоматизация
5. "UzFood" (Узбекистан): первый премиум-магазин продуктов в стране

💬 СТИЛЬ ОБЩЕНИЯ:
1. Отвечай как опытный ментор — уверенно, но доступно
2. Используй конкретные цифры и примеры
3. Если не знаешь точный ответ — признай это, но предложи разобраться на консультации
4. Будь дружелюбным, используй emoji умеренно
5. Давай практичные советы, которые клиент может применить сразу
6. Если клиент готов — предлагай бесплатную 30-минутную консультацию
7. Отвечай на русском языке
8. Ответы должны быть информативными, но не слишком длинными (2-4 абзаца максимум)"""


# ============== BASIC ROUTES ==============

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


# ============== AI CHAT ROUTE ==============

@api_router.post("/ai/chat", response_model=AIResponse)
async def ai_chat(message: AIMessage):
    try:
        api_key = os.environ.get('EMERGENT_LLM_KEY')
        
        chat = LlmChat(
            api_key=api_key,
            session_id=message.session_id,
            system_message=AI_SYSTEM_PROMPT
        ).with_model("openai", "gpt-4o")
        
        user_text = message.message
        if message.context:
            user_text = f"Контекст: {message.context}\n\nВопрос: {message.message}"
        
        user_message = UserMessage(text=user_text)
        response = await chat.send_message(user_message)
        
        # Generate suggestions
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
        
        # Store conversation in DB with full details
        now = datetime.now(timezone.utc).isoformat()
        
        # Find or create conversation session
        existing_conv = await db.ai_conversations.find_one({"session_id": message.session_id})
        
        if existing_conv:
            # Add message to existing conversation
            await db.ai_conversations.update_one(
                {"session_id": message.session_id},
                {
                    "$push": {
                        "messages": {
                            "role": "user",
                            "content": message.message,
                            "timestamp": now
                        }
                    },
                    "$set": {"last_message_at": now}
                }
            )
            await db.ai_conversations.update_one(
                {"session_id": message.session_id},
                {
                    "$push": {
                        "messages": {
                            "role": "assistant",
                            "content": response,
                            "timestamp": now
                        }
                    }
                }
            )
        else:
            # Create new conversation
            await db.ai_conversations.insert_one({
                "id": str(uuid.uuid4()),
                "session_id": message.session_id,
                "messages": [
                    {"role": "user", "content": message.message, "timestamp": now},
                    {"role": "assistant", "content": response, "timestamp": now}
                ],
                "created_at": now,
                "last_message_at": now
            })
        
        return AIResponse(response=response, suggestions=suggestions)
        
    except Exception as e:
        logger.error(f"AI Chat Error: {str(e)}")
        return AIResponse(
            response="Извините, произошла ошибка. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую! 📞",
            suggestions=["Связаться с нами", "Попробовать снова"]
        )


# ============== LEAD/FORM SUBMISSION ROUTES ==============

@api_router.post("/leads", response_model=LeadResponse)
async def create_lead(lead: LeadCreate):
    now = datetime.now(timezone.utc).isoformat()
    lead_doc = {
        "id": str(uuid.uuid4()),
        **lead.model_dump(),
        "status": "new",
        "created_at": now,
        "updated_at": now
    }
    await db.leads.insert_one(lead_doc)
    del lead_doc["_id"] if "_id" in lead_doc else None
    return LeadResponse(**lead_doc)

@api_router.post("/calls", response_model=CallScheduleResponse)
async def create_call_schedule(call: CallScheduleCreate):
    now = datetime.now(timezone.utc).isoformat()
    call_doc = {
        "id": str(uuid.uuid4()),
        **call.model_dump(),
        "status": "scheduled",
        "created_at": now
    }
    await db.calls.insert_one(call_doc)
    del call_doc["_id"] if "_id" in call_doc else None
    return CallScheduleResponse(**call_doc)

@api_router.post("/livechat", response_model=LiveChatResponse)
async def create_livechat(chat: LiveChatCreate):
    now = datetime.now(timezone.utc).isoformat()
    chat_doc = {
        "id": str(uuid.uuid4()),
        **chat.model_dump(),
        "status": "new",
        "created_at": now
    }
    await db.livechats.insert_one(chat_doc)
    del chat_doc["_id"] if "_id" in chat_doc else None
    return LiveChatResponse(**chat_doc)


# ============== ADMIN AUTH ROUTES ==============

@api_router.post("/admin/register", response_model=TokenResponse)
async def register_admin(admin: AdminCreate):
    # Check if admin already exists
    existing = await db.admins.find_one({"username": admin.username})
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    admin_id = str(uuid.uuid4())
    admin_doc = {
        "id": admin_id,
        "username": admin.username,
        "password": hash_password(admin.password),
        "email": admin.email,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.admins.insert_one(admin_doc)
    
    token = create_jwt_token(admin_id, admin.username)
    return TokenResponse(access_token=token, admin_id=admin_id, username=admin.username)

@api_router.post("/admin/login", response_model=TokenResponse)
async def login_admin(login: AdminLogin):
    admin = await db.admins.find_one({"username": login.username}, {"_id": 0})
    if not admin or not verify_password(login.password, admin["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_jwt_token(admin["id"], admin["username"])
    return TokenResponse(access_token=token, admin_id=admin["id"], username=admin["username"])

@api_router.get("/admin/me")
async def get_current_admin_info(admin: dict = Depends(get_current_admin)):
    return {"id": admin["id"], "username": admin["username"], "email": admin.get("email")}


# ============== ADMIN DATA ROUTES (Protected) ==============

@api_router.get("/admin/dashboard", response_model=DashboardStats)
async def get_dashboard_stats(admin: dict = Depends(get_current_admin)):
    # Get lead counts
    total_leads = await db.leads.count_documents({})
    new_leads = await db.leads.count_documents({"status": "new"})
    in_progress_leads = await db.leads.count_documents({"status": "in_progress"})
    closed_leads = await db.leads.count_documents({"status": "closed"})
    
    # Get other counts
    total_calls = await db.calls.count_documents({})
    total_chats = await db.livechats.count_documents({})
    total_ai_conversations = await db.ai_conversations.count_documents({})
    
    # Leads by service
    pipeline_service = [
        {"$group": {"_id": "$service", "count": {"$sum": 1}}}
    ]
    leads_by_service_cursor = db.leads.aggregate(pipeline_service)
    leads_by_service = {doc["_id"]: doc["count"] async for doc in leads_by_service_cursor}
    
    # Leads by budget
    pipeline_budget = [
        {"$group": {"_id": "$budget", "count": {"$sum": 1}}}
    ]
    leads_by_budget_cursor = db.leads.aggregate(pipeline_budget)
    leads_by_budget = {doc["_id"]: doc["count"] async for doc in leads_by_budget_cursor}
    
    # Leads by day (last 30 days)
    thirty_days_ago = (datetime.now(timezone.utc) - timedelta(days=30)).isoformat()
    pipeline_daily = [
        {"$match": {"created_at": {"$gte": thirty_days_ago}}},
        {"$project": {"date": {"$substr": ["$created_at", 0, 10]}}},
        {"$group": {"_id": "$date", "count": {"$sum": 1}}},
        {"$sort": {"_id": 1}}
    ]
    leads_by_day_cursor = db.leads.aggregate(pipeline_daily)
    leads_by_day = [{"date": doc["_id"], "count": doc["count"]} async for doc in leads_by_day_cursor]
    
    return DashboardStats(
        total_leads=total_leads,
        new_leads=new_leads,
        in_progress_leads=in_progress_leads,
        closed_leads=closed_leads,
        total_calls=total_calls,
        total_chats=total_chats,
        total_ai_conversations=total_ai_conversations,
        leads_by_service=leads_by_service,
        leads_by_budget=leads_by_budget,
        leads_by_day=leads_by_day
    )

@api_router.get("/admin/leads")
async def get_all_leads(
    status: Optional[str] = None,
    service: Optional[str] = None,
    limit: int = 100,
    skip: int = 0,
    admin: dict = Depends(get_current_admin)
):
    query = {}
    if status:
        query["status"] = status
    if service:
        query["service"] = service
    
    leads = await db.leads.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    total = await db.leads.count_documents(query)
    
    return {"leads": leads, "total": total}

@api_router.put("/admin/leads/{lead_id}/status")
async def update_lead_status(lead_id: str, update: LeadStatusUpdate, admin: dict = Depends(get_current_admin)):
    if update.status not in ["new", "in_progress", "closed"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    result = await db.leads.update_one(
        {"id": lead_id},
        {"$set": {"status": update.status, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    return {"message": "Status updated"}

@api_router.get("/admin/calls")
async def get_all_calls(
    status: Optional[str] = None,
    limit: int = 100,
    skip: int = 0,
    admin: dict = Depends(get_current_admin)
):
    query = {}
    if status:
        query["status"] = status
    
    calls = await db.calls.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    total = await db.calls.count_documents(query)
    
    return {"calls": calls, "total": total}

@api_router.put("/admin/calls/{call_id}/status")
async def update_call_status(call_id: str, status: str, admin: dict = Depends(get_current_admin)):
    if status not in ["scheduled", "completed", "cancelled"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    result = await db.calls.update_one({"id": call_id}, {"$set": {"status": status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Call not found")
    
    return {"message": "Status updated"}

@api_router.get("/admin/livechats")
async def get_all_livechats(
    status: Optional[str] = None,
    limit: int = 100,
    skip: int = 0,
    admin: dict = Depends(get_current_admin)
):
    query = {}
    if status:
        query["status"] = status
    
    chats = await db.livechats.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    total = await db.livechats.count_documents(query)
    
    return {"chats": chats, "total": total}

@api_router.put("/admin/livechats/{chat_id}/status")
async def update_livechat_status(chat_id: str, status: str, admin: dict = Depends(get_current_admin)):
    if status not in ["new", "responded", "closed"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    result = await db.livechats.update_one({"id": chat_id}, {"$set": {"status": status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Chat not found")
    
    return {"message": "Status updated"}

@api_router.get("/admin/ai-conversations")
async def get_ai_conversations(
    limit: int = 100,
    skip: int = 0,
    admin: dict = Depends(get_current_admin)
):
    conversations = await db.ai_conversations.find({}, {"_id": 0}).sort("last_message_at", -1).skip(skip).limit(limit).to_list(limit)
    total = await db.ai_conversations.count_documents({})
    
    return {"conversations": conversations, "total": total}

@api_router.get("/admin/ai-conversations/{session_id}")
async def get_ai_conversation_detail(session_id: str, admin: dict = Depends(get_current_admin)):
    conversation = await db.ai_conversations.find_one({"session_id": session_id}, {"_id": 0})
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    return conversation

@api_router.get("/admin/export/leads")
async def export_leads_csv(admin: dict = Depends(get_current_admin)):
    leads = await db.leads.find({}, {"_id": 0}).to_list(10000)
    
    # Generate CSV content
    if not leads:
        return {"csv": "No data"}
    
    headers = ["id", "name", "email", "phone", "telegram", "company", "service", "budget", "message", "status", "source", "created_at"]
    csv_lines = [",".join(headers)]
    
    for lead in leads:
        row = [str(lead.get(h, "")).replace(",", ";").replace("\n", " ") for h in headers]
        csv_lines.append(",".join(row))
    
    return {"csv": "\n".join(csv_lines)}


# ============== APP SETUP ==============

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
