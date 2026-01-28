import React from 'react';
import { footerData, navItems } from '../data/mockData';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socialIcons = {
    Facebook: Facebook,
    Instagram: Instagram,
    LinkedIn: Linkedin
  };

  return (
    <footer className="bg-[#0a0a0b] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="text-2xl font-bold text-white tracking-tight inline-block mb-4">
              <span className="text-[#f97316]">duso</span>_ecom
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Создаём успешные e-commerce проекты с 2015 года. Ваш надёжный партнёр в мире онлайн-торговли.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {footerData.socials.map((social) => {
                const Icon = socialIcons[social.name];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#f97316] transition-all duration-300"
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
            <h4 className="text-white font-semibold mb-4">Навигация</h4>
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-gray-400 hover:text-[#f97316] transition-colors duration-300 text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Услуги</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/services#development" className="text-gray-400 hover:text-[#f97316] transition-colors duration-300 text-sm">
                Разработка магазинов
              </Link>
              <Link to="/services#migration" className="text-gray-400 hover:text-[#f97316] transition-colors duration-300 text-sm">
                Миграция на Shopify
              </Link>
              <Link to="/services#marketing" className="text-gray-400 hover:text-[#f97316] transition-colors duration-300 text-sm">
                Цифровой маркетинг
              </Link>
              <Link to="/services#support" className="text-gray-400 hover:text-[#f97316] transition-colors duration-300 text-sm">
                Техподдержка 24/7
              </Link>
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Контакты</h4>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${footerData.email}`}
                className="flex items-center gap-3 text-gray-400 hover:text-[#10b981] transition-colors duration-300 text-sm"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>{footerData.email}</span>
              </a>
              <a
                href={`tel:${footerData.phone}`}
                className="flex items-center gap-3 text-gray-400 hover:text-[#10b981] transition-colors duration-300 text-sm"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{footerData.phone}</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{footerData.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 duso_ecom. Все права защищены
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                Политика конфиденциальности
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
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