import React, { useState } from 'react';
import { Phone, Calendar, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const CallModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Call scheduled:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', date: '', time: '' });
      onClose();
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#111827] border-[#1e293b] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-[#10b981]">Запланировать</span> звонок
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-[#10b981] rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Звонок запланирован!</h3>
            <p className="text-gray-400">Мы позвоним вам в указанное время.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Имя *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-[#1e293b] border-[#374151] text-white placeholder:text-gray-500 focus:border-[#10b981]"
                placeholder="Ваше имя"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-300">Телефон *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="bg-[#1e293b] border-[#374151] text-white placeholder:text-gray-500 focus:border-[#10b981]"
                placeholder="+7 (___) ___-__-__"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-gray-300 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Дата *
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="bg-[#1e293b] border-[#374151] text-white placeholder:text-gray-500 focus:border-[#10b981]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Время *
              </Label>
              <Select onValueChange={(value) => setFormData({ ...formData, time: value })} required>
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

            <Button
              type="submit"
              className="w-full bg-[#10b981] text-white hover:bg-[#059669] py-6 text-lg font-medium"
            >
              Запланировать
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CallModal;