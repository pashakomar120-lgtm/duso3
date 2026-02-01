import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, Users, Phone, MessageSquare, Brain, 
  LogOut, Menu, X, Search, Filter, Download, Eye,
  CheckCircle, Clock, AlertCircle, ChevronDown
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const AdminLeadsPage = () => {
  const location = useLocation();
  const { admin, logout, token } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);

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
    in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    closed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  };

  const statusLabels = {
    new: 'Новая',
    in_progress: 'В работе',
    closed: 'Закрыта'
  };

  const fetchLeads = async () => {
    try {
      let url = `${API_URL}/api/admin/leads?limit=100`;
      if (statusFilter) url += `&status=${statusFilter}`;
      if (serviceFilter) url += `&service=${encodeURIComponent(serviceFilter)}`;
      
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads);
        setTotal(data.total);
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [token, statusFilter, serviceFilter]);

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/leads/${leadId}/status`, {
        method: 'PUT',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchLeads();
        if (selectedLead?.id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const exportCSV = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/export/leads`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        const blob = new Blob([data.csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
      }
    } catch (error) {
      console.error('Export failed:', error);
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
            <div className="flex items-center gap-3 mb-4">
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

      {/* Mobile Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-[#111827] border border-white/10 text-white"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8 pt-12 lg:pt-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Заявки</h1>
            <p className="text-gray-400 text-sm">Всего: {total} заявок</p>
          </div>
          <Button onClick={exportCSV} className="bg-white/5 border border-white/10 text-white hover:bg-white/10 text-sm">
            <Download className="w-4 h-4 mr-2" />
            Экспорт CSV
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 sm:px-4 py-2 text-white text-xs sm:text-sm focus:border-purple-500 focus:outline-none"
          >
            <option value="">Все статусы</option>
            <option value="new">Новые</option>
            <option value="in_progress">В работе</option>
            <option value="closed">Закрытые</option>
          </select>
        </div>

        {/* Leads Table */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : leads.length === 0 ? (
          <div className="glass-strong rounded-xl p-12 text-center border border-white/10">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Поки немає заявок</p>
          </div>
        ) : (
          <div className="glass-strong rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-gray-400 font-medium">Ім'я</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Контакти</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Послуга</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Бюджет</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Статус</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Дата</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Дії</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-4">
                        <p className="text-white font-medium">{lead.name}</p>
                        {lead.company && <p className="text-gray-500 text-sm">{lead.company}</p>}
                      </td>
                      <td className="p-4">
                        <p className="text-gray-300 text-sm">{lead.email}</p>
                        <p className="text-gray-500 text-sm">{lead.phone}</p>
                      </td>
                      <td className="p-4 text-gray-300 text-sm max-w-[150px] truncate">{lead.service}</td>
                      <td className="p-4 text-gray-300 text-sm">{lead.budget}</td>
                      <td className="p-4">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${statusColors[lead.status]} bg-transparent cursor-pointer`}
                        >
                          <option value="new">Нова</option>
                          <option value="in_progress">В роботі</option>
                          <option value="closed">Закрита</option>
                        </select>
                      </td>
                      <td className="p-4 text-gray-500 text-sm">
                        {new Date(lead.created_at).toLocaleDateString('uk-UA')}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-purple-500/20 hover:text-purple-400 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedLead(null)}>
          <div className="glass-strong rounded-2xl p-6 max-w-lg w-full border border-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedLead.name}</h3>
                {selectedLead.company && <p className="text-gray-400">{selectedLead.company}</p>}
              </div>
              <button onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="text-white">{selectedLead.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Телефон</p>
                  <p className="text-white">{selectedLead.phone}</p>
                </div>
                {selectedLead.telegram && (
                  <div>
                    <p className="text-gray-500 text-sm">Telegram</p>
                    <p className="text-white">{selectedLead.telegram}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-500 text-sm">Послуга</p>
                  <p className="text-white">{selectedLead.service}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Бюджет</p>
                  <p className="text-white">{selectedLead.budget}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Статус</p>
                  <span className={`inline-block px-3 py-1 rounded-lg text-xs font-medium border ${statusColors[selectedLead.status]}`}>
                    {statusLabels[selectedLead.status]}
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-gray-500 text-sm mb-2">Повідомлення</p>
                <p className="text-white bg-white/5 rounded-xl p-4">{selectedLead.message}</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => updateLeadStatus(selectedLead.id, 'in_progress')}
                  className="flex-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30"
                  disabled={selectedLead.status === 'in_progress'}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  В роботу
                </Button>
                <Button
                  onClick={() => updateLeadStatus(selectedLead.id, 'closed')}
                  className="flex-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30"
                  disabled={selectedLead.status === 'closed'}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Закрити
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeadsPage;
