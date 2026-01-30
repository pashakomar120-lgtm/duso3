import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Rocket, Building2, Globe, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { Button } from './ui/button';

const targetAudience = [
  {
    icon: Rocket,
    title: 'Стартапы',
    description: 'Запускаете первый интернет-магазин? Поможем создать прочный фундамент для роста.',
    benefits: ['Быстрый запуск за 2-4 недели', 'Минимальные начальные затраты', 'Масштабируемая архитектура'],
    color: 'orange'
  },
  {
    icon: Building2,
    title: 'Действующий бизнес',
    description: 'Хотите перейти в онлайн или улучшить текущий магазин? Мы знаем как.',
    benefits: ['Миграция без потери данных', 'Увеличение конверсии', 'Автоматизация процессов'],
    color: 'emerald'
  },
  {
    icon: Globe,
    title: 'Международные компании',
    description: 'Выходите на рынки СНГ или за рубеж? Настроим мультирегиональные продажи.',
    benefits: ['Мультивалютность', 'Локализация контента', 'Международная доставка'],
    color: 'orange'
  },
  {
    icon: ShoppingBag,
    title: 'D2C бренды',
    description: 'Продаёте напрямую потребителю? Создадим уникальный опыт для вашего бренда.',
    benefits: ['Брендинг и UX', 'Подписочные модели', 'Программы лояльности'],
    color: 'emerald'
  },
  {
    icon: TrendingUp,
    title: 'Быстрорастущие компании',
    description: 'Растёте быстрее, чем справляетесь? Масштабируем инфраструктуру.',
    benefits: ['Shopify Plus', 'Высокие нагрузки', 'Enterprise интеграции'],
    color: 'orange'
  },
  {
    icon: Users,
    title: 'Маркетплейсы',
    description: 'Хотите создать свой маркетплейс? У нас есть решение.',
    benefits: ['Multi-vendor платформа', 'Управление продавцами', 'Комиссионные системы'],
    color: 'emerald'
  }
];

const WhoWeWorkWith = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 relative z-10">
      <div className="absolute inset-0 glass opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-orange-500 text-sm font-medium tracking-wider uppercase mb-4 block">
            Наша аудитория
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Кому мы <span className="text-emerald-500 text-glow-emerald">подходим</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Работаем с компаниями любого размера — от стартапов до enterprise. Главное — амбиции и готовность расти.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {targetAudience.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                data-testid={`audience-card-${index}`}
                className="floating-card rounded-2xl p-6 group hover:border-orange-500/30 transition-all duration-500"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                  item.color === 'orange' 
                    ? 'bg-orange-500/10 group-hover:bg-orange-500/20' 
                    : 'bg-emerald-500/10 group-hover:bg-emerald-500/20'
                }`}>
                  <Icon className={`w-7 h-7 ${item.color === 'orange' ? 'text-orange-500' : 'text-emerald-500'}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {item.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-2">
                  {item.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.color === 'orange' ? 'bg-orange-500' : 'bg-emerald-500'}`} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Не нашли себя? Напишите нам — найдём решение!</p>
          <Button
            onClick={() => navigate('/contact')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 px-8 py-6 rounded-xl shadow-lg shadow-orange-500/25"
          >
            Обсудить проект
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhoWeWorkWith;
