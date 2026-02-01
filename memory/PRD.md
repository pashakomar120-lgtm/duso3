# duso_ecom - #1 E-commerce Agency in CIS

## Latest Updates (February 2025)

### Completed Features
- ✅ Full site responsiveness (mobile/tablet/desktop)
- ✅ All text translated to Russian
- ✅ Live Chat removed (only AI Assistant remains)
- ✅ Admin panel mobile-friendly
- ✅ 5x content expansion (40+ testimonials, 51 projects)
- ✅ WOW logo wall on homepage
- ✅ Flag images for all CIS countries
- ✅ Secret admin access via AI Assistant
- ✅ Full admin panel with JWT auth

## Secret Access
**Code word (AI Assistant):** `квантовий кіт шрёдінгера 2047`
**Admin Login:** `duso_phantom_x7`
**Admin Password:** `Zk9#mNp$vR2@qLw8!xYj`

## Architecture
```
/app
├── backend/
│   ├── server.py (FastAPI + MongoDB + JWT Auth + AI)
│   └── .env (MONGO_URL, OPENAI)
└── frontend/
    ├── src/
    │   ├── components/ (Header, Footer, AIAssistant, etc.)
    │   ├── pages/ (HomePage, PortfolioPage, admin/*)
    │   ├── data/ (portfolioData.js, testimonialsData.js)
    │   └── context/AuthContext.jsx
    └── .env (REACT_APP_BACKEND_URL)
```

## Key APIs
- `/api/leads` - Contact form submissions
- `/api/calls` - Scheduled call requests
- `/api/ai` - AI Assistant conversations
- `/api/livechat` - Live chat messages
- `/api/admin/login` - Admin authentication
- `/api/admin/dashboard` - Dashboard statistics
- `/api/admin/leads` - Admin leads management

## Content Summary
- **Testimonials:** 40+ reviews from 8 CIS countries
- **Portfolio:** 51 projects with real domains
- **Store Logos:** 40+ stores in WOW section
- **Countries:** Russia, Ukraine, Kazakhstan, Belarus, Uzbekistan, Azerbaijan, Georgia, Armenia

## Next Steps (Shopify Migration)
User requested to convert this React app to Shopify Liquid theme.
This requires:
1. Creating Shopify theme structure (layout/theme.liquid)
2. Converting React components to Liquid templates
3. Adapting CSS to Shopify format
4. Implementing Shopify-native features

## Backlog
- [ ] Shopify Liquid theme conversion (P0 - User's main goal)
- [ ] Email/Telegram notifications for new leads
- [ ] Refactor mockData.js further
- [ ] Fix .js to .jsx file extensions
