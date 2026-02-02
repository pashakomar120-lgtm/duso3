# PRD - Shopify Theme Migration

## Original Problem Statement
Migrate existing React application to a native Shopify theme. Must be a **1:1 visual and functional clone** of the original site. 

## What's Been Implemented (2025-02-02)

### ✅ ВИПРАВЛЕНО (Поточна сесія)

**1. AI Асистент**
- Підключено до реального backend API `/api/ai/chat`
- Використовує GPT-4o через Emergent LLM Key
- Session ID для збереження історії розмов
- Fallback на локальні відповіді при помилках API
- Секретний код `квантовий кіт шрёдінгера 2047` працює

**2. Dropdown стилі (Contact page)**
- Виправлено білий фон на темний `#111827`
- Додано глобальні стилі для select/option в theme.css

**3. Вторинні сторінки (Shopify OS 2.0)**
- Використовуються JSON templates (`page.*.json`)
- Всі сторінки мають повний контент:
  - `/pages/services` - 12 послуг з цінами
  - `/pages/about` - Про компанію, команда, цінності
  - `/pages/portfolio` - 6 проектів з СНГ
  - `/pages/contact` - Форма з dropdown

**4. Кнопки в секції Portfolio (Case Studies)**
- Всі картки ведуть на `/pages/portfolio`
- Hover ефекти працюють

**5. Секція Services (Homepage)**
- Табована структура: 6 табів
- Контент змінюється при кліку на таб
- Подарунки та списки фіч

### ⚠️ ВАЖЛИВО для Shopify

Щоб сторінки працювали в Shopify, потрібно:
1. Створити Page в Shopify Admin з handle: `about`, `services`, `portfolio`, `contact`
2. Присвоїти кожній сторінці відповідний template (`page.about`, `page.services`, etc.)
3. Для AI Асистента потрібно налаштувати API URL в theme.js (змінна `AI_API_URL`)

## Download Theme
**URL:** https://liquid-migration-1.preview.emergentagent.com/shopify-theme.zip

## Credentials
- **AI Code Word:** `квантовий кіт шрёдінгера 2047`
- **Admin Login:** `duso_phantom_x7`
- **Admin Password:** `Zk9#mNp$vR2@qLw8!xYj`

## Pending Tasks (P2)
- [ ] Додати анімації та ефекти для 1:1 візуальної відповідності
- [ ] Email сповіщення для нових заявок
- [ ] Аудит продуктивності теми

## Architecture
```
/app/shopify-theme/
├── assets/
│   ├── theme.css     # Стилі + select dropdown fix
│   └── theme.js      # AI assistant з API інтеграцією
├── layout/
│   └── theme.liquid  # Головний layout
├── sections/
│   ├── *-page-content.liquid  # Контент вторинних сторінок
│   └── *.liquid               # Секції головної сторінки
└── templates/
    ├── page.*.json   # Shopify OS 2.0 templates
    └── index.liquid  # Головна сторінка
```

## API Endpoints
- `POST /api/ai/chat` - AI асистент (GPT-4o)
- `POST /api/leads` - Форма заявки
- `POST /api/calls` - Запис на дзвінок
- `POST /api/livechat` - Живий чат
