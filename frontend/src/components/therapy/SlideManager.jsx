import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTherapyStore } from '../../store/therapyStore'
import Slide1_Picture from './Slide1_Picture'
import Slide2_Animation from './Slide2_Animation'
import Slide3_Evaluation from './Slide3_Evaluation'
import Slide4_CandleTest from './Slide4_CandleTest'
import Slide5_Rewards from './Slide5_Rewards'

export default function SlideManager({ lesson }) {
  const { currentSlide, prevSlide, nextSlide, setCurrentSlide } = useTherapyStore()
  
  // Define slides based on lesson type
  // Letters: Skip candle test (slide 4)
  // Words: Include all slides
  const slides = lesson.type === 'letter' ? [1, 2, 3, 5] : [1, 2, 3, 4, 5]
  
  const renderSlide = () => {
    switch (currentSlide) {
      case 1:
        return <Slide1_Picture lesson={lesson} onNext={nextSlide} />
      case 2:
        return <Slide2_Animation lesson={lesson} onNext={nextSlide} onPrev={prevSlide} />
      case 3:
        return <Slide3_Evaluation lesson={lesson} onNext={nextSlide} onPrev={prevSlide} />
      case 4:
        // Only show candle test for words
        if (lesson.type === 'word') {
          return <Slide4_CandleTest lesson={lesson} onNext={nextSlide} onPrev={prevSlide} />
        }
        // For letters, skip to rewards
        return <Slide5_Rewards lesson={lesson} />
      case 5:
        return <Slide5_Rewards lesson={lesson} />
      default:
        return <Slide1_Picture lesson={lesson} onNext={nextSlide} />
    }
  }
  
  return (
    <div className="min-h-screen bg-slide">
      {/* Header */}
      <div className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full">
              <span className="font-semibold text-primary">
                {lesson.type === 'letter' ? 'Letter' : 'Word'}: {lesson.symbol}
              </span>
            </div>
            
            <div className="hidden sm:flex items-center space-x-2">
              {[...Array(lesson.difficulty)].map((_, i) => (
                <span key={i} className="text-accent text-xl">⭐</span>
              ))}
            </div>
          </div>
          
          {/* Progress dots */}
          <div className="flex items-center space-x-2">
            {slides.map((slideNum, i) => (
              <button
                key={slideNum}
                onClick={() => setCurrentSlide(slideNum)}
                className={`w-3 h-3 rounded-full transition ${
                  slideNum === currentSlide ? 'bg-primary w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Slide content with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="h-[calc(100vh-80px)]"
        >
          {renderSlide()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
