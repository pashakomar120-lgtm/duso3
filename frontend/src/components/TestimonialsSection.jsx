import React, { useState, useEffect } from 'react';
import { testimonials } from '../data/mockData';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (direction) => {
    if (direction === 'prev') {
      setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    } else {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

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
                  {testimonials[activeIndex].name}
                </p>
                <p className="text-gray-400 text-sm">
                  {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                </p>
                <p className="text-[#f97316] text-sm">
                  {testimonials[activeIndex].website}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={() => goTo('prev')}
              className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center text-gray-400 hover:bg-[#f97316] hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Pagination Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? 'bg-[#f97316] w-8'
                      : 'bg-white/30 hover:bg-white/50 w-2'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo('next')}
              className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center text-gray-400 hover:bg-[#f97316] hover:text-white transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;