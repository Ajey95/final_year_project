import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, CheckCircle2, Clock, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { progressAPI } from '../services/api'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function ProgressPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  
  const { data: summary } = useQuery({
    queryKey: ['progress-summary', user?.email],
    queryFn: () => progressAPI.getProgressSummary(user?.email)
  })
  
  const lessons = [
    { id: 1, symbol: 'அ', english: 'A', type: 'letter' },
    { id: 2, symbol: 'ஆ', english: 'AA', type: 'letter' },
    { id: 3, symbol: 'ல', english: 'LA', type: 'letter' },
    { id: 4, symbol: 'த', english: 'TA', type: 'letter' },
    { id: 5, symbol: 'அம்மா', english: 'AMMA', type: 'word' },
    { id: 6, symbol: 'அப்பா', english: 'APPA', type: 'word' },
  ]
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-6 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-white/20 rounded-full transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Progress Report</h1>
            <p className="text-white/80">Track your learning journey</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto p-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{user?.total_stars || 0}</div>
            <div className="text-sm text-gray-600">Total Stars</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {Math.round(summary?.data?.avg_accuracy || 0)}%
            </div>
            <div className="text-sm text-gray-600">Avg Accuracy</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-dark rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {summary?.data?.completed_lessons || 0}/6
            </div>
            <div className="text-sm text-gray-600">Completed Lessons</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary-dark rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{user?.total_sessions || 0}</div>
            <div className="text-sm text-gray-600">Total Sessions</div>
          </motion.div>
        </div>
        
        {/* Progress Chart */}
        {summary?.data?.chart_data && summary.data.chart_data.length > 0 && (
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Accuracy Over Time</h2>
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
        
        {/* Lesson Progress */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Lesson Progress</h2>
          <div className="space-y-4">
            {lessons.map((lesson) => {
              const progress = summary?.data?.progress_by_lesson?.find(p => p.lesson_id === lesson.id)
              
              return (
                <div key={lesson.id} className="border-2 border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl tamil-letter font-bold">{lesson.symbol}</div>
                      <div>
                        <div className="font-bold text-lg">{lesson.english}</div>
                        <div className="text-sm text-gray-600 capitalize">{lesson.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      {progress?.completed && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Completed
                        </span>
                      )}
                      {!progress?.completed && progress?.attempts > 0 && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                          In Progress
                        </span>
                      )}
                      {!progress && (
                        <span className="text-gray-400">Not Started</span>
                      )}
                    </div>
                  </div>
                  
                  {progress && (
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-2xl font-bold text-gray-800">{progress.attempts}</div>
                        <div className="text-xs text-gray-600">Attempts</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-2xl font-bold text-primary">{Math.round(progress.best_accuracy)}%</div>
                        <div className="text-xs text-gray-600">Best Score</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-2xl font-bold text-yellow-600">{progress.stars_earned || 0}</div>
                        <div className="text-xs text-gray-600">Stars Earned</div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
