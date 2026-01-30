import React, { useState, useEffect } from 'react';
import { resources, faq } from '../data/mockData';
import { Clock, ArrowRight, ChevronDown, ChevronUp, BookOpen, FileText, CheckSquare, Lightbulb, TrendingUp, X, Share2, Bookmark, BookmarkCheck, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ui/use-toast';

const ResourcesPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openFaq, setOpenFaq] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedResource, setSelectedResource] = useState(null);
  const [savedArticles, setSavedArticles] = useState(() => {
    const saved = localStorage.getItem('savedArticles');
    return saved ? JSON.parse(saved) : [];
  });

  // Close modal on ESC key press
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && selectedResource) {
        setSelectedResource(null);
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [selectedResource]);

  // Check if article is saved
  const isArticleSaved = (id) => savedArticles.includes(id);

  // Toggle save article
  const toggleSaveArticle = (article) => {
    let newSaved;
    if (isArticleSaved(article.id)) {
      newSaved = savedArticles.filter(id => id !== article.id);
      toast({
        title: "Удалено из сохранённых",
        description: article.title,
      });
    } else {
      newSaved = [...savedArticles, article.id];
      toast({
        title: "✓ Сохранено!",
        description: `"${article.title}" добавлено в закладки`,
      });
    }
    setSavedArticles(newSaved);
    localStorage.setItem('savedArticles', JSON.stringify(newSaved));
  };

  // Share article
  const shareArticle = async (article) => {
    const shareData = {
      title: article.title,
      text: article.excerpt,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "✓ Ссылка скопирована!",
          description: "Теперь вы можете поделиться статьёй",
        });
      }
    } catch (err) {
      console.log('Share error:', err);
    }
  };

  const categories = ['all', 'Гайд', 'Сравнение', 'Чеклист', 'Стратегия', 'Тренды'];

  const categoryIcons = {
    'Гайд': BookOpen,
    'Сравнение': FileText,
    'Чеклист': CheckSquare,
    'Стратегия': Lightbulb,
    'Тренды': TrendingUp
  };

  const filteredResources = filter === 'all'
    ? resources
    : resources.filter(r => r.category === filter);

  // Generate full article content based on resource
  const getArticleContent = (resource) => {
    const contentMap = {
      1: {
        sections: [
          { title: 'Введение', content: 'Конверсия — ключевой показатель успеха любого интернет-магазина. На основе анализа 500+ наших проектов мы выделили 10 наиболее эффективных способов её увеличения.' },
          { title: '1. Оптимизация скорости загрузки', content: 'Каждая дополнительная секунда загрузки снижает конверсию на 7%. Используйте CDN, оптимизируйте изображения (WebP формат), включите кэширование браузера. Целевое время загрузки — до 2 секунд.' },
          { title: '2. Улучшение мобильного опыта', content: '70% трафика e-commerce приходится на мобильные устройства. Убедитесь, что кнопки достаточно большие (минимум 48px), формы удобны для заполнения, а процесс оплаты адаптирован под мобильные.' },
          { title: '3. Социальные доказательства', content: 'Отзывы, рейтинги и UGC контент увеличивают конверсию до 270%. Размещайте отзывы на страницах товаров, показывайте количество покупателей и популярные товары.' },
          { title: '4. Упрощение checkout процесса', content: 'Каждое дополнительное поле формы снижает конверсию на 3%. Внедрите гостевой checkout, автозаполнение адресов и экспресс-оплату через Apple/Google Pay.' },
          { title: '5. Персонализация контента', content: 'Персонализированные рекомендации увеличивают средний чек на 35%. Используйте AI-алгоритмы для показа релевантных товаров на основе истории просмотров.' },
          { title: 'Заключение', content: 'Внедрение даже нескольких из этих советов может значительно увеличить вашу конверсию. Начните с аудита текущего состояния магазина и приоритизируйте улучшения по потенциальному влиянию на бизнес.' }
        ]
      },
      2: {
        sections: [
          { title: 'Введение', content: 'Выбор между Shopify Plus и Magento — одно из важнейших решений для enterprise e-commerce. Обе платформы имеют свои сильные стороны и подходят для разных сценариев.' },
          { title: 'Shopify Plus: Преимущества', content: 'Быстрый запуск (2-4 недели), низкая стоимость владения, встроенная безопасность, автоматические обновления, экосистема из 6000+ приложений, поддержка до 10,000 checkout/минуту.' },
          { title: 'Magento: Преимущества', content: 'Полный контроль над кодом, неограниченная кастомизация, лучший выбор для сложных B2B сценариев, отсутствие транзакционных комиссий, мощные нативные возможности multi-store.' },
          { title: 'Сравнение стоимости', content: 'Shopify Plus: $2,000-$40,000/мес + 0.25% комиссия. Magento Commerce: $22,000-$125,000/год + хостинг + разработка. Для оборота до $10M/год Shopify Plus обычно экономичнее.' },
          { title: 'Когда выбрать Shopify Plus', content: 'Быстрый выход на рынок, ограниченный бюджет на разработку, стандартные e-commerce процессы, фокус на DTC модель, команда без глубокой технической экспертизы.' },
          { title: 'Когда выбрать Magento', content: 'Сложные B2B требования, уникальные бизнес-процессы, необходимость полного контроля, внутренняя команда разработки, планы по глубокой интеграции с ERP/CRM.' },
          { title: 'Вывод', content: 'Для большинства DTC брендов с оборотом до $50M Shopify Plus — оптимальный выбор. Magento подходит для сложных enterprise-сценариев с уникальными требованиями и ресурсами на поддержку.' }
        ]
      },
      3: {
        sections: [
          { title: 'Техническое SEO', content: '✅ XML sitemap создан и отправлен в Search Console\n✅ Robots.txt правильно настроен\n✅ Canonical URLs настроены\n✅ Скорость загрузки < 3 секунд\n✅ Мобильная адаптация (Mobile-First Index)\n✅ HTTPS включён\n✅ Структурированные данные (Schema.org) для товаров' },
          { title: 'Контент и ключевые слова', content: '✅ Keyword research проведён\n✅ Уникальные title и meta description для каждой страницы\n✅ Уникальные описания товаров (минимум 300 слов)\n✅ Alt-теги для всех изображений\n✅ Внутренняя перелинковка настроена\n✅ Категории оптимизированы под ключевые запросы' },
          { title: 'Структура URL', content: '✅ ЧПУ (человекопонятные URL)\n✅ Категории в URL: /category/product-name\n✅ Нет дублей страниц\n✅ 301 редиректы для удалённых товаров\n✅ Параметры фильтров не индексируются' },
          { title: 'Пользовательский опыт', content: '✅ Удобная навигация и хлебные крошки\n✅ Фасетный поиск без дублей\n✅ Страницы 404 с рекомендациями\n✅ Пагинация с rel=next/prev\n✅ Быстрый внутренний поиск' },
          { title: 'Внешние факторы', content: '✅ Google Business Profile настроен\n✅ Присутствие на картах\n✅ Отзывы в Google\n✅ Ссылки с тематических ресурсов\n✅ Упоминания бренда в СМИ' }
        ]
      }
    };

    return contentMap[resource.id] || {
      sections: [
        { title: 'Введение', content: resource.excerpt },
        { title: 'Основной контент', content: `Это подробная статья о "${resource.title}". Материал находится в разработке и скоро будет опубликован полностью. Подпишитесь на нашу рассылку, чтобы получить уведомление о публикации.` },
        { title: 'Заключение', content: 'Для получения персональной консультации по данной теме свяжитесь с нашими экспертами — мы будем рады помочь вашему бизнесу.' }
      ]
    };
  };

  return (
    <div className="min-h-screen pt-32 relative z-10">
      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-orange-500/20">
              <BookOpen className="w-4 h-4 text-orange-500" />
              <span className="text-orange-500 text-sm font-medium">База знаний</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              База <span className="text-emerald-500 text-glow-emerald">знаний</span>
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed">
              Полезные статьи, гайды и чеклисты по e-commerce от наших экспертов с 20-летним опытом.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                data-testid={`filter-${cat}`}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                    : 'glass text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {cat === 'all' ? 'Все материалы' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource) => {
              const Icon = categoryIcons[resource.category] || BookOpen;
              return (
                <article
                  key={resource.id}
                  data-testid={`resource-card-${resource.id}`}
                  className="floating-card rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedResource(resource)}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-emerald-500/90 text-white text-xs font-medium rounded-full inline-flex items-center gap-1.5 backdrop-blur-sm">
                        <Icon className="w-3 h-3" />
                        {resource.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                      <span>{resource.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {resource.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{resource.excerpt}</p>
                    <button 
                      data-testid={`read-more-${resource.id}`}
                      className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-medium text-sm transition-colors group/btn"
                    >
                      Читать статью
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-emerald-500/20">
              <span className="text-emerald-500 text-sm font-medium">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Часто задаваемые <span className="text-orange-500">вопросы</span>
            </h2>
            <p className="text-gray-400">
              Ответы на самые популярные вопросы о наших услугах
            </p>
          </div>

          <div className="space-y-4">
            {faq.map((item, index) => (
              <div
                key={index}
                data-testid={`faq-item-${index}`}
                className="floating-card rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  data-testid={`faq-toggle-${index}`}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="text-white font-medium pr-4">{item.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-400 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="floating-card rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Остались вопросы?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Наши эксперты с 20-летним опытом готовы ответить на все ваши вопросы и помочь с развитием вашего бизнеса
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/contact')}
                data-testid="cta-contact"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 px-8 py-6 text-lg font-medium shadow-lg shadow-orange-500/25"
              >
                Получить консультацию
              </Button>
              <Button
                onClick={() => navigate('/portfolio')}
                data-testid="cta-portfolio"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-lg font-medium"
              >
                Смотреть кейсы
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Modal */}
      {selectedResource && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedResource(null)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-strong rounded-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Image */}
            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <img
                src={selectedResource.image}
                alt={selectedResource.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedResource(null)}
                data-testid="close-article-modal"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-emerald-500/90 text-white text-xs font-medium rounded-full inline-flex items-center gap-1.5 backdrop-blur-sm">
                  {categoryIcons[selectedResource.category] && React.createElement(categoryIcons[selectedResource.category], { className: "w-3 h-3" })}
                  {selectedResource.category}
                </span>
              </div>

              {/* Title */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-4 text-gray-300 text-sm mb-3">
                  <span>{selectedResource.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedResource.readTime}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {selectedResource.title}
                </h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* Actions */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                <button 
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  onClick={() => {
                    navigator.share?.({ 
                      title: selectedResource.title, 
                      url: window.location.href 
                    });
                  }}
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Поделиться</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Bookmark className="w-4 h-4" />
                  <span className="text-sm">Сохранить</span>
                </button>
              </div>

              {/* Article Content */}
              <div className="space-y-6">
                {getArticleContent(selectedResource).sections.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="text-xl font-semibold text-white mb-3">{section.title}</h3>
                    <p className="text-gray-400 leading-relaxed whitespace-pre-line">{section.content}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10 p-6 rounded-xl bg-gradient-to-r from-orange-500/10 to-emerald-500/10 border border-orange-500/20">
                <h4 className="text-lg font-semibold text-white mb-2">Нужна помощь с внедрением?</h4>
                <p className="text-gray-400 mb-4">Наши эксперты помогут применить эти знания для вашего бизнеса</p>
                <Button
                  onClick={() => {
                    setSelectedResource(null);
                    navigate('/contact');
                  }}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
                >
                  Получить консультацию
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
