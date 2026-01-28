import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { navItems } from '../data/mockData';
import QuoteModal from './QuoteModal';
import CallModal from './CallModal';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0a0a0b]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <div className="text-2xl font-bold text-white tracking-tight">
                <span className="text-[#f97316]">duso</span>_ecom
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-1 text-sm font-medium"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </button>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                onClick={() => setQuoteModalOpen(true)}
                className="bg-[#f97316] text-white hover:bg-[#ea580c] transition-all duration-300 px-6"
              >
                Получить предложение
              </Button>
              <Button
                onClick={() => setCallModalOpen(true)}
                className="bg-transparent border border-[#10b981] text-[#10b981] hover:bg-[#10b981] hover:text-white transition-all duration-300 px-6"
              >
                Запланировать звонок
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-white/10 pt-4">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center justify-between text-sm font-medium text-left"
                  >
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </button>
                ))}
                <div className="flex flex-col gap-3 mt-4">
                  <Button
                    onClick={() => { setQuoteModalOpen(true); setMobileMenuOpen(false); }}
                    className="bg-[#f97316] text-white hover:bg-[#ea580c] w-full"
                  >
                    Получить предложение
                  </Button>
                  <Button
                    onClick={() => { setCallModalOpen(true); setMobileMenuOpen(false); }}
                    className="bg-transparent border border-[#10b981] text-[#10b981] hover:bg-[#10b981] hover:text-white w-full"
                  >
                    Запланировать звонок
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      <CallModal isOpen={callModalOpen} onClose={() => setCallModalOpen(false)} />
    </>
  );
};

export default Header;