// Extended mock data for duso_ecom multi-page website - Russian version with 12 services

export const navItems = [
  { label: 'Главная', href: '/' },
  { label: 'О нас', href: '/about' },
  { label: 'Услуги', href: '/services' },
  { label: 'Портфолио', href: '/portfolio' },
  { label: 'Ресурсы', href: '/resources' },
  { label: 'Контакты', href: '/contact' },
];

export const heroContent = {
  badge: 'E-COMMERCE EXPERT',
  title: ['THE FUTURE-POWERED', 'E-COMMERCE', 'PARTNER', 'YOUR BUSINESS DESERVES'],
  highlightWord: 'PARTNER',
  description: 'Присоединяйтесь к',
  highlightText: 'Сертифицированному E-commerce Эксперту',
  brandName: 'duso_ecom',
  descriptionEnd: 'чтобы строить, расти и процветать онлайн',
};

export const scrollingText = 'Превращаем исключительные идеи в исключительный опыт';

export const services = [
  {
    id: 'design',
    title: 'Структура и дизайн',
    subtitle: 'Создаём продающие интернет-магазины с нуля',
    description: 'Профессиональный дизайн и структура вашего магазина, которые конвертируют посетителей в покупателей.',
    features: [
      'UX/UI дизайн интернет-магазина',
      'Адаптивный дизайн для всех устройств',
      'Разработка фирменного стиля',
      'Создание продающих лендингов',
      'Дизайн email-шаблонов',
      'Оптимизация пользовательского пути'
    ],
    icon: 'Palette',
    fullDescription: 'Мы создаём уникальные интернет-магазины с продуманной структурой и современным дизайном. Каждый элемент направлен на увеличение конверсии и создание незабываемого пользовательского опыта.',
    benefits: [
      'Увеличение конверсии до 40%',
      'Снижение показателя отказов на 50%',
      'Рост среднего времени на сайте',
      'Узнаваемый бренд',
      'Доверие клиентов с первого взгляда'
    ],
    gift: {
      title: 'ПОДАРОК',
      description: '10 топовых шаблонов продающих страниц',
      value: '$500'
    },
    price: 'от $3,000'
  },
  {
    id: 'payments',
    title: 'Платёжные системы',
    subtitle: 'Интеграция всех способов оплаты',
    description: 'Подключаем все популярные платёжные системы для максимального удобства ваших клиентов.',
    features: [
      'Stripe, PayPal, Square',
      'Криптовалютные платежи',
      'Apple Pay, Google Pay',
      'Рассрочка и кредитование',
      'Локальные платёжные системы',
      'Защита от мошенничества'
    ],
    icon: 'CreditCard',
    fullDescription: 'Интегрируем все популярные способы оплаты, включая банковские карты, электронные кошельки, криптовалюты и системы рассрочки. Обеспечиваем безопасность транзакций и защиту от мошенничества.',
    benefits: [
      'Конверсия оплат до 98%',
      'Поддержка 50+ способов оплаты',
      'PCI DSS сертификация',
      'Автоматические возвраты',
      'Мультивалютность'
    ],
    gift: {
      title: 'ПОДАРОК',
      description: 'Бесплатная настройка первых 3 платёжных систем',
      value: '$300'
    },
    price: 'от $500'
  },
  {
    id: 'optimization',
    title: 'Оптимизация сайта',
    subtitle: 'Скорость и производительность',
    description: 'Ускоряем ваш магазин для лучшего UX и SEO-позиций.',
    features: [
      'Оптимизация скорости загрузки',
      'Сжатие изображений',
      'Кэширование и CDN',
      'Минификация кода',
      'Lazy loading',
      'Core Web Vitals оптимизация'
    ],
    icon: 'Zap',
    fullDescription: 'Комплексная оптимизация производительности вашего магазина. Ускоряем загрузку страниц до 1 секунды, что напрямую влияет на конверсию и позиции в поисковых системах.',
    benefits: [
      'Скорость загрузки < 2 сек',
      'Google PageSpeed 90+',
      'Улучшение SEO-позиций',
      'Снижение отказов на 40%',
      'Рост мобильной конверсии'
    ],
    gift: {
      title: 'ПОДАРОК',
      description: 'Бесплатный аудит скорости + 1 год CDN',
      value: '$400'
    },
    price: 'от $800'
  },
  {
    id: 'advertising',
    title: 'Таргетированная реклама',
    subtitle: 'Привлекаем целевых клиентов',
    description: 'Настраиваем эффективную рекламу в социальных сетях и поисковых системах.',
    features: [
      'Facebook & Instagram Ads',
      'Google Ads & Shopping',
      'TikTok Advertising',
      'Ретаргетинг кампании',
      'Look-alike аудитории',
      'A/B тестирование креативов'
    ],
    icon: 'Target',
    fullDescription: 'Создаём и управляем рекламными кампаниями, которые приносят целевой трафик и продажи. Используем продвинутые стратегии таргетинга и оптимизации для максимального ROI.',
    benefits: [
      'ROAS от 300%',
      'Снижение CPA на 50%',
      'Точный таргетинг',
      'Еженедельная отчётность',
      'Постоянная оптимизация'
    ],
    gift: {
      title: 'ПОДАРОК',
      description: '20 готовых рекламных креативов + стратегия',
      value: '$600'
    },
    price: 'от $1,500/мес'
  },
  {
    id: 'shipping',
    title: 'Доставка и отправка',
    subtitle: 'Логистика без головной боли',
    description: 'Интегрируем лучшие службы доставки и автоматизируем логистику.',
    features: [
      'Интеграция с курьерскими службами',
      'Автоматический расчёт стоимости',
      'Печать этикеток',
      'Трекинг отправлений',
      'Dropshipping интеграции',
      'Fulfillment центры'
    ],
    icon: 'Truck',
    fullDescription: 'Полная автоматизация логистики вашего магазина. Интегрируем службы доставки, настраиваем автоматический расчёт стоимости и трекинг, подключаем fulfillment-центры.',
    benefits: [
      'Автоматизация 95% процессов',
      'Экономия до 30% на доставке',
      'Real-time трекинг',
      'Международная доставка',
      'Возвраты в 1 клик'
    ],
    gift: {
      title: 'ПОДАРОК',
      description: 'Бесплатная интеграция 5 служб доставки',
      value: '$450'
    },
    price: 'от $700'
  },
  {
    id: 'analytics',
    title: 'Аналитика и трекинг',
    subtitle: 'Данные для принятия решений',
    description: 'Настраиваем полную аналитику для понимания поведения клиентов.',
    features: [
      'Google Analytics 4',
      'Facebook Pixel & CAPI',
      'Тепловые карты (Heatmaps)',
      'Воронки продаж',
      'Когортный анализ',
      'Дашборды в реальном времени'
    ],
    icon: 'BarChart3',
    fullDescription: 'Внедряем комплексную систему аналитики, которая даёт полное понимание поведения клиентов. Настраиваем отслеживание всех ключевых метрик и создаём понятные дашборды.',
    benefits: [
      'Точность данных 99%',
      'Понимание пути клиента',
      'Выявление точек роста',
      'Оптимизация воронки',
      'Data-driven решения'
    ],
    gift: {
      title: 'ПОДАРОК',
      description: 'Кастомный дашборд + 3 месяца отчётов',
      value: '$700'
    },
    price: 'от $600'
  },
  {
    id: 'product-pages',
    title: 'Оптимизация товаров',
    subtitle: 'Страницы товаров, которые продают',
    description: 'Создаём и оптимизируем карточки товаров для максимальной конверсии.',
    features: [
      'A/B тестирование страниц',
      'Оптимизация описаний',
      'Фото и видео продакшн',
      'Отзывы и социальное доказательство',
      'Кросс-селл и апселл',
      'Таблицы размеров и гиды'
    ],
    icon: 'Package',
    fullDescription: 'Превращаем страницы товаров в машины продаж. Оптимизируем каждый элемент: от заголовков до кнопок, используя данные A/B тестов и лучшие практики e-commerce.',
    benefits: [
      'Рост конверсии на 60%',
      'Увеличение среднего чека',
      'Снижение возвратов',
      'Улучшение SEO товаров',
      'Больше отзывов'
    ],
    gift: {
      title: 'ПОДАРОК',
      description: '50 оптимизированных карточек товаров',
      value: '$800'
    },
    price: 'от $1,000'
  },
  {
    id: 'automation',
    title: 'Базовая автоматизация',
    subtitle: 'Работа магазина на автопилоте',
    description: 'Автоматизируем рутинные процессы для экономии времени и денег.',
    features: [
      'Email-автоматизации',
      'Брошенные корзины',
      'Пост-покупочные цепочки',
      'Управление запасами',
      'Автоматические скидки',
      'Чат-боты поддержки'
    ],
    icon: 'Bot',
    fullDescription: 'Внедряем системы автоматизации, которые работают 24/7. Email-воронки, восстановление брошенных корзин, управление запасами и многое другое — всё на автопилоте.',
    benefits: [
      'Экономия 20+ часов в неделю',
      'Возврат до 15% брошенных корзин',
      'Автоматические повторные продажи',
      'Снижение ошибок',
      'Масштабирование без найма'
    ],
    gift: {
      title: 'ПОДАРОК',
      description: '10 готовых email-шаблонов + настройка',
      value: '$550'
    },
    price: 'от $900'
  },
  {
    id: 'support',
    title: 'Поддержка магазина',
    subtitle: 'Надёжная техподдержка 24/7',
    description: 'Круглосуточная поддержка и обслуживание вашего интернет-магазина.',
    features: [
      'Техподдержка 24/7',
      'Мониторинг uptime',
      'Регулярные бэкапы',
      'Обновления безопасности',
      'Исправление багов',
      'Консультации по развитию'
    ],
    icon: 'HeadphonesIcon',
    fullDescription: 'Профессиональная поддержка вашего магазина. Мониторим работоспособность, оперативно исправляем проблемы, проводим регулярное обслуживание и консультируем по развитию.',
    benefits: [
      'Uptime 99.9%',
      'Ответ в течение 15 минут',
      'Ежедневные бэкапы',
      'Проактивный мониторинг',
      'Выделенный менеджер'
    ],
    gift: {
      title: 'ПОДАРОК',
      description: '1 месяц премиум поддержки бесплатно',
      value: '$300'
    },
    price: 'от $200/мес'
  },
  {
    id: 'marketplaces',
    title: 'Маркетплейсы',
    subtitle: 'Продажи на всех площадках',
    description: 'Подключаем ваш магазин к крупнейшим маркетплейсам.',
    features: [
      'Amazon интеграция',
      'eBay подключение',
      'Etsy для хендмейда',
      'Walmart Marketplace',
      'Синхронизация запасов',
      'Единая панель управления'
    ],
    icon: 'Store',
    fullDescription: 'Расширяем ваши продажи на крупнейшие маркетплейсы мира. Интегрируем, синхронизируем запасы и заказы, настраиваем автоматизацию для мультиканальных продаж.',
    benefits: [
      'Доступ к миллионам покупателей',
      'Синхронизация в реальном времени',
      'Единое управление',
      'Автоматизация листинга',
      'Оптимизация для каждой площадки'
    ],
    gift: {
      title: 'ПОДАРОК',
      description: 'Бесплатное подключение к 2 маркетплейсам',
      value: '$600'
    },
    price: 'от $1,200'
  },
  {
    id: 'digital',
    title: 'Digital продукты',
    subtitle: 'Продажа цифровых товаров',
    description: 'Настраиваем продажу курсов, подписок, файлов и другого digital-контента.',
    features: [
      'Система доставки файлов',
      'Подписочные модели',
      'Членские программы',
      'Защита контента',
      'Интеграция с LMS',
      'Автоматический доступ'
    ],
    icon: 'Download',
    fullDescription: 'Создаём полноценные платформы для продажи цифровых товаров: курсы, eBooks, софт, подписки. Настраиваем защиту контента и автоматическую доставку.',
    benefits: [
      'Маржинальность до 95%',
      'Пассивный доход',
      'Автоматическая доставка',
      'Защита от пиратства',
      'Масштабирование без затрат'
    ],
    gift: {
      title: 'ПОДАРОК',
      description: 'Шаблон воронки для digital-продуктов',
      value: '$400'
    },
    price: 'от $1,500'
  },
  {
    id: 'sop',
    title: 'Standard Operating Procedure',
    subtitle: 'Стандартизация всех процессов',
    description: 'Создаём полную документацию и стандарты работы вашего бизнеса.',
    features: [
      'Документация процессов',
      'Чек-листы операций',
      'Обучающие материалы',
      'Видео-инструкции',
      'Регламенты работы',
      'KPI и метрики'
    ],
    icon: 'FileText',
    fullDescription: 'Разрабатываем полный комплект стандартных операционных процедур для вашего бизнеса. Документируем все процессы, создаём обучающие материалы для команды.',
    benefits: [
      'Быстрый онбординг сотрудников',
      'Стабильное качество',
      'Масштабирование бизнеса',
      'Снижение ошибок на 80%',
      'Независимость от людей'
    ],
    gift: {
      title: 'ПОДАРОК',
      description: '10 готовых SOP-шаблонов для e-commerce',
      value: '$350'
    },
    price: 'от $2,000'
  }
];

