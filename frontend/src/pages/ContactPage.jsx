import React, { useState, useRef } from 'react';
import { footerData, services } from '../data/mockData';
import { Mail, Phone, MapPin, Send, Calendar, Clock, MessageCircle, Gift, Sparkles, Users, Globe, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('quote');
  const [freeButtonPos, setFreeButtonPos] = useState({ x: 0, y: 0 });
  const freeButtonRef = useRef(null);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    telegram: '',
    service: '',
    budget: '',
    message: ''
  });
  const [callForm, setCallForm] = useState({
    name: '',
    phone: '',
    telegram: '',
    date: '',
    time: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const serviceOptions = services.slice(0, 12).map(s => s.title);

  const budgets = [
    { label: 'До $3,000', value: 'under-3k' },
    { label: '$3,000 - $5,000', value: '3k-5k' },
    { label: '$5,000 - $10,000', value: '5k-10k' },
    { label: '$10,000 - $25,000', value: '10k-25k' },
    { label: '$25,000 - $50,000', value: '25k-50k' },
    { label: 'Более $50,000', value: 'over-50k' }
  ];

  // Free button escape logic
  const handleFreeButtonHover = (e) => {
    const button = freeButtonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    
    const dx = e.clientX - buttonCenterX;
    const dy = e.clientY - buttonCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 150) {
      const escapeX = -dx * 2 + (Math.random() - 0.5) * 100;
      const escapeY = -dy * 2 + (Math.random() - 0.5) * 100;
      
      const maxX = 200;
      const maxY = 100;
      const newX = Math.max(-maxX, Math.min(maxX, freeButtonPos.x + escapeX));
      const newY = Math.max(-maxY, Math.min(maxY, freeButtonPos.y + escapeY));
      
      setFreeButtonPos({ x: newX, y: newY });
    }
  };

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    if (!quoteForm.name || !quoteForm.email || !quoteForm.phone || !quoteForm.service || !quoteForm.budget || !quoteForm.message) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }
    setSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...quoteForm,
          source: 'contact_form'
        })
      });
      
      if (response.ok) {
        toast({
          title: "Заявка отправлена!",
          description: "Мы свяжемся с вами в ближайшее время.",
        });
        setQuoteForm({ name: '', email: '', company: '', phone: '', telegram: '', service: '', budget: '', message: '' });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте позже.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCallSubmit = async (e) => {
    e.preventDefault();
    if (!callForm.name || !callForm.phone || !callForm.date || !callForm.time) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }
    setSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/api/calls`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(callForm)
      });
      
      if (response.ok) {
        toast({
          title: "Звонок запланирован!",
          description: `Мы позвоним вам ${callForm.date} в ${callForm.time}.`,
        });
        setCallForm({ name: '', phone: '', telegram: '', date: '', time: '' });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось запланировать звонок. Попробуйте позже.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Custom Select component
  const CustomSelect = ({ value, onChange, options, placeholder, testId }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          data-testid={testId}
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-left text-white text-sm focus:border-orange-500/50 focus:outline-none transition-colors flex items-center justify-between"
        >
          <span className={value ? 'text-white' : 'text-gray-500'}>
            {value || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-xl border border-white/10 shadow-xl z-50 max-h-60 overflow-y-auto">
            {options.map((option, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onChange(typeof option === 'string' ? option : option.value);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-white text-sm hover:bg-white/10 transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                {typeof option === 'string' ? option : option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-32 relative z-10">
      {/* Hero Section */}
      <section className="py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 border border-orange-500/20">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-orange-500 text-xs sm:text-sm font-medium">Бесплатная консультация</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-4 sm:mb-6">
              Давайте <span className="text-emerald-500 text-glow-emerald">поговорим</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-xl leading-relaxed">
              Расскажите о своём проекте — мы подберём лучшее решение для вашего бизнеса по всему СНГ.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="floating-card rounded-2xl p-8 sticky top-40">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  Контактная информация
                </h3>
                
                <div className="space-y-6">
                  <a
                    href={`mailto:${footerData.email}`}
                    className="flex items-start gap-4 group"
                    data-testid="contact-email"
                  >
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-colors">
                      <Mail className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-medium">{footerData.email}</p>
                    </div>
                  </a>

                  <a
                    href={`tel:${footerData.phone}`}
                    className="flex items-start gap-4 group"
                    data-testid="contact-phone"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 transition-colors">
                      <Phone className="w-5 h-5 text-emerald-500 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Телефон</p>
                      <p className="text-white font-medium">{footerData.phone}</p>
                    </div>
                  </a>

                  <a
                    href="https://t.me/duso_ecom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                    data-testid="contact-telegram"
                  >
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-colors">
                      <MessageCircle className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Telegram</p>
                      <p className="text-white font-medium">@duso_ecom</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Адрес</p>
                      <p className="text-white font-medium">{footerData.address}</p>
                    </div>
                  </div>
                </div>

                {/* Countries */}
                <div className="mt-8 pt-8 border-t border-white/5">
                  <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-orange-500" />
                    Работаем по СНГ
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['🇷🇺 Россия', '🇺🇦 Украина', '🇰🇿 Казахстан', '🇧🇾 Беларусь', '🇺🇿 Узбекистан', '🇦🇿 Азербайджан'].map((country) => (
                      <span key={country} className="text-xs px-3 py-1 glass rounded-full text-gray-400">
                        {country}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/5">
                  <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-500" />
                    Рабочие часы
                  </h4>
                  <div className="space-y-2 text-gray-400 text-sm">
                    <p>Пн-Пт: 9:00 - 19:00 (МСК)</p>
                    <p>Сб: 10:00 - 16:00</p>
                    <p className="text-emerald-500">Поддержка 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Forms */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => setActiveTab('quote')}
                  data-testid="tab-quote"
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === 'quote'
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                      : 'glass text-gray-400 hover:text-white'
                  }`}
                >
                  Получить предложение
                </button>
                <button
                  onClick={() => setActiveTab('call')}
                  data-testid="tab-call"
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === 'call'
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                      : 'glass text-gray-400 hover:text-white'
                  }`}
                >
                  Запланировать звонок
                </button>
              </div>

              {/* Quote Form */}
              {activeTab === 'quote' && (
                <form onSubmit={handleQuoteSubmit} className="floating-card rounded-2xl p-8">
                  <h3 className="text-2xl font-semibold text-white mb-6">Расскажите о проекте</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">Имя *</Label>
                      <Input
                        id="name"
                        value={quoteForm.name}
                        onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                        data-testid="quote-name"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-orange-500"
                        placeholder="Ваше имя"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                        data-testid="quote-email"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-orange-500"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-300">Телефон *</Label>
                      <Input
                        id="phone"
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm({...quoteForm, phone: e.target.value})}
                        data-testid="quote-phone"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-orange-500"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telegram" className="text-gray-300">Telegram</Label>
                      <Input
                        id="telegram"
                        value={quoteForm.telegram}
                        onChange={(e) => setQuoteForm({...quoteForm, telegram: e.target.value})}
                        data-testid="quote-telegram"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-orange-500"
                        placeholder="@username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Услуга *</Label>
                      <CustomSelect
                        value={quoteForm.service}
                        onChange={(val) => setQuoteForm({...quoteForm, service: val})}
                        options={serviceOptions}
                        placeholder="Выберите услугу"
                        testId="quote-service"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Бюджет *</Label>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <CustomSelect
                            value={budgets.find(b => b.value === quoteForm.budget)?.label || ''}
                            onChange={(val) => {
                              const budget = budgets.find(b => b.label === val);
                              setQuoteForm({...quoteForm, budget: budget?.value || val});
                            }}
                            options={budgets.map(b => b.label)}
                            placeholder="Выберите бюджет"
                            testId="quote-budget"
                          />
                        </div>
                        
                        {/* Escaping FREE button */}
                        <div 
                          className="relative"
                          onMouseMove={handleFreeButtonHover}
                        >
                          <button
                            ref={freeButtonRef}
                            type="button"
                            data-testid="free-button"
                            className="px-4 py-3 bg-emerald-500 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all duration-200 whitespace-nowrap"
                            style={{
                              transform: `translate(${freeButtonPos.x}px, ${freeButtonPos.y}px)`,
                              transition: 'transform 0.15s ease-out'
                            }}
                            onClick={() => {
                              toast({
                                title: "Хитрый! 😄",
                                description: "Бесплатно мы не работаем, но консультация — бесплатная!",
                              });
                            }}
                          >
                            🎁 БЕСПЛАТНО
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <Label htmlFor="message" className="text-gray-300">Опишите проект *</Label>
                    <Textarea
                      id="message"
                      value={quoteForm.message}
                      onChange={(e) => setQuoteForm({...quoteForm, message: e.target.value})}
                      data-testid="quote-message"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-orange-500 min-h-[150px]"
                      placeholder="Расскажите подробнее о вашем проекте, целях и ожиданиях..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    data-testid="quote-submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 py-6 text-lg font-medium disabled:opacity-50 rounded-xl shadow-lg shadow-orange-500/25"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Отправка...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Отправить заявку
                      </span>
                    )}
                  </Button>

                  {/* Bonus notice */}
                  <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <div className="flex items-start gap-3">
                      <Gift className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-emerald-500 font-medium text-sm">Бонус при заявке сегодня!</p>
                        <p className="text-gray-400 text-xs mt-1">Бесплатный аудит вашего текущего сайта стоимостью $500</p>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* Call Form */}
              {activeTab === 'call' && (
                <form onSubmit={handleCallSubmit} className="floating-card rounded-2xl p-8">
                  <h3 className="text-2xl font-semibold text-white mb-6">Запланировать звонок</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="call-name" className="text-gray-300">Имя *</Label>
                      <Input
                        id="call-name"
                        value={callForm.name}
                        onChange={(e) => setCallForm({...callForm, name: e.target.value})}
                        data-testid="call-name"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-emerald-500"
                        placeholder="Ваше имя"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="call-phone" className="text-gray-300">Телефон *</Label>
                      <Input
                        id="call-phone"
                        value={callForm.phone}
                        onChange={(e) => setCallForm({...callForm, phone: e.target.value})}
                        data-testid="call-phone"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-emerald-500"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="call-telegram" className="text-gray-300">Telegram (опционально)</Label>
                      <Input
                        id="call-telegram"
                        value={callForm.telegram}
                        onChange={(e) => setCallForm({...callForm, telegram: e.target.value})}
                        data-testid="call-telegram"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-emerald-500"
                        placeholder="@username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="call-date" className="text-gray-300 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Дата *
                      </Label>
                      <Input
                        id="call-date"
                        type="date"
                        value={callForm.date}
                        onChange={(e) => setCallForm({...callForm, date: e.target.value})}
                        data-testid="call-date"
                        min={new Date().toISOString().split('T')[0]}
                        className="bg-white/5 border-white/10 text-white focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-gray-300 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Время *
                      </Label>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setCallForm({...callForm, time})}
                            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                              callForm.time === time
                                ? 'bg-emerald-500 text-white'
                                : 'glass text-gray-400 hover:text-white hover:border-emerald-500/50 border border-transparent'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    data-testid="call-submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 py-6 text-lg font-medium disabled:opacity-50 rounded-xl shadow-lg shadow-emerald-500/25"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Планируем...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Phone className="w-5 h-5" />
                        Запланировать
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
