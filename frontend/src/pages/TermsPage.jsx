import React from 'react';
import { FileText, CheckCircle, AlertCircle, CreditCard, Scale, Clock, Ban, RefreshCw, Mail, Calendar } from 'lucide-react';

const TermsPage = () => {
  const sections = [
    {
      icon: FileText,
      title: '1. Общие положения',
      content: `Настоящие Условия использования регулируют отношения между duso_ecom (далее — "Компания", "мы") 
      и пользователями сайта (далее — "Клиент", "вы"). Используя наш сайт и услуги, вы соглашаетесь с данными условиями.
      
      Компания оставляет за собой право изменять условия в любое время. Актуальная версия всегда доступна на этой странице.`
    },
    {
      icon: CheckCircle,
      title: '2. Услуги',
      content: `Мы предоставляем услуги по разработке, дизайну, маркетингу и поддержке e-commerce проектов, включая:
      
      • Создание интернет-магазинов на Shopify и других платформах
      • Дизайн и UX/UI проектирование
      • Интеграция платёжных систем и доставки
      • SEO-оптимизация и таргетированная реклама
      • Техническая поддержка и обслуживание
      
      Полный список услуг доступен в разделе "Услуги" на нашем сайте.`
    },
    {
      icon: CreditCard,
      title: '3. Оплата и цены',
      content: `• Цены указаны в долларах США и могут изменяться
      • Предоплата составляет 50% от стоимости проекта
      • Оставшаяся сумма оплачивается после завершения работ
      • Мы принимаем банковские переводы, карты и криптовалюту
      • Цены не включают налоги, которые применяются в вашей юрисдикции
      • Возврат предоплаты возможен до начала работ`
    },
    {
      icon: Clock,
      title: '4. Сроки выполнения',
      content: `• Сроки оговариваются индивидуально для каждого проекта
      • Стандартный срок разработки магазина: 2-6 недель
      • Задержки по вине клиента не влияют на обязательства компании
      • При форс-мажорных обстоятельствах сроки могут быть пересмотрены
      • Мы уведомляем о возможных задержках заранее`
    },
    {
      icon: Scale,
      title: '5. Права и обязанности',
      content: `Клиент обязуется:
      • Предоставлять необходимые материалы в согласованные сроки
      • Своевременно оплачивать услуги
      • Не использовать наши работы для незаконной деятельности
      
      Компания обязуется:
      • Выполнять работы качественно и в срок
      • Обеспечивать конфиденциальность информации клиента
      • Предоставлять техническую поддержку согласно договору`
    },
    {
      icon: RefreshCw,
      title: '6. Гарантии и поддержка',
      content: `• Гарантия на выполненные работы: 30 дней
      • Бесплатное исправление багов в течение гарантийного срока
      • Техническая поддержка 24/7 для клиентов с активным договором
      • Мы не гарантируем конкретные результаты продаж
      • Гарантия не распространяется на изменения, внесённые третьими лицами`
    },
    {
      icon: Ban,
      title: '7. Ограничение ответственности',
      content: `• Компания не несёт ответственности за упущенную выгоду
      • Максимальная ответственность ограничена суммой оплаченных услуг
      • Мы не отвечаем за сбои на стороне хостинга или платформы
      • Клиент несёт ответственность за контент своего магазина
      • Мы не гарантируем бесперебойную работу сторонних сервисов`
    },
    {
      icon: AlertCircle,
      title: '8. Разрешение споров',
      content: `• Споры решаются путём переговоров
      • При невозможности договориться — через арбитраж
      • Применимое право: законодательство Российской Федерации
      • Для клиентов из других стран СНГ могут применяться локальные законы
      • Срок подачи претензии: 30 дней с момента возникновения спора`
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 mb-6">
            <FileText className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Условия <span className="text-emerald-500">использования</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Правила и условия предоставления услуг
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-gray-500 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Последнее обновление: 1 января 2025</span>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="floating-card rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Краткое содержание</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-400 text-sm">Предоплата 50%, остаток после выполнения</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-400 text-sm">Гарантия 30 дней на выполненные работы</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-400 text-sm">Сроки разработки: 2-6 недель</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-400 text-sm">Поддержка 24/7 для активных клиентов</span>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="floating-card rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  index % 2 === 0 ? 'bg-orange-500/10' : 'bg-emerald-500/10'
                }`}>
                  <section.icon className={`w-6 h-6 ${index % 2 === 0 ? 'text-orange-500' : 'text-emerald-500'}`} />
                </div>
                <h2 className="text-xl font-bold text-white pt-2">{section.title}</h2>
              </div>
              <div className="ml-16 text-gray-400 whitespace-pre-line leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* CIS Notice */}
        <div className="floating-card rounded-2xl p-8 mt-6 border border-orange-500/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Для клиентов из СНГ</h3>
              <p className="text-gray-400">
                Мы работаем с клиентами из России, Украины, Казахстана, Беларуси, Узбекистана, 
                Азербайджана, Грузии и Армении. Условия могут незначительно отличаться в зависимости 
                от требований локального законодательства. При необходимости мы предоставим 
                дополнительные документы на языке вашей страны.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="floating-card rounded-2xl p-8 mt-6 text-center">
          <h2 className="text-xl font-bold text-white mb-4">Есть вопросы?</h2>
          <p className="text-gray-400 mb-4">
            Если вам нужны разъяснения по условиям использования, свяжитесь с нами:
          </p>
          <a
            href="mailto:legal@duso-ecom.com"
            className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            <Mail className="w-5 h-5" />
            legal@duso-ecom.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
