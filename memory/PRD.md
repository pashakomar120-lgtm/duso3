# PRD - Shopify Theme Migration

## Original Problem Statement
Migrate existing React application to a native Shopify theme. Must be a **1:1 visual and functional clone** of the original site. 

## What's Been Implemented (2025-02-02)

### ✅ ВИПРАВЛЕНО

**1. Dropdown на сторінці контактів**
- Змінено `bg-white/5` на `bg-[#111827]` для темного фону
- Додано кастомну іконку chevron
- Стилі select option тепер темні

**2. Блок послуг (Services)**
- Переписано з табами як в оригінальному React сайті
- 6 табів: Shopify магазин, Структура і дизайн, Платіжні системи, Оптимізація, Реклама, Доставка
- Ліва панель: опис послуги з подарунком
- Права панель: список фіч

**3. Всі сторінки**
- `/pages/services` - 12 послуг
- `/pages/about` - О компанії
- `/pages/portfolio` - Портфоліо
- `/pages/contact` - Контакти (форма виправлена)

**4. Посилання та кнопки**
- Всі кнопки на сторінці портфоліо клікабельні
- Навігація працює

### ⚠️ ВАЖЛИВО для Shopify

Щоб сторінки працювали в Shopify, потрібно:
1. Створити Page в Shopify Admin з handle: `about`, `services`, `portfolio`, `contact`
2. Присвоїти кожній сторінці відповідний template (`page.about`, `page.services`, etc.)

## Download Theme
**URL:** https://shopify-clone-hub.preview.emergentagent.com/shopify-theme.zip

## Credentials
- **AI Code Word:** `квантовий кіт шрёдінгера 2047`
- **Admin Login:** `duso_phantom_x7`
- **Admin Password:** `Zk9#mNp$vR2@qLw8!xYj`
