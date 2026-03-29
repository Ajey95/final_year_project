import { useState } from 'react'
import { motion } from 'framer-motion'
import CandleScene from '../three/CandleScene'
import Confetti from 'react-confetti'

export default function Slide4_CandleTest({ lesson, onNext, onPrev }) {
  const [airflowScore, setAirflowScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  
  // Simulate airflow score (in production, this comes from audio analysis)
  const handleBlowTest = () => {
    // Simulate increasing airflow
    const interval = setInterval(() => {
      setAirflowScore(prev => {
        const newScore = prev + 0.1
        if (newScore >= 0.7) {
          clearInterval(interval)
          setShowConfetti(true)
          setTimeout(() => onNext(), 3000)
        }
        return Math.min(newScore, 1)
      })
    }, 100)
  }
  
  const getTip = () => {
    if (lesson.phoneme === 'amma') {
      return 'Say AMMA gently. The candle should stay lit! 🕯️'
    } else if (lesson.phoneme === 'appa') {
      return 'Say APPA with a strong P sound. Blow out the candle! 💨'
    }
    return'Say the word and watch the candle!'
  }
  
  return (
    <div className="h-full flex items-center justify-center p-8 relative">
      {showConfetti && <Confetti />}
      
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8"
        >
          <h2 className="text-4xl font-bold text-center mb-4 gradient-text">
            Candle Test!
          </h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl p-6 mb-6"
          >
            <p className="text-xl text-center text-gray-700 font-medium">
              {getTip()}
            </p>
          </motion.div>
          
          <CandleScene airflowScore={airflowScore} word={lesson.phoneme} />
          
          <div className="mt-8 text-center space-y-4">
            <p className="text-lg text-gray-600">
              {airflowScore === 0 && 'Click "Test Blow" to start'}
              {airflowScore > 0 && airflowScore < 0.3 && 'Keep going...'}
              {airflowScore >= 0.3 && airflowScore < 0.6 && 'Almost there!'}
              {airflowScore >= 0.6 && lesson.candleBlows && '🎉 Perfect! You blew it out!'}
              {airflowScore >= 0.6 && !lesson.candleBlows && '🎯 Good! Less air for AMMA!'}
            </p>
            
            {airflowScore === 0 && (
              <button
                onClick={handleBlowTest}
                className="px-12 py-4 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-bold rounded-full transition shadow-lg"
              >
                Test Blow
              </button>
            )}
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={onPrev}
              className="px-8 py-3 border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary rounded-full transition font-semibold"
            >
              ← Back
            </button>
            
            {airflowScore >= 0.6 && (
              <button
                onClick={onNext}
                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white rounded-full transition font-semibold"
              >
                Continue →
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
