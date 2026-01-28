import React from 'react';
import { footerData } from '../data/mockData';
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const socialIcons = {
    Facebook: Facebook,
    Instagram: Instagram,
    LinkedIn: Linkedin
  };

  return (
    <footer className="bg-[#0a0a0b] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="text-2xl font-bold text-white tracking-tight">
            <span className="text-[#3b82f6]">duso</span>_ecom
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © 2025 duso_ecom. Всі права захищені
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {footerData.socials.map((social) => {
              const Icon = socialIcons[social.name];
              return (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3b82f6] transition-all duration-300"
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href={`mailto:${footerData.email}`}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">{footerData.email}</span>
            </a>
            <a
              href={`tel:${footerData.phone}`}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">{footerData.phone}</span>
            </a>
          </div>
        </div>

        {/* Cookie Notice */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-xs">
            Ми використовуємо cookies для персоналізації контенту.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;