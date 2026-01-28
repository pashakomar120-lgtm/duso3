import React, { useState, useEffect } from 'react';
import { testimonials } from '../data/mockData';
import { Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#0a0a0b] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
          Вот что говорят <span className="text-[#f97316]">наши клиенты</span> о нас
        </h2>

        {/* Testimonial Card */}
        <div className="relative">
          <div className="bg-[#111827] rounded-2xl p-8 md:p-12 max-w-4xl border border-[#1e293b]">
            <Quote className="w-12 h-12 text-[#10b981] mb-6" />
            
            <p className="text-2xl md:text-3xl text-white font-light leading-relaxed mb-8">
              &ldquo;{testimonials[activeIndex].quote}&rdquo;
            </p>

            <div className="flex items-center gap-4">
              <img
                src={testimonials[activeIndex].avatar}
                alt={testimonials[activeIndex].company}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#10b981]"
              />
              <div>
                <p className="text-white font-semibold text-lg">
                  {testimonials[activeIndex].company}
                </p>
                <p className="text-[#f97316] text-sm">
                  {testimonials[activeIndex].website}
                </p>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-[#f97316] w-8'
                    : 'bg-white/30 hover:bg-white/50 w-3'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;