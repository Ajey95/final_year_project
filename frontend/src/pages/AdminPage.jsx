import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Users, Activity, TrendingUp, Star, Download, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { adminAPI, authAPI } from '../services/api'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const { logout } = useAuthStore()
  const navigate = useNavigate()
  
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminAPI.getStats()
  })
  
  const { data: users, refetch: refetchUsers } = useQuery({
    queryKey: ['admin-users', currentPage, searchTerm],
    queryFn: () => adminAPI.getUsers({ page: currentPage, limit: 10, search: searchTerm })
  })
  
  const handleExportCSV = async () => {
    try {
      const response = await adminAPI.exportCSV()
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `users_export_${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('CSV exported successfully')
    } catch (error) {
      toast.error('Export failed')
    }
  }
  
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    
    try {
      await adminAPI.deleteUser(userId)
      toast.success('User deleted')
      refetchUsers()
    } catch (error) {
      toast.error('Delete failed')
    }
  }
  
  const handleLogout = async () => {
    await authAPI.logout()
    logout()
    navigate('/')
  }
  
  // Prepare chart data
  const sessionsByDate = stats?.data?.sessions_by_date ? 
    Object.entries(stats.data.sessions_by_date).map(([date, count]) => ({
      date: new Date(date).toLocaleDateString(),
      sessions: count
    })) : []
  
  const accuracyByLesson = stats?.data?.accuracy_by_lesson ?
    Object.entries(stats.data.accuracy_by_lesson).map(([lesson, accuracy]) => ({
      lesson: `Lesson ${lesson}`,
      accuracy: Math.round(accuracy)
    })) : []
  
  const sessionTypes = [
    { name: 'Letters', value: 4 },
    { name: 'Words', value: 2 }
  ]
  
  const COLORS = ['#2563EB', '#0EA5E9', '#10B981', '#8B5CF6']
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-6 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-white/80">SpeakEasy ASD Management</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full transition"
          >
            Logout
          </button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto p-8">
        {/* Overview cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={<Users className="w-8 h-8" />}
            title="Total Users"
            value={stats?.data?.total_users || 0}
            color="from-blue-500 to-blue-600"
          />
          <StatsCard
            icon={<Activity className="w-8 h-8" />}
            title="Sessions Today"
            value={stats?.data?.sessions_today || 0}
            color="from-green-500 to-green-600"
          />
          <StatsCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Avg Accuracy"
            value={`${Math.round(stats?.data?.avg_accuracy || 0)}%`}
            color="from-orange-500 to-orange-600"
          />
          <StatsCard
            icon={<Star className="w-8 h-8" />}
            title="Total Stars"
            value={stats?.data?.total_stars || 0}
            color="from-yellow-500 to-yellow-600"
          />
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Sessions over time */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Sessions Over Time (Last 30 Days)</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sessionsByDate.slice(-30)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sessions" stroke="#2563EB" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Accuracy by lesson */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Accuracy by Lesson</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={accuracyByLesson}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="lesson" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="accuracy" fill="#2563EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* User management */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">User Management</h2>
            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:from-primary-dark hover:to-secondary-dark transition shadow-md"
            >
              <Download className="w-5 h-5" />
              <span>Export CSV</span>
            </button>
          </div>
          
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Name</th>
                  <th className="text-left py-3 px-4 font-semibold">Child</th>
                  <th className="text-left py-3 px-4 font-semibold">Email</th>
                  <th className="text-left py-3 px-4 font-semibold">Sessions</th>
                  <th className="text-left py-3 px-4 font-semibold">Stars</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.data?.users?.map((user) => (
                  <tr key={user._id} className="border-b border-gray-100 hover:bg-primary/5">
                    <td className="py-3 px-4">{user.full_name}</td>
                    <td className="py-3 px-4">{user.child_name} ({user.child_age}y)</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.total_sessions}</td>
                    <td className="py-3 px-4">{user.total_stars} ⭐</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {users?.data && (
            <div className="flex justify-center mt-6 space-x-2">
              {[...Array(users.data.pages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg transition ${
                    currentPage === i + 1 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md' 
                      : 'bg-neutral-200 hover:bg-neutral-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatsCard({ icon, title, value, color }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-gradient-to-r ${color} text-white rounded-2xl shadow-lg p-6`}
    >
      <div className="flex items-center justify-between mb-4">
        {icon}
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-white/90 text-sm">{title}</div>
    </motion.div>
  )
}
