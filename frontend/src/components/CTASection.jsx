import React, { useState } from 'react';
import { Button } from './ui/button';
import QuoteModal from './QuoteModal';

const CTASection = () => {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <>
      <section id="contact" className="bg-[#0a0a0b] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a2f] to-[#0f172a]" />
            
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#10b981]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f97316]/10 rounded-full blur-2xl" />

            {/* Content */}
            <div className="relative z-10 py-16 px-8 md:px-16 text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Не довольствуйтесь <span className="text-[#f97316]">second-best</span>
              </h2>
              <h3 className="text-2xl md:text-3xl text-gray-300 mb-8">
                Когда <span className="text-[#10b981] font-semibold">duso_ecom</span> рядом.
              </h3>

              <Button
                onClick={() => setQuoteModalOpen(true)}
                className="bg-[#f97316] text-white hover:bg-[#ea580c] px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105"
              >
                Обсудим ваши ожидания
              </Button>
            </div>
          </div>
        </div>
      </section>

      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
    </>
  );
};

export default CTASection;