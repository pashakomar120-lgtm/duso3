# PRD - Shopify Theme Migration

## Original Problem Statement
Migrate existing React application to a native Shopify theme. Must be a **1:1 visual and functional clone** of the original site. The AI assistant functionality also needs to work in the new theme.

## User Requirements
1. **Shopify Theme Migration:** Rebuild entire React app as native Shopify theme using Liquid
2. **Visual and Functional Parity:** Must be indistinguishable from React app
3. **AI Assistant Integration:** Secret code `квантовий кіт шрёдінгера 2047` must work
4. **Language:** All text in Russian

## What's Been Implemented

### ✅ Completed (2025-02-02)

**Головна сторінка:**
1. **Store Logos** - 16 реальних магазинів з прапорцями та доменами
2. **Trusted By** - реальні бренди з анімованими рядами
3. **Services** - 12 послуг у сітці 4x3 (російською):
   - Структура и дизайн сайта
   - Платёжные системы
   - Оптимизация сайта
   - Таргетированная реклама
   - Доставка и отправка
   - Аналитика и трекинг
   - Оптимизация страниц товаров
   - Базовая автоматизация
   - Поддержка магазина
   - Маркетплейсы нового поколения
   - Digital продукты
   - Standard Operating Procedure (SOP)
4. **Testimonials (Відгуки)** - ~30 відгуків у форматі каруселі з:
   - Аватарками
   - Назвою магазину та доменом
   - Прапорцем країни (🇷🇺🇺🇦🇰🇿🇧🇾🇺🇿🇦🇿🇬🇪🇦🇲)
   - Виручкою компанії
   - 3 ряди з різними напрямками анімації
5. **Case Studies** - клікабельні картки з проектами
6. **Hero, CTA, Awards, Ratings, Process** - всі секції готові

**Вторинні сторінки (повністю готові):**
- `/pages/services` - 12 послуг з описами та цінами
- `/pages/about` - О компании (команда, цінності, статистика)
- `/pages/portfolio` - 6+ проектів з фільтрацією по країнах
- `/pages/contact` - Форма зв'язку з картою СНГ

**CSS анімації:**
- Carousel scroll (left, right, slow)
- Fade-in на scroll
- Hover effects
- Glass morphism

## Architecture
```
/app/shopify-theme/
├── assets/
│   ├── theme.css   # TailwindCSS + custom (60+ animations)
│   └── theme.js    # Lucide icons + scroll effects
├── layout/
│   └── theme.liquid
├── sections/       # 16+ Liquid sections
└── templates/
    ├── index.liquid
    ├── page.services.liquid (ПОВНІСТЮ ГОТОВА)
    ├── page.about.liquid (ПОВНІСТЮ ГОТОВА)
    ├── page.portfolio.liquid (ПОВНІСТЮ ГОТОВА)
    └── page.contact.liquid (ПОВНІСТЮ ГОТОВА)
```

## Current Issues

### P1 - High Priority  
- [ ] AI Assistant - підключити до бекенду `/api/ai`

### P2 - Medium Priority
- [ ] Тестування в реальному Shopify store

## Credentials
- **AI Code Word:** `квантовий кіт шрёдінгера 2047`
- **Admin Login:** `duso_phantom_x7`
- **Admin Password:** `Zk9#mNp$vR2@qLw8!xYj`

## Download Theme
**URL:** https://shopify-clone-hub.preview.emergentagent.com/shopify-theme.zip
