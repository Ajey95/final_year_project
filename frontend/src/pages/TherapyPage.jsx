import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { therapyAPI } from '../services/api'
import SlideManager from '../components/therapy/SlideManager'
import { useTherapyStore } from '../store/therapyStore'
import { useAuthStore } from '../store/authStore'
import { motion } from 'framer-motion'

export default function TherapyPage() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const { setCurrentLesson } = useTherapyStore()
  const { isAuthenticated, user, token } = useAuthStore()
  
  // Debug logging
  useEffect(() => {
    console.log('🎓 TherapyPage mounted - Lesson ID:', lessonId)
    console.log('👤 User authenticated:', isAuthenticated)
    console.log('🔑 Token exists:', !!token)
    console.log('👤 User:', user)
  }, [lessonId, isAuthenticated, token, user])
  
  const { data: lesson, isLoading, error } = useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: () => {
      console.log('📚 Fetching lesson:', lessonId)
      return therapyAPI.getLesson(parseInt(lessonId))
    },
    retry: false,
    enabled: !!lessonId && isAuthenticated && !!token
  })
  
  useEffect(() => {
    if (lesson?.data && !lesson.data.error) {
      console.log('✅ Lesson loaded:', lesson.data)
      setCurrentLesson(lesson.data)
    }
    if (error) {
      console.error('❌ Lesson fetch error:', error)
    }
  }, [lesson, error, setCurrentLesson])
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slide">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }
  
  if (error || !lesson?.data || lesson.data.error) {
    const errorMessage = error?.response?.status === 401 
      ? 'Please log in to access this lesson.' 
      : error?.response?.status === 404 
      ? 'Lesson not found.' 
      : 'Unable to load lesson.'
    
    const errorDetail = error?.response?.data?.detail || error?.message || 'Unknown error'
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-slide">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{errorMessage}</h2>
          <p className="text-gray-600 mb-2">Lesson ID: {lessonId}</p>
          <p className="text-red-600 text-sm mb-6">{errorDetail}</p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="block w-full px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full hover:from-primary-dark hover:to-secondary-dark transition"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => window.debugAuth?.()}
              className="block w-full px-8 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition text-sm"
            >
              Debug Authentication (check console)
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return <SlideManager lesson={lesson.data} />
}
