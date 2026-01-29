import React, { useState, useEffect } from 'react';
import { testimonials } from '../data/mockData';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
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
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-orange-500 text-sm font-medium tracking-wider uppercase mb-4 block">
            Отзывы
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Что говорят <span className="text-emerald-500 text-glow-emerald">наши клиенты</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="relative">
          <div className="floating-card rounded-3xl p-8 md:p-12 max-w-4xl mx-auto" data-testid="testimonial-card">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/10 rounded-full blur-3xl" />
            
            <div className="relative">
              {/* Quote icon with glow */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-500/10 mb-6">
                <Quote className="w-8 h-8 text-emerald-500" />
              </div>
              
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                ))}
              </div>
              
              <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-8">
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={testimonials[activeIndex].avatar}
                    alt={testimonials[activeIndex].company}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  {/* Online indicator */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-gray-900" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                  </p>
                  <p className="text-orange-500 text-sm font-medium">
                    {testimonials[activeIndex].website}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => goTo('prev')}
              data-testid="testimonial-prev"
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-500/50 border border-transparent transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Pagination Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  data-testid={`testimonial-dot-${index}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? 'bg-gradient-to-r from-orange-500 to-emerald-500 w-8 shadow-lg shadow-orange-500/30'
                      : 'bg-white/20 hover:bg-white/40 w-2'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo('next')}
              data-testid="testimonial-next"
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-500/50 border border-transparent transition-all duration-300 hover:scale-110"
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
