import React, { useEffect, useRef, useState, memo } from 'react';
import { storeLogos } from '../data/testimonialsData';

// Flag images from flagcdn.com
const flagImages = {
  '🇷🇺': 'https://flagcdn.com/w40/ru.png',
  '🇺🇦': 'https://flagcdn.com/w40/ua.png',
  '🇰🇿': 'https://flagcdn.com/w40/kz.png',
  '🇧🇾': 'https://flagcdn.com/w40/by.png',
  '🇺🇿': 'https://flagcdn.com/w40/uz.png',
  '🇦🇿': 'https://flagcdn.com/w40/az.png',
  '🇬🇪': 'https://flagcdn.com/w40/ge.png',
  '🇦🇲': 'https://flagcdn.com/w40/am.png',
};

const FlagImage = memo(({ country, size = 'w-8 h-6' }) => {
  const flagUrl = flagImages[country] || flagImages['🇷🇺'];
  return (
    <img 
      src={flagUrl} 
      alt={country}
      className={`${size} object-cover rounded shadow-sm`}
      loading="lazy"
    />
  );
});

FlagImage.displayName = 'FlagImage';

const StoreCard = memo(({ store, variant = 'purple' }) => {
  const colors = variant === 'purple' 
    ? 'hover:border-purple-500/30 hover:bg-purple-500/5 from-purple-500/20 to-orange-500/20 group-hover:border-purple-500/30'
    : 'hover:border-orange-500/30 hover:bg-orange-500/5 from-orange-500/20 to-pink-500/20 group-hover:border-orange-500/30';
  
  return (
    <div className="flex-shrink-0 group">
      <div className={`w-48 sm:w-52 h-20 sm:h-24 rounded-xl glass border border-white/5 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 transition-all duration-300 ${colors.split(' ').slice(0, 2).join(' ')} cursor-pointer`}>
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${colors.split(' ').slice(2, 4).join(' ')} flex items-center justify-center border border-white/10 transition-colors`}>
          <span className="text-white font-bold text-xs sm:text-sm">{store.logo}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium text-xs sm:text-sm truncate">{store.name}</p>
          <p className="text-gray-500 text-[10px] sm:text-xs truncate">{store.domain}</p>
          <div className="mt-1">
            <FlagImage country={store.country} size="w-4 h-3 sm:w-5 sm:h-4" />
          </div>
        </div>
      </div>
    </div>
  );
});

StoreCard.displayName = 'StoreCard';

const StoreLogosWow = memo(() => {
  const scrollRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    
    const scroll = scrollRef.current;
    if (!scroll) return;

    let animationId;
    let scrollPosition = 0;
    const speed = 0.3;

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
  }, [isInView]);

  const displayLogos = storeLogos.slice(0, 20);
  const allLogos = [...displayLogos, ...displayLogos];

  const countries = [
    { flag: '🇷🇺', name: 'Россия', count: '3200+', color: 'from-red-500/20 to-blue-500/20', border: 'hover:border-red-500/50' },
    { flag: '🇺🇦', name: 'Украина', count: '1500+', color: 'from-blue-500/20 to-yellow-500/20', border: 'hover:border-blue-500/50' },
    { flag: '🇰🇿', name: 'Казахстан', count: '800+', color: 'from-cyan-500/20 to-yellow-500/20', border: 'hover:border-cyan-500/50' },
    { flag: '🇧🇾', name: 'Беларусь', count: '450+', color: 'from-red-500/20 to-green-500/20', border: 'hover:border-green-500/50' },
    { flag: '🇺🇿', name: 'Узбекистан', count: '250+', color: 'from-blue-500/20 to-green-500/20', border: 'hover:border-blue-500/50' },
    { flag: '🇦🇿', name: 'Азербайджан', count: '180+', color: 'from-blue-500/20 to-red-500/20', border: 'hover:border-red-500/50' },
    { flag: '🇬🇪', name: 'Грузия', count: '80+', color: 'from-red-500/20 to-white/10', border: 'hover:border-red-500/50' },
    { flag: '🇦🇲', name: 'Армения', count: '40+', color: 'from-red-500/20 to-orange-500/20', border: 'hover:border-orange-500/50' },
  ];

  return (
    <section className="py-12 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 border border-emerald-500/20">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-500 text-xs sm:text-sm font-medium">6500+ успешных проектов</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Наши <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">клиенты</span> по всему СНГ
          </h2>
          <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto">
            Магазины из 8 стран доверяют нам свой e-commerce
          </p>
        </div>

        {/* Scrolling logos container */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0a0a0b] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0a0a0b] to-transparent z-10 pointer-events-none" />

          {/* Scrolling row */}
          <div 
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-hidden py-4"
            style={{ scrollBehavior: 'auto' }}
          >
            {allLogos.map((store, index) => (
              <StoreCard key={`store-${index}`} store={store} variant={index % 2 === 0 ? 'purple' : 'orange'} />
            ))}
          </div>
        </div>

        {/* Country flags summary */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 sm:gap-4 mt-8 sm:mt-12">
          {countries.map((country) => (
            <div
              key={country.name}
              className={`glass rounded-xl sm:rounded-2xl p-2 sm:p-4 border border-white/10 ${country.border} transition-all duration-300 cursor-pointer group hover:scale-105`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-10 h-10 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br ${country.color} flex items-center justify-center mb-2 sm:mb-3 overflow-hidden`}>
                  <img 
                    src={flagImages[country.flag]} 
                    alt={country.name}
                    className="w-8 h-6 sm:w-12 sm:h-9 object-cover rounded shadow-lg"
                    loading="lazy"
                  />
                </div>
                <p className="text-white text-[10px] sm:text-sm font-medium mb-0.5 sm:mb-1 hidden sm:block">{country.name}</p>
                <p className="text-emerald-400 text-xs sm:text-lg font-bold">{country.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

StoreLogosWow.displayName = 'StoreLogosWow';

export default StoreLogosWow;
