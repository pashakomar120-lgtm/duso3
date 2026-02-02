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
│   ├── header.liquid
│   ├── hero.liquid
│   ├── scrolling-text.liquid
│   ├── trusted-by.liquid
│   ├── services.liquid
│   ├── who-we-work-with.liquid
│   ├── store-logos.liquid
│   ├── cis.liquid
│   ├── process.liquid
│   ├── case-studies.liquid
│   ├── ratings.liquid
│   ├── testimonials.liquid
│   ├── awards.liquid
│   ├── cta.liquid
│   ├── ai-assistant.liquid
│   └── footer.liquid
├── templates/
│   ├── index.liquid
│   ├── page.services.liquid
│   ├── page.about.liquid
│   ├── page.portfolio.liquid
│   └── page.contact.liquid
└── config/
```

## What's Been Implemented

### ✅ Completed (2025-02-02)
- Full Shopify theme skeleton with 16+ sections
- Switched from Tailwind CDN to static CSS (fixed performance issues)
- **Store Logos section** - Now shows real store names with flags and domains:
  - TechStore, FashionHub, ElectroWorld, BeautyPro, SportMax, MegaStore (Russia)
  - FashionUA, TechnoKyiv (Ukraine)
  - КазахТекстиль, AlmatyShop (Kazakhstan)
  - TechBY, MinskFashion (Belarus)
  - UzFood Premium (Uzbekistan)
  - BakuElectro (Azerbaijan)
  - GeorgiaWine (Georgia)
  - YerevanTech (Armenia)
- **Trusted By section** - Now shows real brands: TechBrand, ShopMax, E-Store, DigiMart, CloudShop, NetCommerce
- CSS animations for scroll effects
- Hero, Services, Process, CIS, Testimonials, Awards, CTA sections completed
- Secondary page templates created

## Current Issues

### P0 - Critical
- [ ] Verify all buttons work correctly (JavaScript)
- [ ] Verify all animations work properly
- [ ] Test secondary pages (Services, About, Portfolio, Contact)

### P1 - High Priority  
- [ ] AI Assistant - Connect to backend `/api/ai` endpoint
- [ ] Full content for secondary pages

## Upcoming Tasks
1. Test theme in actual Shopify store
2. Fix any visual discrepancies reported by user
3. Implement full AI Assistant functionality
4. Add email notifications for leads

## Credentials
- **AI Code Word:** `квантовий кіт шрёдінгера 2047`
- **Admin Login:** `duso_phantom_x7`
- **Admin Password:** `Zk9#mNp$vR2@qLw8!xYj`

## Download Theme
**URL:** https://shopify-clone-hub.preview.emergentagent.com/shopify-theme.zip
