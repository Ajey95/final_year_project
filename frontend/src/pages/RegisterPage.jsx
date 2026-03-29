import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { authAPI } from '../services/api'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const registerSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  child_name: z.string().min(2, 'Child name must be at least 2 characters'),
  child_age: z.coerce.number().min(4, 'Age must be at least 4').max(12, 'Age must be at most 12'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Confirm password is required'),
  language: z.string().default('Tamil')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { isAuthenticated, user } = useAuthStore()
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
    resolver: zodResolver(registerSchema),
    defaultValues: {
      language: 'Tamil'
    }
  })
  
  const onSubmit = async (data) => {
    try {
      console.log('📝 Attempting registration...')
      // Send data with confirm_password (snake_case for backend)
      const registerData = {
        full_name: data.full_name,
        child_name: data.child_name,
        child_age: data.child_age,
        email: data.email,
        password: data.password,
        confirm_password: data.confirmPassword, // Convert to snake_case
        language: data.language
      }
      const response = await authAPI.register(registerData)
      console.log('✅ Registration response:', response.data)
      
      toast.success('Account created successfully! Please login.')
      navigate('/login')
    } catch (error) {
      console.error('❌ Registration error:', error)
      // Handle validation errors from FastAPI
      if (error.response?.data?.detail) {
        const detail = error.response.data.detail
        if (Array.isArray(detail)) {
          // Multiple validation errors
          detail.forEach(err => {
            toast.error(`${err.loc[1]}: ${err.msg}`)
          })
        } else if (typeof detail === 'string') {
          toast.error(detail)
        } else {
          toast.error('Registration failed')
        }
      } else {
        toast.error('Registration failed')
      }
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-32 right-1/3 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
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
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <span className="text-4xl">🎉</span>
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-purple-100">Join us and begin your child's speech therapy journey</p>
          </div>
          
          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register('full_name')}
                    type="text"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                    placeholder="John Doe"
                  />
                </div>
                {errors.full_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Child's Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register('child_name')}
                    type="text"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                    placeholder="Child's name"
                  />
                </div>
                {errors.child_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.child_name.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Child's Age (4-12)
                  </label>
                  <div className="relative">
                    <input
                      {...register('child_age')}
                      type="number"
                      min="4"
                      max="12"
                      className="w-full pl-4 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                      placeholder="8"
                    />
                  </div>
                  {errors.child_age && (
                    <p className="text-red-500 text-sm mt-1">{errors.child_age.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Language
                  </label>
                  <div className="relative">
                    <select
                      {...register('language')}
                      className="w-full pl-4 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition appearance-none bg-white"
                    >
                      <option value="Tamil">Tamil</option>
                      <option value="Telugu">Telugu</option>
                      <option value="English">English</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
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
                    className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
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
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register('confirmPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
              
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  required
                  className="w-4 h-4 mt-1 text-purple-600 border-gray-300 rounded focus:ring-purple-500" 
                />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the <a href="#" className="text-purple-600 hover:text-purple-700">Terms of Service</a> and <a href="#" className="text-purple-600 hover:text-purple-700">Privacy Policy</a>
                </span>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3.5 rounded-xl transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          By creating an account, you agree to our Terms and Privacy Policy
        </p>
      </motion.div>
    </div>
  )
}