export const ratings = [
  { icon: 'Star', text: 'Наивысший рейтинг 5/5 звёзд на', platform: 'Shopify' },
  { icon: 'Trophy', text: 'Топ-рейтинг с 325+ отзывами на', platform: 'Clutch' },
  { icon: 'Award', text: 'Идеальная оценка 5.0 на', platform: 'GoodFirms' }
];

export const testimonials = [
  {
    id: 1,
    quote: 'Их управление проектами было выдающимся. Каждый этап работы был прозрачным, а результат превзошёл наши ожидания. Продажи выросли на 200% за первый квартал!',
    company: 'TechStore Russia',
    website: 'techstore.ru',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    role: 'CEO',
    name: 'Алексей Иванов'
  },
  {
    id: 2,
    quote: 'Профессиональная команда с отличными результатами. Продажи выросли на 150% после редизайна магазина. Лучшие инвестиции в наш бизнес!',
    company: 'Fashion Hub',
    website: 'fashionhub.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    role: 'Marketing Director',
    name: 'Мария Петрова'
  },
  {
    id: 3,
    quote: 'Лучшие партнёры для e-commerce развития. Миграция прошла гладко, без потери трафика и позиций. Теперь наш магазин работает в 3 раза быстрее.',
    company: 'ElectroWorld',
    website: 'electroworld.ru',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    role: 'CTO',
    name: 'Дмитрий Смирнов'
  },
  {
    id: 4,
    quote: 'Команда duso_ecom помогла нам выйти на новый уровень. Конверсия увеличилась вдвое за 3 месяца. Их подход к аналитике просто впечатляет!',
    company: 'BeautyPro',
    website: 'beautypro.ru',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    role: 'Founder',
    name: 'Анна Козлова'
  },
  {
    id: 5,
    quote: 'Отличная техподдержка и быстрое решение любых вопросов. Рекомендую всем, кто серьёзно относится к e-commerce. За год оборот вырос в 5 раз!',
    company: 'SportMax',
    website: 'sportmax.ru',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    role: 'Operations Manager',
    name: 'Сергей Волков'
  },
  {
    id: 6,
    quote: 'Автоматизация от duso_ecom сэкономила нам 30 часов в неделю. Теперь можем фокусироваться на развитии, а не на рутине.',
    company: 'HomeDecor',
    website: 'homedecor.ru',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    role: 'COO',
    name: 'Елена Новикова'
  },
  {
    id: 7,
    quote: 'Подключение к маркетплейсам открыло для нас новые рынки. Amazon и eBay теперь приносят 40% нашего оборота!',
    company: 'GadgetWorld',
    website: 'gadgetworld.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    role: 'CEO',
    name: 'Максим Орлов'
  },
  {
    id: 8,
    quote: 'SOP от команды duso_ecom позволили нам масштабировать бизнес с 5 до 50 сотрудников без потери качества.',
    company: 'FoodMarket',
    website: 'foodmarket.ru',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    role: 'Founder',
    name: 'Ольга Соколова'
  }
];

