import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Zap, Loader2, Brain, Star } from 'lucide-react';
import { Button } from './ui/button';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([
    "Сколько стоит магазин на Shopify?",
    "Какие гарантии вы даёте?",
    "Покажите ваши кейсы"
  ]);
  const [sessionId] = useState(() => `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: `Добро пожаловать! 👋 Я AI-консультант duso_ecom с 20-летним опытом в e-commerce.

Я помогу вам:
🛒 Выбрать оптимальное решение для вашего магазина
💰 Рассчитать бюджет и сроки
📈 Узнать про лучшие практики продаж
🎁 Получить эксклюзивные бонусы

Чем могу помочь?`
      }]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          message: text
        })
      });

      if (!response.ok) throw new Error('API Error');

      const data = await response.json();
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      
      if (data.suggestions?.length > 0) {
        setSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Произошла техническая ошибка. Пожалуйста, попробуйте ещё раз или свяжитесь с нами напрямую через Telegram: @duso_ecom 📱' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* AI Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-testid="ai-assistant-toggle"
        className={`fixed bottom-24 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 shadow-xl ${
          isOpen 
            ? 'bg-gray-800 text-white border border-white/10' 
            : 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white hover:scale-105'
        }`}
        style={{
          boxShadow: isOpen ? 'none' : '0 0 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(236, 72, 153, 0.3)'
        }}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <>
            <Brain className="w-5 h-5" />
            <span className="font-medium text-sm">AI Эксперт</span>
            <div className="flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs">20 лет</span>
            </div>
          </>
        )}
      </button>

      {/* AI Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-44 right-6 z-50 w-[380px] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          style={{
            background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.98) 0%, rgba(10, 10, 11, 0.98) 100%)',
            backdropFilter: 'blur(20px)',
            maxHeight: 'calc(100vh - 200px)'
          }}
          data-testid="ai-assistant-window"
        >
          {/* Header */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500" />
            <div className="relative p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    AI Консультант
                    <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs flex items-center gap-1">
                      <Zap className="w-3 h-3" /> GPT-4
                    </span>
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 text-xs">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      20 лет опыта
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      Онлайн
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[300px] overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-br-sm'
                      : 'bg-white/10 text-gray-100 rounded-bl-sm border border-white/5'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl rounded-bl-sm p-3 border border-white/5">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                    <span className="text-gray-400 text-sm">Думаю...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && !isLoading && (
            <div className="px-4 pb-3 border-t border-white/5 pt-3">
              <div className="flex flex-wrap gap-2">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(suggestion)}
                    className="text-xs px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 transition-colors border border-purple-500/20"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/20">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Напишите вопрос..."
                disabled={isLoading}
                data-testid="ai-input"
                className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder:text-gray-500 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all disabled:opacity-50"
                autoComplete="off"
                style={{ caretColor: '#a855f7' }}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                data-testid="ai-send"
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 rounded-xl px-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
