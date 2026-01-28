// Extended mock data for duso_ecom multi-page website - Russian version

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
    id: 'make',
    title: 'Создаём',
    subtitle: 'веб-сайты, которые быстрые, функциональные и нацелены на успех.',
    description: 'Мы разрабатываем мощные, масштабируемые и высокопроизводительные онлайн-магазины, которые настраивают вас на долгосрочный успех. Наши услуги включают:',
    features: [
      'UI/UX Дизайн для E-commerce',
      'Разработка на Shopify Plus',
      'Техническая поддержка',
      'Мобильные приложения',
      'Кастомные решения и интеграции'
    ],
    linkText: 'E-commerce разработка',
    linkHref: '/services#development',
    icon: 'Code',
    fullDescription: 'Наша команда создаёт уникальные интернет-магазины с нуля, используя современные технологии и лучшие практики UX/UI дизайна. Мы фокусируемся на конверсии, скорости загрузки и удобстве пользователя.',
    benefits: [
      'Увеличение конверсии до 40%',
      'Скорость загрузки менее 2 секунд',
      'Адаптивный дизайн для всех устройств',
      'SEO-оптимизированная структура',
      'Интеграция с CRM и ERP системами'
    ]
  },
  {
    id: 'migrate',
    title: 'Мигрируем',
    subtitle: 'веб-сайты на Shopify Plus для масштабирования.',
    description: 'Мы осуществляем полную МИГРАЦИЮ ПЛАТФОРМЫ — чтобы вы сосредоточились на развитии бизнеса. Мы позаботимся о:',
    features: [
      'Миграция данных с любой платформы',
      'Сохранение SEO во время миграции',
      'Перенос истории заказов',
      'Миграция клиентской базы',
      'Настройка платёжных систем'
    ],
    linkText: 'Миграция на Shopify',
    linkHref: '/services#migration',
    icon: 'ArrowRightLeft',
    fullDescription: 'Безболезненный переход с любой платформы (WooCommerce, Magento, OpenCart, 1C-Битрикс) на Shopify Plus с сохранением всех данных и SEO-позиций.',
    benefits: [
      'Нулевой простой во время миграции',
      '100% сохранение SEO-позиций',
      'Полный перенос данных клиентов',
      'Автоматизация бизнес-процессов',
      'Обучение команды новой платформе'
    ]
  },
  {
    id: 'market',
    title: 'Маркетируем',
    subtitle: 'веб-сайты для привлечения целевых клиентов.',
    description: 'Через стратегический органический и платный маркетинг мы привлекаем целевых клиентов в ваш магазин. Наши услуги включают:',
    features: [
      'Поисковая оптимизация (SEO)',
      'Контекстная реклама (PPC)',
      'SMM продвижение',
      'Email-маркетинг',
      'Influence-маркетинг'
    ],
    linkText: 'Цифровой маркетинг',
    linkHref: '/services#marketing',
    icon: 'TrendingUp',
    fullDescription: 'Комплексное продвижение вашего интернет-магазина: от SEO и контекстной рекламы до SMM и email-маркетинга. Мы работаем на результат.',
    benefits: [
      'Рост органического трафика на 200%',
      'ROI рекламы от 300%',
      'Снижение стоимости привлечения клиента',
      'Увеличение повторных покупок',
      'Построение лояльной аудитории'
    ]
  },
  {
    id: 'support',
    title: 'Поддерживаем',
    subtitle: 'магазины для бесперебойной работы 24/7.',
    description: 'Круглосуточная техническая поддержка и обслуживание вашего интернет-магазина:',
    features: [
      'Мониторинг работоспособности 24/7',
      'Резервное копирование данных',
      'Обновление безопасности',
      'Оптимизация производительности',
      'Срочное исправление багов'
    ],
    linkText: 'Техподдержка',
    linkHref: '/services#support',
    icon: 'HeadphonesIcon',
    fullDescription: 'Профессиональная техническая поддержка вашего магазина. Мы следим за работоспособностью, безопасностью и производительностью вашего сайта.',
    benefits: [
      'Время ответа до 15 минут',
      'Uptime 99.9%',
      'Ежедневные бэкапы',
      'Проактивный мониторинг',
      'Выделенный менеджер'
    ]
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
    quote: 'Их управление проектами было выдающимся. Каждый этап работы был прозрачным, а результат превзошёл наши ожидания.',
    company: 'TechStore Russia',
    website: 'techstore.ru',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    role: 'CEO',
    name: 'Алексей Иванов'
  },
  {
    id: 2,
    quote: 'Профессиональная команда с отличными результатами. Продажи выросли на 150% после редизайна магазина.',
    company: 'Fashion Hub',
    website: 'fashionhub.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    role: 'Marketing Director',
    name: 'Мария Петрова'
  },
  {
    id: 3,
    quote: 'Лучшие партнёры для e-commerce развития. Миграция прошла гладко, без потери трафика и позиций.',
    company: 'ElectroWorld',
    website: 'electroworld.ru',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    role: 'CTO',
    name: 'Дмитрий Смирнов'
  },
  {
    id: 4,
    quote: 'Команда duso_ecom помогла нам выйти на новый уровень. Конверсия увеличилась вдвое за 3 месяца.',
    company: 'BeautyPro',
    website: 'beautypro.ru',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    role: 'Founder',
    name: 'Анна Козлова'
  },
  {
    id: 5,
    quote: 'Отличная техподдержка и быстрое решение любых вопросов. Рекомендую всем, кто серьёзно относится к e-commerce.',
    company: 'SportMax',
    website: 'sportmax.ru',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    role: 'Operations Manager',
    name: 'Сергей Волков'
  }
];