export const stats = [
  { value: '$3B+', label: 'Доход сгенерирован для клиентов', description: 'Суммарный оборот наших клиентов за все время сотрудничества' },
  { value: '2800+', label: 'Успешных миграций', description: 'Переведённых магазинов на Shopify без потери данных' },
  { value: '700+', label: 'Мобильных приложений', description: 'Разработанных приложений для iOS и Android' },
  { value: '6500+', label: 'Shopify магазинов', description: 'Созданных и запущенных интернет-магазинов' },
  { value: '98%', label: 'Довольных клиентов', description: 'Оставили положительные отзывы' },
  { value: '50+', label: 'Специалистов', description: 'В нашей команде профессионалов' },
  { value: '24/7', label: 'Поддержка', description: 'Круглосуточная помощь клиентам' },
  { value: '15+', label: 'Стран', description: 'География наших клиентов' }
];

export const caseStudies = [
  {
    id: 1,
    website: 'fashionstore.ru',
    title: 'FashionStore',
    category: 'Мода и одежда',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
    description: 'Полный редизайн и миграция на Shopify Plus. Рост конверсии на 180%.',
    results: ['Конверсия +180%', 'Трафик +250%', 'Средний чек +40%'],
    services: ['Дизайн', 'Разработка', 'SEO']
  },
  {
    id: 2,
    website: 'techgadgets.com',
    title: 'TechGadgets',
    category: 'Электроника',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    description: 'Создание магазина с нуля с интеграцией складской системы.',
    results: ['$2M выручки/год', '50K+ товаров', 'Автоматизация 90%'],
    services: ['Разработка', 'Интеграции', 'Поддержка']
  },
  {
    id: 3,
    website: 'homedesign.ru',
    title: 'HomeDesign',
    category: 'Дом и интерьер',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    description: 'Премиум магазин мебели с 3D конфигуратором товаров.',
    results: ['Конверсия +120%', 'Время на сайте +300%', 'Возвраты -50%'],
    services: ['UX/UI', 'Разработка', '3D']
  },
  {
    id: 4,
    website: 'sportzone.com',
    title: 'SportZone',
    category: 'Спорт и фитнес',
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&h=400&fit=crop',
    description: 'Мультирегиональный магазин с локализацией на 5 языков.',
    results: ['5 регионов', '15 валют', 'ROI 400%'],
    services: ['Локализация', 'Разработка', 'Маркетинг']
  },
  {
    id: 5,
    website: 'beautyshop.ru',
    title: 'BeautyShop',
    category: 'Красота и здоровье',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop',
    description: 'Подписочная модель продаж с персонализацией.',
    results: ['LTV +200%', 'Подписчики 10K+', 'Churn -60%'],
    services: ['Стратегия', 'Разработка', 'CRM']
  },
  {
    id: 6,
    website: 'petworld.ru',
    title: 'PetWorld',
    category: 'Товары для животных',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop',
    description: 'Маркетплейс с программой лояльности и подпиской.',
    results: ['GMV $5M', '200+ продавцов', 'NPS 85'],
    services: ['Маркетплейс', 'Разработка', 'Маркетинг']
  },
  {
    id: 7,
    website: 'luxwatch.com',
    title: 'LuxWatch',
    category: 'Люкс товары',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop',
    description: 'Элитный магазин часов с VIP-обслуживанием.',
    results: ['Средний чек $5K', 'Retention 70%', 'Рост 300%'],
    services: ['Дизайн', 'Разработка', 'VIP']
  },
  {
    id: 8,
    website: 'organicfood.ru',
    title: 'OrganicFood',
    category: 'Продукты питания',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop',
    description: 'Онлайн-магазин органических продуктов с доставкой.',
    results: ['10K заказов/мес', 'Доставка 2 часа', 'Повторы 65%'],
    services: ['Разработка', 'Логистика', 'Автоматизация']
  },
  {
    id: 9,
    website: 'kidstore.ru',
    title: 'KidStore',
    category: 'Детские товары',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=400&fit=crop',
    description: 'Детский магазин с персонализированными рекомендациями.',
    results: ['Конверсия +150%', 'AOV +45%', 'Email open 45%'],
    services: ['AI', 'Разработка', 'Email']
  },
  {
    id: 10,
    website: 'artshop.com',
    title: 'ArtShop',
    category: 'Искусство',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&h=400&fit=crop',
    description: 'Галерея современного искусства с NFT интеграцией.',
    results: ['$1M продаж', 'NFT коллекция', 'Глобальная аудитория'],
    services: ['Web3', 'Дизайн', 'Маркетинг']
  }
];

