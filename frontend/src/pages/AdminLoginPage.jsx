import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowLeft, Eye, EyeOff, Shield } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { authAPI } from '../services/api'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { isAuthenticated, user } = useAuthStore()
  const setAuth = useAuthStore((state) => state.setAuth)
  const navigate = useNavigate()
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('✅ Already authenticated as:', user.role)
      if (user.role === 'admin') {
        navigate('/admin', { replace: true })
      } else {
        // Non-admin trying to access admin login
        navigate('/dashboard', { replace: true })
      }
    }
  }, [isAuthenticated, user, navigate])
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(adminLoginSchema)
  })
  
  const onSubmit = async (data) => {
    try {
      console.log('🔐 Attempting admin login...')
      const response = await authAPI.login(data)
      console.log('✅ Admin login response:', response.data)
      
      // Check if user is admin
      if (response.data.user.role !== 'admin') {
        toast.error('Access denied: Admin privileges required')
        return
      }
      
      setAuth(response.data.user, response.data.access_token)
      toast.success('Welcome Admin!')
      
      // Wait for state to persist before navigating
      setTimeout(() => {
        console.log('💾 Auth state:', useAuthStore.getState())
        console.log('🚀 Navigating to admin panel...')
        navigate('/admin', { replace: true })
      }, 100)
    } catch (error) {
      console.error('❌ Admin login error:', error)
      toast.error(error.response?.data?.detail || 'Admin login failed')
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-yellow-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        
        <div className="bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 p-8 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <Shield className="w-10 h-10 text-red-600" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-red-100">Authorized personnel only</p>
          </div>
          
          {/* Form */}
          <div className="p-8">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
              <p className="text-red-400 text-sm text-center">
                ⚠️ This area is restricted to administrators only
              </p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition placeholder-gray-400"
                    placeholder="admin@amrita.edu"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Admin Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition placeholder-gray-400"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-3.5 rounded-xl transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Shield className="w-5 h-5 mr-2" />
                {isSubmitting ? 'Verifying...' : 'Access Admin Panel'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Need user access?{' '}
                <Link to="/login" className="text-red-400 hover:text-red-300 font-semibold">
                  User Login
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-center text-sm text-gray-500 mt-6">
          All admin actions are logged and monitored
        </p>
      </motion.div>
    </div>
  )
}
