import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, User, Bell, Shield, Volume2, HelpCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  
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
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-white/80">Manage your account and preferences</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto p-8">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg p-8 mb-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <User className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Profile Information</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Parent Name</label>
              <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700 border border-gray-200">
                {user?.full_name}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700 border border-gray-200">
                {user?.email}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Child Name</label>
              <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700 border border-gray-200">
                {user?.child_name}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Child Age</label>
              <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700 border border-gray-200">
                {user?.child_age} years
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Preferences Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-lg p-8 mb-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Volume2 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Sound & Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <div className="font-semibold text-gray-800">Sound Effects</div>
                <div className="text-sm text-gray-600">Play audio feedback during lessons</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => {
                    setSoundEnabled(e.target.checked)
                    toast.success(e.target.checked ? 'Sound enabled' : 'Sound disabled')
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <div className="font-semibold text-gray-800">Practice Reminders</div>
                <div className="text-sm text-gray-600">Get daily reminders to practice</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => {
                    setNotificationsEnabled(e.target.checked)
                    toast.success(e.target.checked ? 'Notifications enabled' : 'Notifications disabled')
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </motion.div>
        
        {/* Security Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-lg p-8 mb-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Security</h2>
          </div>
          
          <button
            onClick={() => toast.info('Password change feature coming soon!')}
            className="w-full px-6 py-3 border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition font-semibold"
          >
            Change Password
          </button>
        </motion.div>
        
        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-lg p-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <HelpCircle className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Help & Support</h2>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => toast.info('Help documentation coming soon!')}
              className="w-full text-left px-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition"
            >
              <div className="font-semibold">How to Use</div>
              <div className="text-sm text-gray-600">Learn how to get the most out of SpeakEasy</div>
            </button>
            
            <button
              onClick={() => toast.info('Contact support: support@speakeasy-asd.com')}
              className="w-full text-left px-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition"
            >
              <div className="font-semibold">Contact Support</div>
              <div className="text-sm text-gray-600">Get help from our support team</div>
            </button>
            
            <button
              onClick={() => toast.info('Version 1.0.0')}
              className="w-full text-left px-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition"
            >
              <div className="font-semibold">About</div>
              <div className="text-sm text-gray-600">App version and information</div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
