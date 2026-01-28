import React, { useState } from 'react';
import { footerData } from '../data/mockData';
import { Mail, Phone, MapPin, Send, Calendar, Clock, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('quote');
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });
  const [callForm, setCallForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const services = [
    'Разработка магазина',
    'Миграция на Shopify',
    'Цифровой маркетинг',
    'Техподдержка',
    'Комплексное решение'
  ];

  const budgets = [
    'До $5,000',
    '$5,000 - $15,000',
    '$15,000 - $50,000',
    '$50,000 - $100,000',
    'Более $100,000'
  ];

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время.",
      });
      setQuoteForm({ name: '', email: '', company: '', phone: '', service: '', budget: '', message: '' });
    }, 1500);
  };

  const handleCallSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Звонок запланирован!",
        description: `Мы позвоним вам ${callForm.date} в ${callForm.time}.`,
      });
      setCallForm({ name: '', phone: '', date: '', time: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] pt-24">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-[#f97316] text-sm font-medium uppercase tracking-wider">Контакты</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
              Давайте <span className="text-[#10b981]">поговорим</span>
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed">
              Готовы обсудить ваш проект? Заполните форму или свяжитесь с нами напрямую.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-[#111827] rounded-2xl p-8 border border-[#1e293b] sticky top-32">
                <h3 className="text-xl font-semibold text-white mb-6">Контактная информация</h3>
                
                <div className="space-y-6">
                  <a
                    href={`mailto:${footerData.email}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#f97316]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#f97316] transition-colors">
                      <Mail className="w-5 h-5 text-[#f97316] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-medium">{footerData.email}</p>
                    </div>
                  </a>

                  <a
                    href={`tel:${footerData.phone}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#10b981] transition-colors">
                      <Phone className="w-5 h-5 text-[#10b981] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Телефон</p>
                      <p className="text-white font-medium">{footerData.phone}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#f97316]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#f97316]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Адрес</p>
                      <p className="text-white font-medium">{footerData.address}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-[#1e293b]">
                  <h4 className="text-white font-medium mb-4">Рабочие часы</h4>
                  <div className="space-y-2 text-gray-400 text-sm">
                    <p>Пн-Пт: 9:00 - 19:00</p>
                    <p>Сб: 10:00 - 16:00</p>
                    <p>Вс: Выходной</p>
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
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === 'quote'
                      ? 'bg-[#f97316] text-white'
                      : 'bg-[#1e293b] text-gray-400 hover:bg-[#2d3a4f] hover:text-white'
                  }`}
                >
                  Получить предложение
                </button>
                <button
                  onClick={() => setActiveTab('call')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === 'call'
                      ? 'bg-[#10b981] text-white'
                      : 'bg-[#1e293b] text-gray-400 hover:bg-[#2d3a4f] hover:text-white'
                  }`}
                >
                  Запланировать звонок
                </button>
              </div>

              {/* Quote Form */}
              {activeTab === 'quote' && (
                <form onSubmit={handleQuoteSubmit} className="bg-[#111827] rounded-2xl p-8 border border-[#1e293b]">
                  <h3 className="text-2xl font-semibold text-white mb-6">Расскажите о проекте</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">Имя *</Label>
                      <Input
                        id="name"
                        value={quoteForm.name}
                        onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                        required
                        className="bg-[#1e293b] border-[#374151] text-white placeholder:text-gray-500 focus:border-[#f97316]"
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
                        required
                        className="bg-[#1e293b] border-[#374151] text-white placeholder:text-gray-500 focus:border-[#f97316]"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-gray-300">Компания</Label>
                      <Input
                        id="company"
                        value={quoteForm.company}
                        onChange={(e) => setQuoteForm({...quoteForm, company: e.target.value})}
                        className="bg-[#1e293b] border-[#374151] text-white placeholder:text-gray-500 focus:border-[#f97316]"
                        placeholder="Название компании"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-300">Телефон</Label>
                      <Input
                        id="phone"
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm({...quoteForm, phone: e.target.value})}
                        className="bg-[#1e293b] border-[#374151] text-white placeholder:text-gray-500 focus:border-[#f97316]"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Услуга *</Label>
                      <Select onValueChange={(value) => setQuoteForm({...quoteForm, service: value})} required>
                        <SelectTrigger className="bg-[#1e293b] border-[#374151] text-white focus:border-[#f97316]">
                          <SelectValue placeholder="Выберите услугу" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1e293b] border-[#374151]">
                          {services.map((service) => (
                            <SelectItem key={service} value={service} className="text-white hover:bg-[#374151]">
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Бюджет</Label>
                      <Select onValueChange={(value) => setQuoteForm({...quoteForm, budget: value})}>
                        <SelectTrigger className="bg-[#1e293b] border-[#374151] text-white focus:border-[#f97316]">
                          <SelectValue placeholder="Выберите бюджет" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1e293b] border-[#374151]">
                          {budgets.map((budget) => (
                            <SelectItem key={budget} value={budget} className="text-white hover:bg-[#374151]">
                              {budget}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <Label htmlFor="message" className="text-gray-300">Опишите проект *</Label>
                    <Textarea
                      id="message"
                      value={quoteForm.message}
                      onChange={(e) => setQuoteForm({...quoteForm, message: e.target.value})}
                      required
                      className="bg-[#1e293b] border-[#374151] text-white placeholder:text-gray-500 focus:border-[#f97316] min-h-[150px]"
                      placeholder="Расскажите подробнее о вашем проекте, целях и ожиданиях..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#f97316] text-white hover:bg-[#ea580c] py-6 text-lg font-medium disabled:opacity-50"
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
                </form>
              )}

              {/* Call Form */}
              {activeTab === 'call' && (
                <form onSubmit={handleCallSubmit} className="bg-[#111827] rounded-2xl p-8 border border-[#1e293b]">
                  <h3 className="text-2xl font-semibold text-white mb-6">Запланировать звонок</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="call-name" className="text-gray-300">Имя *</Label>
                      <Input
                        id="call-name"
                        value={callForm.name}
                        onChange={(e) => setCallForm({...callForm, name: e.target.value})}
                        required
                        className="bg-[#1e293b] border-[#374151] text-white placeholder:text-gray-500 focus:border-[#10b981]"
                        placeholder="Ваше имя"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="call-phone" className="text-gray-300">Телефон *</Label>
                      <Input
                        id="call-phone"
                        value={callForm.phone}
                        onChange={(e) => setCallForm({...callForm, phone: e.target.value})}
                        required
                        className="bg-[#1e293b] border-[#374151] text-white placeholder:text-gray-500 focus:border-[#10b981]"
                        placeholder="+7 (___) ___-__-__"
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
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="bg-[#1e293b] border-[#374151] text-white focus:border-[#10b981]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Время *
                      </Label>
                      <Select onValueChange={(value) => setCallForm({...callForm, time: value})} required>
                        <SelectTrigger className="bg-[#1e293b] border-[#374151] text-white focus:border-[#10b981]">
                          <SelectValue placeholder="Выберите время" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1e293b] border-[#374151]">
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time} className="text-white hover:bg-[#374151]">
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#10b981] text-white hover:bg-[#059669] py-6 text-lg font-medium disabled:opacity-50"
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