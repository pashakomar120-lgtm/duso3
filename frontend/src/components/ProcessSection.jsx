import React from 'react';
import { MessageCircle, FileSearch, PenTool, Code, Rocket, HeadphonesIcon } from 'lucide-react';

const processSteps = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Консультация',
    description: 'Обсуждаем ваши цели, анализируем нишу и конкурентов. Бесплатно.',
    duration: '1-2 дня'
  },
  {
    number: '02',
    icon: FileSearch,
    title: 'Аналитика и стратегия',
    description: 'Разрабатываем детальный план проекта, определяем KPI и этапы.',
    duration: '3-5 дней'
  },
  {
    number: '03',
    icon: PenTool,
    title: 'Дизайн',
    description: 'Создаём уникальный дизайн, который конвертирует посетителей в покупателей.',
    duration: '1-2 недели'
  },
  {
    number: '04',
    icon: Code,
    title: 'Разработка',
    description: 'Воплощаем дизайн в жизнь, интегрируем все необходимые системы.',
    duration: '2-4 недели'
  },
  {
    number: '05',
    icon: Rocket,
    title: 'Запуск',
    description: 'Тестируем, оптимизируем и запускаем ваш магазин в продакшн.',
    duration: '2-3 дня'
  },
  {
    number: '06',
    icon: HeadphonesIcon,
    title: 'Поддержка',
    description: 'Обеспечиваем техподдержку 24/7 и помогаем с развитием.',
    duration: 'Постоянно'
  }
];

const ProcessSection = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-emerald-500 text-sm font-medium tracking-wider uppercase mb-4 block">
            Как мы работаем
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Процесс <span className="text-orange-500 text-glow-orange">от идеи до запуска</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Прозрачный и предсказуемый процесс. Вы всегда знаете, что происходит.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/50 via-emerald-500/50 to-orange-500/50 hidden lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index}
                  data-testid={`process-step-${index}`}
                  className={`lg:grid lg:grid-cols-2 lg:gap-16 items-center ${index > 0 ? 'lg:mt-[-80px]' : ''}`}
                >
                  {/* Left side */}
                  <div className={`${isEven ? 'lg:text-right lg:pr-16' : 'lg:order-2 lg:pl-16'}`}>
                    {isEven && (
                      <div className="floating-card rounded-2xl p-6 inline-block text-left lg:text-right">
                        <div className={`flex items-center gap-4 mb-4 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                          <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-orange-500" />
                          </div>
                          <span className="text-4xl font-bold text-orange-500/20">{step.number}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-gray-400 text-sm mb-3">{step.description}</p>
                        <span className="text-emerald-500 text-xs font-medium px-3 py-1 bg-emerald-500/10 rounded-full">
                          {step.duration}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-orange-500 to-emerald-500 shadow-lg" style={{ top: `${index * 16.66 + 8}%` }} />

                  {/* Right side */}
                  <div className={`${!isEven ? 'lg:text-left lg:pl-16' : 'lg:order-2 lg:pr-16'}`}>
                    {!isEven && (
                      <div className="floating-card rounded-2xl p-6 inline-block">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-4xl font-bold text-emerald-500/20">{step.number}</span>
                          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-emerald-500" />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-gray-400 text-sm mb-3">{step.description}</p>
                        <span className="text-orange-500 text-xs font-medium px-3 py-1 bg-orange-500/10 rounded-full">
                          {step.duration}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Total time */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 glass rounded-2xl px-8 py-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">2-6</div>
              <div className="text-gray-500 text-xs">недель</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-left">
              <div className="text-white font-medium">Среднее время запуска</div>
              <div className="text-gray-500 text-sm">в зависимости от сложности проекта</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
