import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, Users, Phone, MessageSquare, Brain, 
  LogOut, Menu, X, TrendingUp, DollarSign, Clock, 
  CheckCircle, AlertCircle, BarChart3, PieChart,
  ArrowUpRight, ArrowDownRight, RefreshCw
} from 'lucide-react';
import { Button } from '../../components/ui/button';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, logout, token } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Дашборд', path: '/admin/dashboard' },
    { icon: Users, label: 'Заявки', path: '/admin/leads' },
    { icon: Phone, label: 'Звонки', path: '/admin/calls' },
    { icon: MessageSquare, label: 'Live Chat', path: '/admin/livechats' },
    { icon: Brain, label: 'AI Переписки', path: '/admin/ai-conversations' },
  ];

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [token]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const StatCard = ({ icon: Icon, label, value, trend, trendUp, color }) => (
    <div className="glass-strong rounded-xl p-6 border border-white/10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
              {trendUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {trend}
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#111827] border-r border-white/10 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
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

          {/* Menu */}
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

          {/* User Info */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold">{admin?.username?.[0]?.toUpperCase()}</span>
              </div>
              <div>
                <p className="text-white font-medium">{admin?.username}</p>
                <p className="text-gray-500 text-xs">Администратор</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-white/10 text-gray-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-[#111827] border border-white/10 text-white"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Дашборд</h1>
            <p className="text-gray-400">Обзор всех показателей</p>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-white/5 border border-white/10 text-white hover:bg-white/10"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Обновить
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={Users}
                label="Всего заявок"
                value={stats?.total_leads || 0}
                color="bg-gradient-to-br from-purple-500 to-purple-600"
              />
              <StatCard
                icon={AlertCircle}
                label="Новые заявки"
                value={stats?.new_leads || 0}
                color="bg-gradient-to-br from-orange-500 to-orange-600"
              />
              <StatCard
                icon={Clock}
                label="В работе"
                value={stats?.in_progress_leads || 0}
                color="bg-gradient-to-br from-blue-500 to-blue-600"
              />
              <StatCard
                icon={CheckCircle}
                label="Закрыто"
                value={stats?.closed_leads || 0}
                color="bg-gradient-to-br from-emerald-500 to-emerald-600"
              />
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard
                icon={Phone}
                label="Запланированные звонки"
                value={stats?.total_calls || 0}
                color="bg-gradient-to-br from-cyan-500 to-cyan-600"
              />
              <StatCard
                icon={MessageSquare}
                label="Live Chat сообщения"
                value={stats?.total_chats || 0}
                color="bg-gradient-to-br from-pink-500 to-pink-600"
              />
              <StatCard
                icon={Brain}
                label="AI Переписки"
                value={stats?.total_ai_conversations || 0}
                color="bg-gradient-to-br from-violet-500 to-violet-600"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Leads by Service */}
              <div className="glass-strong rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-400" />
                  Заявки по услугам
                </h3>
                {stats?.leads_by_service && Object.keys(stats.leads_by_service).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(stats.leads_by_service).map(([service, count]) => (
                      <div key={service} className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm truncate max-w-[200px]">{service}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-orange-500 rounded-full"
                              style={{ width: `${Math.min((count / stats.total_leads) * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-white font-medium w-8 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Пока нет данных</p>
                )}
              </div>

              {/* Leads by Budget */}
              <div className="glass-strong rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  Заявки по бюджету
                </h3>
                {stats?.leads_by_budget && Object.keys(stats.leads_by_budget).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(stats.leads_by_budget).map(([budget, count]) => (
                      <div key={budget} className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">{budget}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                              style={{ width: `${Math.min((count / stats.total_leads) * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-white font-medium w-8 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Пока нет данных</p>
                )}
              </div>
            </div>

            {/* Daily Leads Chart */}
            {stats?.leads_by_day && stats.leads_by_day.length > 0 && (
              <div className="glass-strong rounded-xl p-6 border border-white/10 mt-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-orange-400" />
                  Заявки за последние 30 дней
                </h3>
                <div className="flex items-end gap-1 h-40">
                  {stats.leads_by_day.map((day, index) => {
                    const maxCount = Math.max(...stats.leads_by_day.map(d => d.count));
                    const height = maxCount > 0 ? (day.count / maxCount) * 100 : 0;
                    return (
                      <div
                        key={day.date}
                        className="flex-1 bg-gradient-to-t from-purple-500 to-orange-500 rounded-t opacity-80 hover:opacity-100 transition-opacity cursor-pointer group relative"
                        style={{ height: `${Math.max(height, 5)}%` }}
                        title={`${day.date}: ${day.count} заявок`}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {day.count}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <Link
                to="/admin/leads"
                className="glass-strong rounded-xl p-4 border border-white/10 hover:border-purple-500/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span className="text-white group-hover:text-purple-400 transition-colors">Просмотреть заявки</span>
                </div>
              </Link>
              <Link
                to="/admin/calls"
                className="glass-strong rounded-xl p-4 border border-white/10 hover:border-cyan-500/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-cyan-400" />
                  <span className="text-white group-hover:text-cyan-400 transition-colors">Запланированные звонки</span>
                </div>
              </Link>
              <Link
                to="/admin/livechats"
                className="glass-strong rounded-xl p-4 border border-white/10 hover:border-pink-500/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-pink-400" />
                  <span className="text-white group-hover:text-pink-400 transition-colors">Live Chat</span>
                </div>
              </Link>
              <Link
                to="/admin/ai-conversations"
                className="glass-strong rounded-xl p-4 border border-white/10 hover:border-violet-500/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-violet-400" />
                  <span className="text-white group-hover:text-violet-400 transition-colors">AI Переписки</span>
                </div>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