export const awards = {
  shopifyCertifications: [
    'Shopify Plus Partner',
    'Certified Shopify Expert',
    'Shopify Scripts Developer',
    'Shopify Theme Expert',
    'Shopify App Developer',
    'Shopify Markets Expert'
  ],
  clutchAwards: [
    'Top E-commerce Agency 2024',
    'Top Web Developer 2024',
    'Top Shopify Company',
    'Top Digital Marketing Agency',
    'Top UX Design Company'
  ]
};

export const footerData = {
  email: 'contact@duso-ecom.com',
  phone: '+7 (495) 123-45-67',
  address: 'Москва, ул. Тверская, 12, офис 301',
  socials: [
    { name: 'Facebook', url: 'https://facebook.com' },
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' }
  ]
};

export const heroImages = [
  'https://images.unsplash.com/photo-1739459365519-9d3978d884aa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxlLWNvbW1lcmNlJTIwd2Vic2l0ZSUyMG1vY2t1cHxlbnwwfHx8fDE3Njk2MjM0NzN8MA&ixlib=rb-4.1.0&q=85&w=400',
  'https://images.unsplash.com/photo-1642052503083-bc49dd433478?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwzfHxlLWNvbW1lcmNlJTIwd2Vic2l0ZSUyMG1vY2t1cHxlbnwwfHx8fDE3Njk2MjM0NzN8MA&ixlib=rb-4.1.0&q=85&w=400',
  'https://images.unsplash.com/photo-1588601515608-6a6814976b50?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjd8MHwxfHNlYXJjaHwyfHxsYXB0b3AlMjBtb2NrdXB8ZW58MHx8fHwxNzY5NjIzNDgxfDA&ixlib=rb-4.1.0&q=85&w=400',
  'https://images.unsplash.com/photo-1604074131228-9d48b811bd80?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjd8MHwxfHNlYXJjaHw0fHxsYXB0b3AlMjBtb2NrdXB8ZW58MHx8fHwxNzY5NjIzNDgxfDA&ixlib=rb-4.1.0&q=85&w=400'
];

