import React, { useEffect, useRef } from 'react';
import { storeLogos } from '../data/testimonialsData';

const StoreLogosWow = () => {
  const scrollRef = useRef(null);

  // Auto-scroll animation
  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;

    let animationId;
    let scrollPosition = 0;
    const speed = 0.5;

    const animate = () => {
      scrollPosition += speed;
      if (scrollPosition >= scroll.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scroll.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Duplicate logos for seamless loop
  const allLogos = [...storeLogos, ...storeLogos];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transform -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl transform -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-emerald-500/20">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-500 text-sm font-medium">6500+ успешных проектов</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Наши <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">клиенты</span> по всему СНГ
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Магазины из 8 стран доверяют нам свой e-commerce
          </p>
        </div>

        {/* Scrolling logos container */}
        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0b] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0b] to-transparent z-10 pointer-events-none" />

          {/* Scrolling row 1 */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-hidden py-4 mb-6"
            style={{ scrollBehavior: 'auto' }}
          >
            {allLogos.slice(0, 40).map((store, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="w-48 h-24 rounded-xl glass border border-white/5 flex items-center justify-center gap-3 px-4 transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/5 cursor-pointer">
                  {/* Logo circle */}
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-orange-500/20 flex items-center justify-center border border-white/10 group-hover:border-purple-500/30 transition-colors">
                    <span className="text-white font-bold text-sm">{store.logo}</span>
                  </div>
                  {/* Store info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{store.name}</p>
                    <p className="text-gray-500 text-xs truncate">{store.domain}</p>
                    <p className="text-xs mt-0.5">{store.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scrolling row 2 (reverse direction) */}
          <div 
            className="flex gap-6 overflow-hidden py-4"
            style={{ 
              animation: 'scroll-reverse 60s linear infinite',
            }}
          >
            {allLogos.slice(20).map((store, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="w-48 h-24 rounded-xl glass border border-white/5 flex items-center justify-center gap-3 px-4 transition-all duration-300 hover:border-orange-500/30 hover:bg-orange-500/5 cursor-pointer">
                  {/* Logo circle */}
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center border border-white/10 group-hover:border-orange-500/30 transition-colors">
                    <span className="text-white font-bold text-sm">{store.logo}</span>
                  </div>
                  {/* Store info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{store.name}</p>
                    <p className="text-gray-500 text-xs truncate">{store.domain}</p>
                    <p className="text-xs mt-0.5">{store.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Country flags summary */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {[
            { flag: '🇷🇺', name: 'Россия', count: '3200+' },
            { flag: '🇺🇦', name: 'Украина', count: '1500+' },
            { flag: '🇰🇿', name: 'Казахстан', count: '800+' },
            { flag: '🇧🇾', name: 'Беларусь', count: '450+' },
            { flag: '🇺🇿', name: 'Узбекистан', count: '250+' },
            { flag: '🇦🇿', name: 'Азербайджан', count: '180+' },
            { flag: '🇬🇪', name: 'Грузия', count: '80+' },
            { flag: '🇦🇲', name: 'Армения', count: '40+' },
          ].map((country) => (
            <div
              key={country.name}
              className="glass rounded-xl px-4 py-3 border border-white/5 hover:border-white/20 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{country.flag}</span>
                <div>
                  <p className="text-white text-sm font-medium group-hover:text-purple-400 transition-colors">{country.name}</p>
                  <p className="text-emerald-500 text-xs font-semibold">{country.count} магазинов</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for reverse animation */}
      <style>{`
        @keyframes scroll-reverse {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default StoreLogosWow;
