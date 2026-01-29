import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { navItems } from '../data/mockData';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with glow */}
          <Link to="/" className="flex items-center gap-2 group" data-testid="logo">
            <div className="text-2xl font-bold text-white tracking-tight transition-all duration-300 group-hover:scale-105">
              <span className="text-orange-500 text-glow-orange">duso</span>_ecom
            </div>
            {/* Live indicator */}
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                data-testid={`nav-${item.href.replace('/', '') || 'home'}`}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium group ${
                  location.pathname === item.href
                    ? 'text-orange-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
                {/* Active indicator */}
                {location.pathname === item.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" />
                )}
                {/* Hover effect */}
                <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </nav>

          {/* CTA Button with glow */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              onClick={() => navigate('/contact')}
              data-testid="header-cta"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-300 px-6 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 rounded-xl btn-glow"
            >
              Получить предложение
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
              <div className="mt-4 pt-4 border-t border-white/10">
                <Button
                  onClick={() => navigate('/contact')}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 w-full py-6 rounded-xl shadow-lg shadow-orange-500/25"
                >
                  Получить предложение
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
