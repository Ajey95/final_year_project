import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { LogOut, Star, Target, TrendingUp, Award } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { progressAPI, authAPI } from '../services/api'
import toast from 'react-hot-toast'

export default function UserDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  
  const { data: summary } = useQuery({
    queryKey: ['progress-summary', user?.email],
    queryFn: () => progressAPI.getProgressSummary(user?.email)
  })
  
  const handleLogout = async () => {
    try {
      await authAPI.logout()
      logout()
      navigate('/')
      toast.success('Logged out successfully')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }
  
  const lessons = [
    { id: 1, symbol: 'அ', english: 'A', type: 'letter', difficulty: 1 },
    { id: 2, symbol: 'ஆ', english: 'AA', type: 'letter', difficulty: 1 },
    { id: 3, symbol: 'ல', english: 'LA', type: 'letter', difficulty: 2 },
    { id: 4, symbol: 'த', english: 'TA', type: 'letter', difficulty: 2 },
    { id: 5, symbol: 'அம்மா', english: 'AMMA', type: 'word', difficulty: 3 },
    { id: 6, symbol: 'அப்பா', english: 'APPA', type: 'word', difficulty: 3 },
  ]
  
  const getLessonStatus = (lessonId) => {
    // All lessons are unlocked - users can access any lesson
    const progress = summary?.data?.progress_by_lesson?.find(p => p.lesson_id === lessonId)
    if (progress?.completed) return 'completed'
    if (progress?.attempts > 0) return 'in-progress'
    return 'unlocked'
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-xl p-6 flex flex-col">
        <div className="mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg">
            {user?.child_name?.charAt(0) || 'U'}
          </div>
          <h3 className="text-center font-bold text-lg">{user?.child_name}</h3>
          <p className="text-center text-sm text-gray-600">{user?.full_name}</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          <button className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-md">
            Dashboard
          </button>
          <button 
            onClick={() => navigate('/progress')}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Progress
          </button>
          <button 
            onClick={() => navigate('/settings')}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Settings
          </button>
        </nav>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
      
      {/* Main content */}
      <div className="ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome back, {user?.child_name}! 👋</h1>
          <p className="text-gray-600 mb-8">Let's continue your speech therapy journey</p>
          
          {/* Stats cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatsCard
              icon={<Star className="w-8 h-8 text-white" />}
              title="Total Stars"
              value={user?.total_stars || 0}
              color="from-yellow-400 to-yellow-600"
            />
            <StatsCard
              icon={<Target className="w-8 h-8 text-white" />}
              title="Sessions"
              value={user?.total_sessions || 0}
              color="from-secondary to-secondary-dark"
            />
            <StatsCard
              icon={<TrendingUp className="w-8 h-8 text-white" />}
              title="Avg Accuracy"
              value={`${Math.round(summary?.data?.avg_accuracy || 0)}%`}
              color="from-primary to-primary-dark"
            />
            <StatsCard
              icon={<Award className="w-8 h-8 text-white" />}
              title="Completed"
              value={`${summary?.data?.completed_lessons || 0}/6`}
              color="from-accent to-accent-dark"
            />
          </div>
          
          {/* Progress chart */}
          {summary?.data?.chart_data && summary.data.chart_data.length > 0 && (
            <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Progress Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={summary.data.chart_data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="accuracy" stroke="#2563EB" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          
          {/* Lesson grid */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Lessons</h2>
            <div className="grid grid-cols-3 gap-6">
              {lessons.map((lesson) => {
                const status = getLessonStatus(lesson.id)
                const progress = summary?.data?.progress_by_lesson?.find(p => p.lesson_id === lesson.id)
                
                return (
                  <motion.div
                    key={lesson.id}
                    whileHover={status !== 'locked' ? { scale: 1.05 } : {}}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition ${
                      status === 'completed' ? 'border-green-500 bg-green-50' :
                      status === 'in-progress' ? 'border-primary bg-primary/5' :
                      status === 'unlocked' ? 'border-gray-300 bg-white hover:border-primary' :
                      'border-gray-300 bg-gray-50 opacity-50'
                    }`}
                    onClick={() => status !== 'locked' && navigate(`/therapy/${lesson.id}`)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-4xl tamil-letter font-bold">{lesson.symbol}</div>
                      {status === 'completed' && <span className="text-2xl">✅</span>}
                      {status === 'unlocked' && <span className="text-2xl">🎯</span>}
                      {status === 'locked' && <span className="text-2xl">🔒</span>}
                    </div>
                    
                    <div className="text-xl font-bold mb-2">{lesson.english}</div>
                    <div className="text-sm text-gray-600 mb-2 capitalize">{lesson.type}</div>
                    
                    <div className="flex space-x-1 mb-3">
                      {[...Array(lesson.difficulty)].map((_, i) => (
                        <span key={i} className="text-accent">⭐</span>
                      ))}
                    </div>
                    
                    {progress && (
                      <div className="text-sm">
                        <div className="text-gray-600">Best: {Math.round(progress.best_accuracy)}%</div>
                        <div className="text-gray-600">Stars: {progress.stars_best} ⭐</div>
                      </div>
                    )}
                    
                    {(status === 'in-progress' || status === 'unlocked') && (
                      <button className="w-full mt-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:from-primary-dark hover:to-secondary-dark transition font-semibold shadow-md">
                        {status === 'in-progress' ? 'Continue' : 'Start'}
                      </button>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
          
          {/* Motivational quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-gradient-to-r from-primary to-secondary text-white rounded-3xl p-8 text-center shadow-xl"
          >
            <p className="text-2xl font-bold mb-2">
              "Every voice matters. Every sound is progress." 🌟
            </p>
            <p className="text-white/80">Keep practicing every day!</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

function StatsCard({ icon, title, value, color }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-100"
    >
      <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-4 shadow-md`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-neutral-800 mb-1">{value}</div>
      <div className="text-sm text-neutral-600">{title}</div>
    </motion.div>
  )
}
