import React from 'react';
import { footerData, navItems, services } from '../data/mockData';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socialIcons = {
    Facebook: Facebook,
    Instagram: Instagram,
    LinkedIn: Linkedin
  };

  return (
    <footer className="relative z-10 border-t border-white/5">
      {/* Glass background */}
      <div className="absolute inset-0 glass-strong opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 group" data-testid="footer-logo">
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                <span className="text-orange-500 text-glow-orange">duso</span>_ecom
              </span>
              <Sparkles className="w-4 h-4 text-orange-500 group-hover:scale-125 transition-transform" />
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Создаём успешные e-commerce проекты с 2015 года. Ваш надёжный партнёр в мире онлайн-торговли.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {footerData.socials.map((social) => {
                const Icon = socialIcons[social.name];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`social-${social.name.toLowerCase()}`}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-500/50 border border-transparent transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
              Навигация
            </h4>
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-sm flex items-center gap-1 group"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              Популярные услуги
            </h4>
            <nav className="flex flex-col gap-3">
              {services.slice(0, 5).map((service) => (
                <Link 
                  key={service.id}
                  to={`/services#${service.id}`} 
                  className="text-gray-400 hover:text-emerald-500 transition-colors duration-300 text-sm flex items-center gap-1 group"
                >
                  <span>{service.title}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
              Контакты
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${footerData.email}`}
                data-testid="footer-email"
                className="flex items-center gap-3 text-gray-400 hover:text-emerald-500 transition-colors duration-300 text-sm group"
              >
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center group-hover:border-emerald-500/50 border border-transparent transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="break-all">{footerData.email}</span>
              </a>
              <a
                href={`tel:${footerData.phone}`}
                data-testid="footer-phone"
                className="flex items-center gap-3 text-gray-400 hover:text-emerald-500 transition-colors duration-300 text-sm group"
              >
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center group-hover:border-emerald-500/50 border border-transparent transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{footerData.phone}</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="pt-1.5">{footerData.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
              © 2025 <span className="text-orange-500">duso_ecom</span>. Все права защищены
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link to="/privacy" className="text-gray-500 hover:text-gray-300 text-xs sm:text-sm transition-colors">
                Политика конфиденциальности
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-gray-300 text-xs sm:text-sm transition-colors">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
