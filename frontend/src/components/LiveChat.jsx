import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Mail, User } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('welcome'); // welcome, form, success
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    telegram: '',
    message: ''
  });
  const [showBubble, setShowBubble] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Show bubble after 3 seconds
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Hide bubble when chat is open
    if (isOpen) {
      setShowBubble(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || (!formData.phone && !formData.email && !formData.telegram)) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните имя и хотя бы один способ связи",
        variant: "destructive"
      });
      return;
    }

    // Simulate sending
    setStep('success');
    toast({
      title: "Отправлено!",
      description: "Мы свяжемся с вами в ближайшее время",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Chat Bubble - Notification */}
      {showBubble && !isOpen && (
        <div 
          className="fixed bottom-24 right-6 z-40 glass rounded-xl p-4 max-w-xs border border-orange-500/30 shadow-xl fade-in-up cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <button 
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Нужна помощь?</p>
              <p className="text-gray-400 text-xs mt-1">Бесплатная консультация по вашему проекту!</p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-testid="live-chat-toggle"
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
          isOpen 
            ? 'bg-gray-800 rotate-0' 
            : 'bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/30 hover:scale-110'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 text-white" />
            {/* Pulse indicator */}
            <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-900 animate-pulse" />
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 z-50 w-[360px] glass-strong rounded-2xl border border-white/10 shadow-2xl overflow-hidden fade-in-up"
          data-testid="live-chat-window"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold">duso_ecom</h3>
                <div className="flex items-center gap-1.5 text-white/80 text-xs">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Онлайн • Отвечаем за 5 минут
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 max-h-[400px] overflow-y-auto">
            {step === 'welcome' && (
              <div className="space-y-4">
                {/* Welcome message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">👋</span>
                  </div>
                  <div className="glass rounded-2xl rounded-tl-sm p-3 max-w-[250px]">
                    <p className="text-white text-sm">Привет! Готовы помочь с вашим e-commerce проектом.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">💡</span>
                  </div>
                  <div className="glass rounded-2xl rounded-tl-sm p-3 max-w-[250px]">
                    <p className="text-white text-sm">Оставьте контакты, и мы перезвоним для бесплатной консультации!</p>
                  </div>
                </div>

                <Button
                  onClick={() => setStep('form')}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 py-6 rounded-xl"
                >
                  Оставить заявку
                </Button>

                <div className="text-center text-gray-500 text-xs">
                  или напишите напрямую:
                </div>

                <div className="flex justify-center gap-4">
                  <a href="https://t.me/duso_ecom" target="_blank" rel="noopener noreferrer" className="glass p-3 rounded-xl hover:border-emerald-500/50 border border-transparent transition-all">
                    <MessageCircle className="w-5 h-5 text-emerald-500" />
                  </a>
                  <a href="mailto:contact@duso-ecom.com" className="glass p-3 rounded-xl hover:border-orange-500/50 border border-transparent transition-all">
                    <Mail className="w-5 h-5 text-orange-500" />
                  </a>
                  <a href="tel:+74951234567" className="glass p-3 rounded-xl hover:border-emerald-500/50 border border-transparent transition-all">
                    <Phone className="w-5 h-5 text-emerald-500" />
                  </a>
                </div>
              </div>
            )}

            {step === 'form' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Ваше имя *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Как вас зовут?"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                      data-testid="chat-name-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Телефон</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                      data-testid="chat-phone-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                      data-testid="chat-email-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Telegram</label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      name="telegram"
                      value={formData.telegram}
                      onChange={handleChange}
                      placeholder="@username"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                      data-testid="chat-telegram-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Сообщение</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Расскажите о вашем проекте..."
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors resize-none"
                    data-testid="chat-message-input"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 py-6 rounded-xl"
                  data-testid="chat-submit"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Отправить
                </Button>

                <button
                  type="button"
                  onClick={() => setStep('welcome')}
                  className="w-full text-gray-500 text-sm hover:text-white transition-colors"
                >
                  ← Назад
                </button>
              </form>
            )}

            {step === 'success' && (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
                  <span className="text-3xl">🎉</span>
                </div>
                <h3 className="text-white font-bold text-lg">Спасибо!</h3>
                <p className="text-gray-400 text-sm">
                  Мы получили вашу заявку и свяжемся с вами в ближайшее время.
                </p>
                <Button
                  onClick={() => { setStep('welcome'); setFormData({ name: '', phone: '', email: '', telegram: '', message: '' }); }}
                  variant="outline"
                  className="border-white/10 text-white hover:bg-white/5"
                >
                  Отправить ещё
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChat;
