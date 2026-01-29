import React from 'react';
import { scrollingText } from '../data/mockData';
import { Sparkles } from 'lucide-react';

const ScrollingText = () => {
  const items = [
    { text: 'Shopify Expert', highlight: true },
    { text: scrollingText, highlight: false },
    { text: '6500+ магазинов', highlight: true },
    { text: 'Конверсия +180%', highlight: false },
    { text: '$3B+ оборота', highlight: true },
    { text: '98% довольных клиентов', highlight: false },
  ];

  return (
    <section className="py-6 overflow-hidden relative z-10">
      {/* Glass background */}
      <div className="absolute inset-0 glass opacity-30" />
      
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      
      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      
      <div className="relative">
        <div 
          className="flex whitespace-nowrap"
          style={{
            animation: 'scroll 40s linear infinite'
          }}
        >
          {[1, 2].map((_, groupIndex) => (
            <div key={groupIndex} className="flex items-center">
              {items.map((item, index) => (
                <div key={`${groupIndex}-${index}`} className="flex items-center mx-8">
                  {item.highlight ? (
                    <>
                      <Sparkles className="w-5 h-5 text-orange-500 mr-2" />
                      <span className="text-xl md:text-2xl font-bold text-orange-500 text-glow-orange">
                        {item.text}
                      </span>
                    </>
                  ) : (
                    <span className="text-xl md:text-2xl font-semibold text-white/80">
                      {item.text}
                    </span>
                  )}
                  <span className="text-gray-600 mx-8">•</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default ScrollingText;
