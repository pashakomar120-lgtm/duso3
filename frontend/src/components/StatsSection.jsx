import React, { useState, useEffect, useRef } from 'react';
import { stats } from '../data/mockData';
import { TrendingUp } from 'lucide-react';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Animate counters
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setCounts(stats.map((stat) => {
        const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
        return Math.floor(numericValue * eased);
      }));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  const formatValue = (index, count) => {
    const original = stats[index].value;
    if (original.includes('$')) return `$${count}B+`;
    if (original.includes('%')) return `${count}%`;
    if (original.includes('/')) return original;
    if (original.includes('+')) return `${count}+`;
    return count.toString();
  };

  return (
    <section ref={sectionRef} className="py-24 relative z-10">
      {/* Glass background */}
      <div className="absolute inset-0 glass-strong opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-emerald-500 text-sm font-medium tracking-wider uppercase mb-4 block">
            Наши достижения
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Цифры <span className="text-orange-500 text-glow-orange">говорят</span> сами за себя
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            От стартапов до глобальных брендов — реальные результаты, реальный рост
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.slice(0, 8).map((stat, index) => (
            <div
              key={index}
              data-testid={`stat-card-${index}`}
              className={`floating-card text-center p-6 rounded-2xl transition-all duration-700 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-orange-500/5 to-emerald-500/5" />
              
              <div className="relative">
                {/* Value */}
                <div className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-2 ${
                  index % 2 === 0 ? 'text-orange-500' : 'text-emerald-500'
                }`}>
                  {isVisible ? formatValue(index, counts[index]) : '0'}
                </div>
                
                {/* Label */}
                <p className="text-white font-medium text-sm md:text-base mb-1">
                  {stat.label}
                </p>
                
                {/* Description */}
                {stat.description && (
                  <p className="text-gray-500 text-xs">
                    {stat.description}
                  </p>
                )}

                {/* Trend indicator */}
                <div className="mt-3 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <TrendingUp className={`w-4 h-4 ${index % 2 === 0 ? 'text-orange-500' : 'text-emerald-500'}`} />
                  <span className="text-xs text-gray-400">Растёт</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
