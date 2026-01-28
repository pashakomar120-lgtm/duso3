import React from 'react';
import { scrollingText } from '../data/mockData';

const ScrollingText = () => {
  const fullText = `Мы ${scrollingText} • `;
  const repeatedText = fullText.repeat(6);

  return (
    <section className="bg-[#0a0a0b] py-8 overflow-hidden border-y border-white/5">
      <div className="relative">
        <div 
          className="flex whitespace-nowrap animate-scroll"
          style={{
            animation: 'scroll 30s linear infinite'
          }}
        >
          <span className="text-2xl md:text-3xl font-semibold text-white/90 tracking-wide">
            {repeatedText}
          </span>
          <span className="text-2xl md:text-3xl font-semibold text-white/90 tracking-wide">
            {repeatedText}
          </span>
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