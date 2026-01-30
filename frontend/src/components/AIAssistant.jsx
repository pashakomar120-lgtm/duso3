import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Zap, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from './ui/button';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([
    "Сколько стоит создание магазина?",
    "Какие услуги вы предлагаете?",
    "Покажите ваши кейсы"
  ]);
  const [sessionId] = useState(() => `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef(null);
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add welcome message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: 'Привет! 👋 Я AI-консультант duso_ecom — ведущего e-commerce агентства в СНГ.\n\nЯ могу помочь вам:\n• Подобрать услуги для вашего бизнеса\n• Оценить бюджет проекта\n• Рассказать о наших возможностях\n\nЧем могу помочь?'
      }]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

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
        content: 'Извините, произошла ошибка. Попробуйте позже или свяжитесь с нами напрямую! 📞' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* AI Button - positioned differently from LiveChat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-testid="ai-assistant-toggle"
        className={`fixed bottom-24 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300 shadow-xl ${
          isOpen 
            ? 'bg-gray-800 text-white' 
            : 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white hover:scale-105 animate-pulse-slow'
        }`}
        style={{
          animation: isOpen ? 'none' : 'glow 2s ease-in-out infinite alternate'
        }}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <>
            <Bot className="w-5 h-5" />
            <span className="font-medium text-sm">AI Помощник</span>
            <Sparkles className="w-4 h-4" />
          </>
        )}
      </button>

      {/* AI Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-44 right-6 z-50 w-[400px] h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 fade-in-up"
          style={{
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.98) 0%, rgba(31, 41, 55, 0.98) 100%)',
            backdropFilter: 'blur(20px)'
          }}
          data-testid="ai-assistant-window"
        >
          {/* Header with gradient */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 opacity-90" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
            <div className="relative p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold flex items-center gap-2">
                    AI Консультант
                    <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">GPT-4</span>
                  </h3>
                  <div className="flex items-center gap-1.5 text-white/80 text-xs">
                    <Zap className="w-3 h-3" />
                    Мгновенные ответы • 24/7
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[320px] overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-br-sm'
                      : 'bg-white/10 text-white rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl rounded-bl-sm p-3">
                  <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && !isLoading && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(suggestion)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors border border-white/10"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Задайте вопрос..."
                disabled={isLoading}
                data-testid="ai-input"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder:text-gray-500 focus:border-purple-500/50 focus:outline-none transition-colors disabled:opacity-50"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                data-testid="ai-send"
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 rounded-xl px-4 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      )}

      <style>{`
        @keyframes glow {
          from {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(236, 72, 153, 0.2);
          }
          to {
            box-shadow: 0 0 30px rgba(168, 85, 247, 0.6), 0 0 60px rgba(236, 72, 153, 0.4);
          }
        }
        .animate-pulse-slow {
          animation: glow 2s ease-in-out infinite alternate;
        }
      `}</style>
    </>
  );
};

export default AIAssistant;