export const teamMembers = [
  {
    id: 1,
    name: 'Александр Дусо',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop',
    bio: '15+ лет в e-commerce. Основал duso_ecom в 2015 году с целью помочь бизнесам выйти в онлайн.',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 2,
    name: 'Елена Морозова',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
    bio: 'Эксперт по Shopify с 10+ годами опыта. Руководит технической командой из 30+ разработчиков.',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 3,
    name: 'Михаил Козлов',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    bio: 'Создал дизайн для 500+ успешных магазинов. Специализация — конверсионный дизайн.',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 4,
    name: 'Анна Соколова',
    role: 'Head of Marketing',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
    bio: 'Эксперт по digital-маркетингу. Увеличила ROI клиентов в среднем на 300%.',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 5,
    name: 'Дмитрий Волков',
    role: 'Head of Development',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop',
    bio: 'Full-stack разработчик с 12+ годами опыта. Специализация — Shopify Plus и интеграции.',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 6,
    name: 'Ольга Белова',
    role: 'Head of Analytics',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop',
    bio: 'Data scientist с опытом в e-commerce аналитике. Строит дашборды, которые меняют бизнес.',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 7,
    name: 'Игорь Новиков',
    role: 'Head of Support',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    bio: 'Руководит командой поддержки 24/7. Время ответа — менее 15 минут.',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 8,
    name: 'Татьяна Орлова',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop',
    bio: 'Оптимизировала процессы для 100+ клиентов. Эксперт по SOP и автоматизации.',
    linkedin: 'https://linkedin.com'
  }
];

