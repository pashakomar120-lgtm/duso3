import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, Users, Phone, MessageSquare, Brain, 
  Menu, X, Eye, User, Bot, Clock
} from 'lucide-react';

const AdminAIConversationsPage = () => {
  const location = useLocation();
  const { admin, token } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Дашборд', path: '/admin/dashboard' },
    { icon: Users, label: 'Заявки', path: '/admin/leads' },
    { icon: Phone, label: 'Дзвінки', path: '/admin/calls' },
    { icon: MessageSquare, label: 'Live Chat', path: '/admin/livechats' },
    { icon: Brain, label: 'AI Переписки', path: '/admin/ai-conversations' },
  ];

  const fetchConversations = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/ai-conversations?limit=100`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setConversations(data.conversations);
        setTotal(data.total);
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [token]);

  const getPreview = (messages) => {
    if (!messages || messages.length === 0) return 'Порожня розмова';
    const firstUserMessage = messages.find(m => m.role === 'user');
    return firstUserMessage?.content?.substring(0, 100) + '...' || 'Порожня розмова';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#111827] border-r border-white/10 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <div>
                <span className="text-white font-bold">duso_ecom</span>
                <span className="block text-xs text-gray-500">Admin Panel</span>
              </div>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  location.pathname === item.path
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold">{admin?.username?.[0]?.toUpperCase()}</span>
              </div>
              <div>
                <p className="text-white font-medium">{admin?.username}</p>
                <p className="text-gray-500 text-xs">Адміністратор</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-[#111827] border border-white/10 text-white"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">AI Переписки</h1>
            <p className="text-gray-400">Всього: {total} сесій</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : conversations.length === 0 ? (
          <div className="glass-strong rounded-xl p-12 text-center border border-white/10">
            <Brain className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Поки немає AI переписок</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {conversations.map((conv) => (
              <div 
                key={conv.id} 
                className="glass-strong rounded-xl p-6 border border-white/10 cursor-pointer hover:border-purple-500/50 transition-colors"
                onClick={() => setSelectedConversation(conv)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Сесія: {conv.session_id.substring(0, 20)}...</h3>
                      <p className="text-gray-400 text-sm mt-1">{getPreview(conv.messages)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500 text-sm">
                      {conv.messages?.length || 0} повідомлень
                    </span>
                    <p className="text-gray-600 text-xs mt-1">
                      {new Date(conv.last_message_at).toLocaleString('uk-UA')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Conversation Detail Modal */}
      {selectedConversation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedConversation(null)}>
          <div className="glass-strong rounded-2xl max-w-2xl w-full max-h-[80vh] border border-white/10 flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">AI Переписка</h3>
                <p className="text-gray-400 text-sm">Сесія: {selectedConversation.session_id.substring(0, 30)}...</p>
              </div>
              <button onClick={() => setSelectedConversation(null)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {selectedConversation.messages?.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user' 
                        ? 'bg-purple-500/20' 
                        : 'bg-gradient-to-br from-purple-500 to-pink-500'
                    }`}>
                      {msg.role === 'user' ? (
                        <User className="w-4 h-4 text-purple-400" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-xl p-4 ${
                      msg.role === 'user'
                        ? 'bg-purple-500/20 border border-purple-500/30'
                        : 'bg-white/5 border border-white/10'
                    }`}>
                      <p className="text-white text-sm whitespace-pre-wrap">{msg.content}</p>
                      {msg.timestamp && (
                        <p className="text-gray-500 text-xs mt-2 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(msg.timestamp).toLocaleTimeString('uk-UA')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAIConversationsPage;
