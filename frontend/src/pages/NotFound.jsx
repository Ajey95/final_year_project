import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center text-white"
      >
        <motion.div
          animate={{
            y: [0, -20, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
          className="text-9xl mb-8"
        >
          🤔
        </motion.div>
        
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">Oops! Page not found</p>
        
        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-white text-primary rounded-full hover:bg-gray-100 transition font-bold text-lg"
        >
          Go Home
        </button>
      </motion.div>
    </div>
  )
}
