import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck, Globe, Mail, Calendar } from 'lucide-react';

const PrivacyPage = () => {
  const sections = [
    {
      icon: Database,
      title: 'Какие данные мы собираем',
      content: [
        'Контактные данные: имя, email, телефон, Telegram',
        'Данные о компании: название, сфера деятельности, бюджет проекта',
        'Техническая информация: IP-адрес, тип браузера, устройство',
        'Данные об использовании: посещённые страницы, время на сайте, действия'
      ]
    },
    {
      icon: Eye,
      title: 'Как мы используем данные',
      content: [
        'Обработка и выполнение заказов на услуги',
        'Связь с вами по вопросам проекта',
        'Отправка маркетинговых материалов (с вашего согласия)',
        'Улучшение качества наших услуг и сайта',
        'Аналитика и статистика посещаемости'
      ]
    },
    {
      icon: Lock,
      title: 'Защита данных',
      content: [
        'SSL-шифрование всех передаваемых данных',
        'Хранение данных на защищённых серверах',
        'Ограниченный доступ сотрудников к персональным данным',
        'Регулярные аудиты безопасности',
        'Соответствие требованиям GDPR и локальным законам о защите данных'
      ]
    },
    {
      icon: UserCheck,
      title: 'Ваши права',
      content: [
        'Запросить копию ваших персональных данных',
        'Потребовать исправления неточных данных',
        'Запросить удаление ваших данных',
        'Отозвать согласие на обработку данных',
        'Подать жалобу в надзорный орган'
      ]
    },
    {
      icon: Globe,
      title: 'Передача данных третьим лицам',
      content: [
        'Мы не продаём ваши данные третьим лицам',
        'Данные могут передаваться партнёрам только для выполнения заказа',
        'Используем сервисы аналитики (Google Analytics, Facebook Pixel)',
        'При передаче данных обеспечиваем их защиту'
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500/10 mb-6">
            <Shield className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Политика <span className="text-orange-500">конфиденциальности</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Мы заботимся о защите ваших персональных данных
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-gray-500 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Последнее обновление: 1 января 2025</span>
          </div>
        </div>

        {/* Introduction */}
        <div className="floating-card rounded-2xl p-8 mb-8">
          <p className="text-gray-300 leading-relaxed">
            Настоящая Политика конфиденциальности описывает, как <span className="text-orange-500 font-semibold">duso_ecom</span> собирает, 
            использует и защищает персональные данные пользователей сайта. Мы работаем с клиентами по всему СНГ 
            (Россия, Украина, Казахстан, Беларусь, Узбекистан, Азербайджан, Грузия, Армения) и соблюдаем 
            требования законодательства каждой страны в области защиты персональных данных.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="floating-card rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-orange-500" />
                </div>
                <h2 className="text-xl font-bold text-white pt-2">{section.title}</h2>
              </div>
              <ul className="space-y-3 ml-16">
                {section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cookies */}
        <div className="floating-card rounded-2xl p-8 mt-6">
          <h2 className="text-xl font-bold text-white mb-4">Файлы cookie</h2>
          <p className="text-gray-400 mb-4">
            Наш сайт использует файлы cookie для улучшения пользовательского опыта:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass rounded-xl p-4">
              <div className="text-emerald-500 font-medium mb-2">Необходимые cookie</div>
              <p className="text-gray-500 text-sm">Обеспечивают работу основных функций сайта</p>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-emerald-500 font-medium mb-2">Аналитические cookie</div>
              <p className="text-gray-500 text-sm">Помогают понять, как посетители используют сайт</p>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-emerald-500 font-medium mb-2">Маркетинговые cookie</div>
              <p className="text-gray-500 text-sm">Используются для показа релевантной рекламы</p>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-emerald-500 font-medium mb-2">Функциональные cookie</div>
              <p className="text-gray-500 text-sm">Сохраняют ваши предпочтения на сайте</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="floating-card rounded-2xl p-8 mt-6 text-center">
          <h2 className="text-xl font-bold text-white mb-4">Вопросы о конфиденциальности?</h2>
          <p className="text-gray-400 mb-4">
            Если у вас есть вопросы о нашей политике конфиденциальности, свяжитесь с нами:
          </p>
          <a
            href="mailto:privacy@duso-ecom.com"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors"
          >
            <Mail className="w-5 h-5" />
            privacy@duso-ecom.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