export const companyValues = [
  {
    title: 'Результат',
    description: 'Мы фокусируемся на измеримых результатах: рост продаж, конверсии и прибыли.',
    icon: 'Target'
  },
  {
    title: 'Партнёрство',
    description: 'Мы становимся частью вашей команды и работаем как единое целое.',
    icon: 'Handshake'
  },
  {
    title: 'Инновации',
    description: 'Используем передовые технологии и постоянно развиваемся.',
    icon: 'Lightbulb'
  },
  {
    title: 'Прозрачность',
    description: 'Честная коммуникация и полная прозрачность на всех этапах.',
    icon: 'Eye'
  }
];

export const resources = [
  {
    id: 1,
    title: '10 способов увеличить конверсию интернет-магазина в 2025',
    category: 'Гайд',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    date: '15 января 2025',
    readTime: '8 мин',
    excerpt: 'Практические советы по увеличению конверсии вашего магазина на основе анализа 500+ проектов.'
  },
  {
    id: 2,
    title: 'Shopify Plus vs Magento: Полное сравнение 2025',
    category: 'Сравнение',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
    date: '10 января 2025',
    readTime: '12 мин',
    excerpt: 'Детальное сравнение двух ведущих платформ для enterprise e-commerce.'
  },
  {
    id: 3,
    title: 'SEO для интернет-магазинов: Полный чеклист',
    category: 'Чеклист',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c1d9?w=400&h=250&fit=crop',
    date: '5 января 2025',
    readTime: '15 мин',
    excerpt: 'Пошаговый чеклист по SEO-оптимизации интернет-магазина для роста органического трафика.'
  },
  {
    id: 4,
    title: 'Email-маркетинг для e-commerce: Стратегии 2025',
    category: 'Стратегия',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=250&fit=crop',
    date: '28 декабря 2024',
    readTime: '10 мин',
    excerpt: 'Как построить эффективную email-стратегию и увеличить повторные продажи.'
  },
  {
    id: 5,
    title: 'UX/UI тренды в e-commerce 2025',
    category: 'Тренды',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=250&fit=crop',
    date: '20 декабря 2024',
    readTime: '7 мин',
    excerpt: 'Главные тренды в дизайне интернет-магазинов, которые будут доминировать в 2025 году.'
  },
  {
    id: 6,
    title: 'Как выбрать платёжную систему для магазина',
    category: 'Гайд',
    image: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=400&h=250&fit=crop',
    date: '15 декабря 2024',
    readTime: '9 мин',
    excerpt: 'Обзор лучших платёжных систем и советы по выбору для вашего бизнеса.'
  },
  {
    id: 7,
    title: 'Автоматизация e-commerce: с чего начать',
    category: 'Гайд',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=250&fit=crop',
    date: '10 декабря 2024',
    readTime: '11 мин',
    excerpt: 'Пошаговое руководство по автоматизации процессов интернет-магазина.'
  },
  {
    id: 8,
    title: 'Маркетплейсы 2025: куда выходить продавцам',
    category: 'Аналитика',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400&h=250&fit=crop',
    date: '5 декабря 2024',
    readTime: '14 мин',
    excerpt: 'Анализ крупнейших маркетплейсов и рекомендации по выбору площадки.'
  },
  {
    id: 9,
    title: 'Retention маркетинг: как возвращать клиентов',
    category: 'Стратегия',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
    date: '1 декабря 2024',
    readTime: '13 мин',
    excerpt: 'Стратегии удержания клиентов и увеличения LTV в e-commerce.'
  },
  {
    id: 10,
    title: 'Мобильная коммерция: оптимизация для m-commerce',
    category: 'Тренды',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
    date: '25 ноября 2024',
    readTime: '8 мин',
    excerpt: 'Как оптимизировать магазин для мобильных покупателей.'
  }
];

