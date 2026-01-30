import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, Users, Phone, MessageSquare, Brain, 
  Menu, X, Eye, CheckCircle, Clock, XCircle, Calendar
} from 'lucide-react';
import { Button } from '../../components/ui/button';

const AdminCallsPage = () => {
  const location = useLocation();
  const { admin, token } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [calls, setCalls] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Дашборд', path: '/admin/dashboard' },
    { icon: Users, label: 'Заявки', path: '/admin/leads' },
    { icon: Phone, label: 'Дзвінки', path: '/admin/calls' },
    { icon: MessageSquare, label: 'Live Chat', path: '/admin/livechats' },
    { icon: Brain, label: 'AI Переписки', path: '/admin/ai-conversations' },
  ];

  const statusColors = {
    scheduled: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  const statusLabels = {
    scheduled: 'Заплановано',
    completed: 'Виконано',
    cancelled: 'Скасовано'
  };

  const fetchCalls = async () => {
    try {
      let url = `${API_URL}/api/admin/calls?limit=100`;
      if (statusFilter) url += `&status=${statusFilter}`;
      
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setCalls(data.calls);
        setTotal(data.total);
      }
    } catch (error) {
      console.error('Failed to fetch calls:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, [token, statusFilter]);

  const updateCallStatus = async (callId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/calls/${callId}/status?status=${newStatus}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        fetchCalls();
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
            <h1 className="text-2xl font-bold text-white">Заплановані дзвінки</h1>
            <p className="text-gray-400">Всього: {total} дзвінків</p>
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
            <option value="scheduled">Заплановані</option>
            <option value="completed">Виконані</option>
            <option value="cancelled">Скасовані</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : calls.length === 0 ? (
          <div className="glass-strong rounded-xl p-12 text-center border border-white/10">
            <Phone className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Поки немає запланованих дзвінків</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {calls.map((call) => (
              <div key={call.id} className="glass-strong rounded-xl p-6 border border-white/10">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{call.name}</h3>
                      <p className="text-gray-400 text-sm">{call.phone}</p>
                      {call.telegram && <p className="text-gray-500 text-sm">Telegram: {call.telegram}</p>}
                    </div>
                  </div>
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${statusColors[call.status]}`}>
                    {statusLabels[call.status]}
                  </span>
                </div>
                
                <div className="mt-4 flex items-center gap-6">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{call.date} о {call.time}</span>
                  </div>
                </div>

                {call.status === 'scheduled' && (
                  <div className="mt-4 flex gap-2">
                    <Button
                      onClick={() => updateCallStatus(call.id, 'completed')}
                      size="sm"
                      className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Виконано
                    </Button>
                    <Button
                      onClick={() => updateCallStatus(call.id, 'cancelled')}
                      size="sm"
                      className="bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Скасувати
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminCallsPage;
