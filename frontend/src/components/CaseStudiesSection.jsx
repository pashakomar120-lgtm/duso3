import React, { useRef, useState } from 'react';
import { caseStudies } from '../data/portfolioData';
import { ChevronLeft, ChevronRight, ExternalLink, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CaseStudiesSection = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const navigate = useNavigate();

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section id="portfolio" className="py-24 relative z-10">
      {/* Background effect */}
      <div className="absolute inset-0 glass opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-orange-500 text-sm font-medium tracking-wider uppercase mb-2 block">
              Портфолио
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              <span className="text-emerald-500 text-glow-emerald">Истории успеха,</span> достойные внимания
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              data-testid="case-studies-prev"
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? 'glass border border-orange-500/30 text-white hover:border-orange-500 hover:bg-orange-500/10'
                  : 'glass text-gray-600 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              data-testid="case-studies-next"
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30'
                  : 'glass text-gray-600 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              data-testid={`case-study-${study.id}`}
              className="flex-shrink-0 w-80 group cursor-pointer"
              onClick={() => navigate('/portfolio')}
            >
              <div className="relative rounded-2xl overflow-hidden floating-card hover:border-orange-500/50 transition-all duration-500">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.website}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="glass px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
                      {study.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-bold text-lg group-hover:text-orange-500 transition-colors">
                      {study.title}
                    </h3>
                    <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-emerald-500 transition-colors" />
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{study.description}</p>
                  
                  {/* Results */}
                  {study.results && (
                    <div className="flex flex-wrap gap-2">
                      {study.results.slice(0, 2).map((result, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        >
                          <TrendingUp className="w-3 h-3 inline mr-1" />
                          {result}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/portfolio')}
            data-testid="view-all-portfolio"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-white font-medium transition-colors duration-300 group"
          >
            <span className="neon-underline">Смотреть все проекты</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