export const stats = [
  { value: '$3B+', label: 'Доход сгенерирован для клиентов', description: 'Суммарный оборот наших клиентов за все время сотрудничества' },
  { value: '2800+', label: 'Успешных миграций', description: 'Переведённых магазинов на Shopify без потери данных' },
  { value: '700+', label: 'Мобильных приложений', description: 'Разработанных приложений для iOS и Android' },
  { value: '6500+', label: 'Shopify магазинов', description: 'Созданных и запущенных интернет-магазинов' }
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
  }
];

export const awards = {
  shopifyCertifications: [
    'Shopify Plus Partner',
    'Certified Shopify Expert',
    'Shopify Scripts Developer',
    'Shopify Theme Expert'
  ],
  clutchAwards: [
    'Top E-commerce Agency 2024',
    'Top Web Developer',
    'Top Shopify Company'
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
    title: '10 способов увеличить конверсию интернет-магазина',
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
  }
];

export const faq = [
  {
    question: 'Сколько стоит создание интернет-магазина?',
    answer: 'Стоимость зависит от сложности проекта и начинается от $5,000 для базового магазина. Свяжитесь с нами для бесплатной оценки вашего проекта.'
  },
  {
    question: 'Сколько времени занимает разработка?',
    answer: 'Типичный проект занимает от 4 до 12 недель в зависимости от сложности. Срочные проекты можем выполнить за 2-3 недели.'
  },
  {
    question: 'Работаете ли вы с клиентами из других стран?',
    answer: 'Да, мы работаем с клиентами по всему миру. У нас есть опыт работы с компаниями из США, Европы, Азии и СНГ.'
  },
  {
    question: 'Предоставляете ли вы поддержку после запуска?',
    answer: 'Да, мы предлагаем различные пакеты поддержки — от базового до премиум с круглосуточным обслуживанием.'
  },
  {
    question: 'Можете ли вы помочь с маркетингом?',
    answer: 'Да, у нас есть полноценная команда маркетинга, которая занимается SEO, PPC, SMM и email-маркетингом.'
  }
];

export const trustedBrands = [
  { name: 'TechBrand', color: '#f97316' },
  { name: 'ShopMax', color: '#10b981' },
  { name: 'E-Store', color: '#f97316' },
  { name: 'DigiMart', color: '#10b981' },
  { name: 'CloudShop', color: '#f97316' },
  { name: 'NetCommerce', color: '#10b981' },
];