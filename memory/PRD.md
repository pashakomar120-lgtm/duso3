# PRD - Shopify Theme Migration

## Original Problem Statement
Migrate existing React application to a native Shopify theme. Must be a **1:1 visual and functional clone** of the original site. The AI assistant functionality also needs to work in the new theme.

## User Requirements
1. **Shopify Theme Migration:** Rebuild entire React app as native Shopify theme using Liquid
2. **Visual and Functional Parity:** Must be indistinguishable from React app
3. **AI Assistant Integration:** Secret code `квантовий кіт шрёдінгера 2047` must work
4. **Language:** All text in Russian

## Architecture

### Source (React App)
```
/app/frontend/src/
├── components/     # React components
├── pages/          # Page components  
├── data/           # Mock data files
└── index.css       # Global styles
```

### Destination (Shopify Theme)
```
/app/shopify-theme/
├── assets/
│   ├── theme.css   # TailwindCSS 2.x + custom styles
│   └── theme.js    # Theme JavaScript
├── layout/
│   └── theme.liquid
├── sections/       # 16+ Liquid sections
└── templates/      # Page templates
```

## What's Been Implemented

### ✅ Completed (2025-02-02)

**Секції оновлені:**
1. **Store Logos** - 16 реальних магазинів з прапорцями та доменами
2. **Trusted By** - реальні бренди (TechBrand, ShopMax, E-Store, DigiMart, CloudShop, NetCommerce)
3. **Testimonials (Відгуки)** - оновлено з:
   - Реальними аватарками
   - Назвою магазину та доменом
   - Країною (прапорець)
   - Виручкою компанії
   - 6 відгуків з різних країн СНГ
4. **Services (Послуги)** - 12 послуг на російській мові:
   1. Структура и дизайн сайта
   2. Платёжные системы
   3. Оптимизация сайта
   4. Таргетированная реклама
   5. Доставка и отправка
   6. Аналитика и трекинг
   7. Оптимизация страниц товаров
   8. Базовая автоматизация
   9. Поддержка магазина
   10. Маркетплейсы нового поколения
   11. Digital продукты
   12. Standard Operating Procedure
5. **Case Studies (Портфолио)** - картки тепер клікабельні з посиланнями

## Current Issues

### P0 - Critical
- [x] Відгуки з магазином, країною та аватаркою ✅
- [x] 12 послуг на російській мові ✅
- [x] Клікабельні картки портфоліо ✅
- [ ] Перевірити роботу табів послуг (JavaScript)
- [ ] Тестування в реальному Shopify

### P1 - High Priority  
- [ ] AI Assistant - Connect to backend `/api/ai` endpoint
- [ ] Full content for secondary pages

## Credentials
- **AI Code Word:** `квантовий кіт шрёдінгера 2047`
- **Admin Login:** `duso_phantom_x7`
- **Admin Password:** `Zk9#mNp$vR2@qLw8!xYj`

## Download Theme
**URL:** https://shopify-clone-hub.preview.emergentagent.com/shopify-theme.zip
