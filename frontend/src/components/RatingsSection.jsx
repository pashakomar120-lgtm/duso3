import React from 'react';
import { ratings } from '../data/mockData';
import { Star, Trophy, Award } from 'lucide-react';

const RatingsSection = () => {
  const icons = [Star, Trophy, Award];

  return (
    <section id="about" className="bg-[#0a0a0b] py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Гордый E-commerce Партнёр, поддерживающий глобальный бизнес
        </h2>

        {/* Ratings Row */}
        <div className="flex flex-wrap justify-center gap-8">
          {ratings.map((rating, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="flex items-center gap-3 bg-[#111827] px-6 py-4 rounded-full hover:bg-[#1e293b] transition-colors duration-300 cursor-pointer"
              >
                <Icon className="w-6 h-6 text-[#f97316]" />
                <span className="text-white text-sm md:text-base">
                  {rating.text}{' '}
                  <span className="text-[#10b981] font-semibold">{rating.platform}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RatingsSection;