export const faq = [
  {
    question: 'Сколько стоит создание интернет-магазина?',
    answer: 'Стоимость зависит от сложности проекта и начинается от $3,000 для базового магазина. Комплексные решения с кастомным дизайном и интеграциями — от $10,000. Свяжитесь с нами для бесплатной оценки вашего проекта.'
  },
  {
    question: 'Сколько времени занимает разработка?',
    answer: 'Типичный проект занимает от 4 до 12 недель в зависимости от сложности. Базовый магазин — 4-6 недель, комплексное решение — 8-12 недель. Срочные проекты можем выполнить за 2-3 недели с приоритетной поддержкой.'
  },
  {
    question: 'Работаете ли вы с клиентами из других стран?',
    answer: 'Да, мы работаем с клиентами по всему миру. У нас есть опыт работы с компаниями из США, Европы, Азии и СНГ. Коммуникация на русском и английском языках.'
  },
  {
    question: 'Предоставляете ли вы поддержку после запуска?',
    answer: 'Да, мы предлагаем различные пакеты поддержки — от базового до премиум с круглосуточным обслуживанием. Все клиенты получают 30 дней бесплатной поддержки после запуска.'
  },
  {
    question: 'Можете ли вы помочь с маркетингом?',
    answer: 'Да, у нас есть полноценная команда маркетинга, которая занимается SEO, PPC, SMM и email-маркетингом. Предлагаем как отдельные услуги, так и комплексное продвижение.'
  },
  {
    question: 'Какие платформы вы используете?',
    answer: 'Мы специализируемся на Shopify и Shopify Plus как основной платформе. Также работаем с WooCommerce, Magento и кастомными решениями по запросу.'
  },
  {
    question: 'Что входит в подарок при заказе услуги?',
    answer: 'Каждая услуга включает ценный подарок. Например, при создании магазина вы получаете 10 топовых шаблонов страниц бесплатно. Подарки варьируются от $300 до $800 в зависимости от услуги.'
  },
  {
    question: 'Как происходит оплата?',
    answer: 'Мы принимаем оплату картами, банковским переводом и криптовалютой. Стандартная схема: 50% предоплата, 50% после завершения. Для крупных проектов возможна поэтапная оплата.'
  }
];

export const trustedBrands = [
  { name: 'TechBrand', color: '#f97316' },
  { name: 'ShopMax', color: '#10b981' },
  { name: 'E-Store', color: '#f97316' },
  { name: 'DigiMart', color: '#10b981' },
  { name: 'CloudShop', color: '#f97316' },
  { name: 'NetCommerce', color: '#10b981' },
  { name: 'FastBuy', color: '#f97316' },
  { name: 'SmartShop', color: '#10b981' },
];