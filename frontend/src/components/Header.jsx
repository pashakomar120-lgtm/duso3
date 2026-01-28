import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { navItems } from '../data/mockData';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
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
              <span className="text-[#3b82f6]">duso</span>_ecom
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-1 text-sm font-medium"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              className="border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white transition-all duration-300 px-6"
            >
              Отримати пропозицію
            </Button>
            <Button
              className="bg-transparent border border-white/30 text-white hover:bg-white/10 transition-all duration-300 px-6"
            >
              Запланувати дзвінок
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
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center justify-between text-sm font-medium"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <Button
                  variant="outline"
                  className="border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white w-full"
                >
                  Отримати пропозицію
                </Button>
                <Button
                  className="bg-transparent border border-white/30 text-white hover:bg-white/10 w-full"
                >
                  Запланувати дзвінок
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;