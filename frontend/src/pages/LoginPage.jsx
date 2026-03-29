import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { authAPI } from '../services/api'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { isAuthenticated, user } = useAuthStore()
  const setAuth = useAuthStore((state) => state.setAuth)
  const navigate = useNavigate()
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('✅ Already authenticated, redirecting...')
      if (user.role === 'admin') {
        navigate('/admin', { replace: true })
      } else {
        navigate('/dashboard', { replace: true })
      }
    }
  }, [isAuthenticated, user, navigate])
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema)
  })
  
  const onSubmit = async (data) => {
    try {
      console.log('🔐 Attempting login...')
      const response = await authAPI.login(data)
      console.log('✅ Login response:', response.data)
      
      // Set auth immediately
      setAuth(response.data.user, response.data.access_token)
      
      toast.success(`Welcome back, ${response.data.user.full_name}!`)
      
      // Wait for state to persist before navigating
      setTimeout(() => {
        const state = useAuthStore.getState()
        console.log('💾 Auth state before navigation:', {
          isAuthenticated: state.isAuthenticated,
          hasUser: !!state.user,
          hasToken: !!state.token,
          userEmail: state.user?.email,
          userRole: state.user?.role
        })
        
        // Navigate based on role
        if (response.data.user.role === 'admin') {
          console.log('🚀 Navigating to admin...')
          navigate('/admin', { replace: true })
        } else {
          console.log('🚀 Navigating to dashboard...')
          navigate('/dashboard', { replace: true })
        }
      }, 100)
    } catch (error) {
      console.error('❌ Login error:', error)
      toast.error(error.response?.data?.detail || 'Login failed')
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
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
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <span className="text-4xl">👋</span>
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
            <p className="text-blue-100">Sign in to continue your journey</p>
          </div>
          
          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Forgot password?
                </a>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-xl transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Sign up now
                </Link>
              </p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link 
                to="/admin-login" 
                className="block text-center text-sm text-gray-500 hover:text-gray-700 transition"
              >
                Admin Login →
              </Link>
            </div>
          </div>
        </div>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  )
}
