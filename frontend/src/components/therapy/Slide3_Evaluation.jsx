import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Circle, Square, CheckCircle2, AlertCircle } from 'lucide-react'
import { useAudioRecorder } from '../../hooks/useAudioRecorder'
import { useFaceDetection } from '../../hooks/useFaceDetection'
import { evaluationAPI } from '../../services/api'
import { useTherapyStore } from '../../store/therapyStore'
import toast from 'react-hot-toast'

export default function Slide3_Evaluation({ lesson, onNext, onPrev }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [evaluationResult, setEvaluationResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  
  const { addSessionResult } = useTherapyStore()
  const { isRecording, audioBlob, transcript, startRecording, stopRecording, resetRecording } = useAudioRecorder()
  const { faceData, startDetection, stopDetection } = useFaceDetection(videoRef, canvasRef)
  
  useEffect(() => {
    // Start camera
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((mediaStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
          setStream(mediaStream)
          startDetection()
        }
      })
      .catch((error) => {
        console.error('Camera error:', error)
        toast.error('Could not access camera')
      })
    
    return () => {
      stopDetection()
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])
  
  const handleRecord = async () => {
    if (!isRecording) {
      const success = await startRecording(lesson.language || 'en-IN')
      if (success) {
        toast.success('Recording started')
      }
    } else {
      stopRecording()
      toast.success('Recording stopped')
    }
  }
  
  const handleSubmit = async () => {
    if (!audioBlob) {
      toast.error('No recording available')
      return
    }
    
    setIsAnalyzing(true)
    console.log('📤 Submitting audio for evaluation...')
    
    try {
      const formData = new FormData()
      formData.append('audio', audioBlob, 'recording.webm')
      formData.append('target_phoneme', lesson.phoneme)
      formData.append('lesson_id', lesson.id)
      
      console.log(`🎯 Target phoneme: ${lesson.phoneme}`)
      
      const response = await evaluationAPI.evaluateSpeech(formData)
      const result = response.data
      
      console.log('✅ Evaluation result:', result)
      console.log(`🎤 Transcription: "${result.transcription || 'N/A'}"`)
      console.log(`🎯 Phoneme match: ${result.phoneme_match ? 'YES ✓' : 'NO ✗'}`)
      console.log(`📊 Accuracy: ${result.accuracy}%`)
      
      setEvaluationResult(result)
      addSessionResult(result)
      toast.success('Evaluation complete!')
      
      // Don't auto proceed - let user review results
      // setTimeout(() => {
      //   onNext()
      // }, 3000)
    } catch (error) {
      console.error('❌ Evaluation error:', error)
      toast.error('Evaluation failed: ' + (error.response?.data?.detail || error.message))
    } finally {
      setIsAnalyzing(false)
    }
  }
  
  const getEmotionEmoji = (emotion) => {
    switch (emotion) {
      case 'stressed': return '😰'
      case 'focused': return '🤔'
      case 'engaged': return '😊'
      case 'calm': return '😌'
      default: return '😐'
    }
  }
  
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-7xl w-full">
        <h2 className="text-4xl font-bold text-center mb-8 gradient-text">
          Your Turn! Say: {lesson.symbol} ({lesson.english})
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Camera feed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-6"
          >
            <h3 className="text-xl font-bold mb-4">Live Camera Feed</h3>
            
            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden mb-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform scale-x-[-1]"
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
              />
              
              {/* Face detection status */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-4 py-2 rounded-full text-white flex items-center space-x-2">
                <Circle className={`w-3 h-3 ${faceData.faceDetected ? 'fill-green-500 text-green-500' : 'fill-red-500 text-red-500'}`} />
                <span className="text-sm">
                  {faceData.faceDetected ? 'Face Detected' : 'No Face'}
                </span>
              </div>
              
              {/* Emotion indicator */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-4 py-2 rounded-full text-white text-2xl">
                {getEmotionEmoji(faceData.emotion)}
              </div>
              
              {/* Waveform placeholder */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="h-12 bg-black/60 backdrop-blur rounded-xl flex items-center justify-center space-x-1 px-2">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-secondary rounded-full"
                      animate={{
                        height: isRecording ? [4, 32, 4] : 4
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.05
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex space-x-4">
              {!evaluationResult ? (
                <>
                  <button
                    onClick={handleRecord}
                    disabled={isAnalyzing}
                    className={`flex-1 py-3 rounded-xl font-semibold transition ${
                      isRecording
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white'
                    } disabled:opacity-50`}
                  >
                    {isRecording ? '⏹ Stop Recording' : '🔴 Start Recording'}
                  </button>
                  
                  {audioBlob && !isRecording && (
                    <button
                      onClick={handleSubmit}
                      disabled={isAnalyzing}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
                    >
                      {isAnalyzing ? '⏳ Analyzing...' : '✅ Evaluate'}
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => {
                    setEvaluationResult(null)
                    resetRecording()
                  }}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition"
                >
                  🔄 Try Again
                </button>
              )}
            </div>
            
            {transcript && (
              <div className="mt-4 p-4 bg-gray-100 rounded-xl">
                <p className="text-sm text-gray-600">Transcript:</p>
                <p className="font-semibold">{transcript}</p>
              </div>
            )}
            
            <p className="text-center text-gray-600 mt-4 text-sm">
              {isRecording ? (
                <span className="text-red-600 font-semibold animate-pulse">🎤 Listening... Speak now!</span>
              ) : audioBlob ? (
                <span className="text-green-600 font-semibold">✅ Recording ready - Click "Evaluate" to check!</span>
              ) : evaluationResult ? (
                <span className="text-blue-600 font-semibold">👉 Check your results on the right →</span>
              ) : (
                <span>👆 Click "Start Recording" to begin</span>
              )}
            </p>
          </motion.div>
          
          {/* Right - Score panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-6"
          >
            <h3 className="text-xl font-bold mb-6">Real-time Analysis</h3>
            
            {/* Transcription Result - Show FIRST */}
            {evaluationResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200"
              >
                <h4 className="font-bold mb-4 text-lg">🎤 What We Heard:</h4>
                
                <div className="space-y-3">
                  {/* Target */}
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Target Sound:</p>
                    <p className="text-2xl font-bold text-primary">
                      {lesson.symbol} ({lesson.phoneme.toUpperCase()})
                    </p>
                  </div>
                  
                  {/* Transcription */}
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">You Said:</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {evaluationResult.transcription ? (
                        `"${evaluationResult.transcription}"`
                      ) : (
                        <span className="text-gray-400 text-lg">No speech detected</span>
                      )}
                    </p>
                  </div>
                  
                  {/* Match Result */}
                  <div className={`rounded-xl p-4 ${
                    evaluationResult.phoneme_match 
                      ? 'bg-green-100 border-2 border-green-400' 
                      : 'bg-orange-100 border-2 border-orange-400'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      {evaluationResult.phoneme_match ? (
                        <>
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                          <span className="font-bold text-green-800">Match Found! ✓</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-6 h-6 text-orange-600" />
                          <span className="font-bold text-orange-800">Not Quite Right</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-gray-700">
                      {evaluationResult.phoneme_match 
                        ? `Great! We detected the "${lesson.phoneme}" sound in your pronunciation.`
                        : `We didn't clearly hear the "${lesson.phoneme}" sound. Try again!`
                      }
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Accuracy meter */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Overall Accuracy</span>
                <span className="text-sm font-bold text-primary">
                  {evaluationResult?.accuracy || 0}%
                </span>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: `${evaluationResult?.accuracy || 0}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            
            {/* Score cards */}
            <div className="space-y-4 mb-6">
              <ScoreCard
                icon="🎯"
                label="MFCC Score"
                value={evaluationResult?.mfcc_score || 0}
                status={evaluationResult?.mfcc_score > 70 ? 'good' : 'needs-work'}
              />
              
              <ScoreCard
                icon="💨"
                label="Airflow"
                value={evaluationResult?.airflow_score ? evaluationResult.airflow_score * 100 : 0}
                status="info"
              />
              
              <ScoreCard
                icon="😊"
                label="Emotion State"
                value={faceData.emotion}
                isText
              />
            </div>
            
            {/* Feedback */}
            {evaluationResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6"
              >
                <h4 className="font-bold mb-2 flex items-center space-x-2">
                  <span>💡</span>
                  <span>Feedback:</span>
                </h4>
                <p className="text-gray-700 leading-relaxed">{evaluationResult.feedback}</p>
              </motion.div>
            )}
            
            {!evaluationResult && (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg">👈 Record your voice to see analysis</p>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={onPrev}
            className="px-8 py-3 border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary rounded-full transition font-semibold"
          >
            ← Back
          </button>
          
          {evaluationResult && (
            <button
              onClick={onNext}
              className="px-8 py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white rounded-full transition font-semibold"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function ScoreCard({ icon, label, value, status, isText, icon2 }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
      <div className="flex items-center space-x-2">
        {isText ? (
          <span className="font-bold capitalize">{value}</span>
        ) : (
          <>
            <span className="font-bold">{Math.round(value)}%</span>
            {icon2}
          </>
        )}
      </div>
    </div>
  )
}
