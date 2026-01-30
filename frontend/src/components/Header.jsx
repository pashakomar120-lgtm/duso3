import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Phone, MessageCircle, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { navItems, services } from '../data/mockData';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'glass-strong border-b border-white/5 shadow-2xl' 
          : 'bg-transparent'
      }`}
      data-testid="main-header"
    >
      {/* Top bar with contacts */}
      <div className={`border-b border-white/5 transition-all duration-300 ${scrolled ? 'py-1' : 'py-2'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs">
          <div className="hidden md:flex items-center gap-6">
            <a href="mailto:contact@duso-ecom.com" className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors">
              <Mail className="w-3 h-3" />
              contact@duso-ecom.com
            </a>
            <a href="tel:+74951234567" className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors">
              <Phone className="w-3 h-3" />
              +7 (495) 123-45-67
            </a>
            <a href="https://t.me/duso_ecom" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-emerald-500 transition-colors">
              <MessageCircle className="w-3 h-3" />
              @duso_ecom
            </a>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <span>🇷🇺 Россия</span>
            <span>🇺🇦 Украина</span>
            <span>🇰🇿 Казахстан</span>
            <span>🇧🇾 Беларусь</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo with glow */}
          <Link to="/" className="flex items-center gap-2 group" data-testid="logo">
            <div className="text-2xl font-bold text-white tracking-tight transition-all duration-300 group-hover:scale-105">
              <span className="text-orange-500 text-glow-orange">duso</span>_ecom
            </div>
            <div className="flex flex-col items-start">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[8px] text-gray-500 mt-0.5">ONLINE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div 
                key={item.label}
                className="relative"
                onMouseEnter={() => item.href === '/services' && setServicesOpen(true)}
                onMouseLeave={() => item.href === '/services' && setServicesOpen(false)}
              >
                <Link
                  to={item.href}
                  data-testid={`nav-${item.href.replace('/', '') || 'home'}`}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium group flex items-center gap-1 ${
                    location.pathname === item.href
                      ? 'text-orange-500'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {item.href === '/services' && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                  )}
                  {/* Active indicator */}
                  {location.pathname === item.href && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-orange-500 to-emerald-500 rounded-full" />
                  )}
                  {/* Hover effect */}
                  <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                {/* Services Dropdown */}
                {item.href === '/services' && servicesOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-[600px] glass-strong rounded-2xl border border-white/10 shadow-2xl p-4 grid grid-cols-2 gap-2 fade-in-up"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    {services.slice(0, 8).map((service) => {
                      const IconComponent = LucideIcons[service.icon] || LucideIcons.Box;
                      return (
                        <Link
                          key={service.id}
                          to={`/services#${service.id}`}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                            <IconComponent className="w-5 h-5 text-orange-500" />
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm group-hover:text-orange-500 transition-colors">
                              {service.title}
                            </div>
                            <div className="text-gray-500 text-xs line-clamp-1">
                              {service.subtitle}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                    <div className="col-span-2 pt-3 mt-2 border-t border-white/5">
                      <Link 
                        to="/services" 
                        className="flex items-center justify-center gap-2 text-orange-500 hover:text-white text-sm font-medium transition-colors"
                      >
                        Все услуги
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              onClick={() => navigate('/contact')}
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-white/5"
            >
              <Phone className="w-4 h-4 mr-2" />
              Позвонить
            </Button>
            <Button
              onClick={() => navigate('/contact')}
              data-testid="header-cta"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-300 px-6 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 rounded-xl btn-glow"
            >
              Бесплатная консультация
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 glass rounded-lg border border-white/10 hover:border-orange-500/50 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-white/10 pt-4 fade-in-up">
            <nav className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`p-3 rounded-xl transition-all duration-300 text-sm font-medium ${
                    location.pathname === item.href
                      ? 'bg-orange-500/10 text-orange-500 border border-orange-500/30'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-4 text-sm">
                  <a href="tel:+74951234567" className="flex items-center gap-2 text-gray-400">
                    <Phone className="w-4 h-4" />
                    Позвонить
                  </a>
                  <a href="https://t.me/duso_ecom" className="flex items-center gap-2 text-gray-400">
                    <MessageCircle className="w-4 h-4" />
                    Telegram
                  </a>
                </div>
                <Button
                  onClick={() => navigate('/contact')}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 w-full py-6 rounded-xl shadow-lg shadow-orange-500/25"
                >
                  Бесплатная консультация
                  <ArrowRight className="w-4 h-4 ml-2" />
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
