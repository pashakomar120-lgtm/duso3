import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Rocket, Zap, Shield } from 'lucide-react';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Animated border */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-emerald-500 to-orange-500 opacity-20 animate-pulse" />
          <div className="absolute inset-[1px] rounded-3xl bg-gray-900" />
          
          {/* Background with gradient */}
          <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800" />
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-2xl" />

          {/* Floating icons */}
          <div className="absolute top-10 left-10 w-12 h-12 glass rounded-xl flex items-center justify-center opacity-50 float">
            <Rocket className="w-6 h-6 text-orange-500" />
          </div>
          <div className="absolute top-10 right-10 w-12 h-12 glass rounded-xl flex items-center justify-center opacity-50 float-slow" style={{ animationDelay: '1s' }}>
            <Zap className="w-6 h-6 text-emerald-500" />
          </div>
          <div className="absolute bottom-10 left-1/4 w-12 h-12 glass rounded-xl flex items-center justify-center opacity-50 float-fast">
            <Shield className="w-6 h-6 text-orange-500" />
          </div>

          {/* Content */}
          <div className="relative z-10 py-20 px-8 md:px-16 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 border border-emerald-500/30">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-emerald-500 text-sm font-medium">Готовы к росту?</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Не довольствуйтесь{' '}
              <span className="text-orange-500 text-glow-orange">вторым лучшим</span>
            </h2>
            <h3 className="text-xl md:text-2xl text-gray-400 mb-4">
              Когда <span className="text-emerald-500 font-bold text-glow-emerald">duso_ecom</span> рядом
            </h3>
            <p className="text-gray-500 max-w-xl mx-auto mb-10">
              Бесплатная консультация • Индивидуальный подход • Гарантия результата
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/contact')}
                data-testid="cta-main-button"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 px-10 py-7 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 rounded-xl btn-glow"
              >
                Обсудить проект
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => navigate('/portfolio')}
                data-testid="cta-secondary-button"
                className="glass border-2 border-emerald-500/30 text-emerald-500 hover:border-emerald-500 hover:bg-emerald-500/10 px-10 py-7 text-lg font-medium transition-all duration-300 rounded-xl"
              >
                Смотреть работы
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-white/5">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">6500+</div>
                <div className="text-xs text-gray-500">Магазинов</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-xs text-gray-500">Довольны</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-xs text-gray-500">Поддержка</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
