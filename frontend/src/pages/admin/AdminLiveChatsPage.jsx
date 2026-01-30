import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, Users, Phone, MessageSquare, Brain, 
  Menu, X, Eye, CheckCircle, MessageCircle
} from 'lucide-react';
import { Button } from '../../components/ui/button';

const AdminLiveChatsPage = () => {
  const location = useLocation();
  const { admin, token } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chats, setChats] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Дашборд', path: '/admin/dashboard' },
    { icon: Users, label: 'Заявки', path: '/admin/leads' },
    { icon: Phone, label: 'Дзвінки', path: '/admin/calls' },
    { icon: MessageSquare, label: 'Live Chat', path: '/admin/livechats' },
    { icon: Brain, label: 'AI Переписки', path: '/admin/ai-conversations' },
  ];

  const statusColors = {
    new: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    responded: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    closed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  };

  const statusLabels = {
    new: 'Нове',
    responded: 'Відповіли',
    closed: 'Закрито'
  };

  const fetchChats = async () => {
    try {
      let url = `${API_URL}/api/admin/livechats?limit=100`;
      if (statusFilter) url += `&status=${statusFilter}`;
      
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setChats(data.chats);
        setTotal(data.total);
      }
    } catch (error) {
      console.error('Failed to fetch chats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [token, statusFilter]);

  const updateChatStatus = async (chatId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/livechats/${chatId}/status?status=${newStatus}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        fetchChats();
        if (selectedChat?.id === chatId) {
          setSelectedChat({ ...selectedChat, status: newStatus });
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
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
            <h1 className="text-2xl font-bold text-white">Live Chat повідомлення</h1>
            <p className="text-gray-400">Всього: {total} повідомлень</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
          >
            <option value="">Всі статуси</option>
            <option value="new">Нові</option>
            <option value="responded">Відповіли</option>
            <option value="closed">Закриті</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : chats.length === 0 ? (
          <div className="glass-strong rounded-xl p-12 text-center border border-white/10">
            <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Поки немає повідомлень з Live Chat</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {chats.map((chat) => (
              <div key={chat.id} className="glass-strong rounded-xl p-6 border border-white/10">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-pink-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{chat.name}</h3>
                      <p className="text-gray-400 text-sm">{chat.phone}</p>
                      {chat.email && <p className="text-gray-500 text-sm">{chat.email}</p>}
                      {chat.telegram && <p className="text-gray-500 text-sm">Telegram: {chat.telegram}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${statusColors[chat.status]}`}>
                      {statusLabels[chat.status]}
                    </span>
                    <button
                      onClick={() => setSelectedChat(chat)}
                      className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-purple-500/20 hover:text-purple-400 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-white/5 rounded-xl">
                  <p className="text-gray-300 text-sm line-clamp-2">{chat.message}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-gray-500 text-sm">
                    {new Date(chat.created_at).toLocaleString('uk-UA')}
                  </span>
                  {chat.status !== 'closed' && (
                    <div className="flex gap-2">
                      {chat.status === 'new' && (
                        <Button
                          onClick={() => updateChatStatus(chat.id, 'responded')}
                          size="sm"
                          className="bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30"
                        >
                          Відповіли
                        </Button>
                      )}
                      <Button
                        onClick={() => updateChatStatus(chat.id, 'closed')}
                        size="sm"
                        className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Закрити
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Chat Detail Modal */}
      {selectedChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedChat(null)}>
          <div className="glass-strong rounded-2xl p-6 max-w-lg w-full border border-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedChat.name}</h3>
                <p className="text-gray-400">{selectedChat.phone}</p>
              </div>
              <button onClick={() => setSelectedChat(null)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {selectedChat.email && (
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="text-white">{selectedChat.email}</p>
                </div>
              )}
              {selectedChat.telegram && (
                <div>
                  <p className="text-gray-500 text-sm">Telegram</p>
                  <p className="text-white">{selectedChat.telegram}</p>
                </div>
              )}
              <div>
                <p className="text-gray-500 text-sm mb-2">Повідомлення</p>
                <p className="text-white bg-white/5 rounded-xl p-4">{selectedChat.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLiveChatsPage;
