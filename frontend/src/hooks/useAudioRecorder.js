import { useState, useRef, useCallback } from 'react'
import toast from 'react-hot-toast'

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [duration, setDuration] = useState(0)
  
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const startTimeRef = useRef(null)
  const recognitionRef = useRef(null)
  const [transcript, setTranscript] = useState('')
  
  const startRecording = useCallback(async (language = 'en-IN') => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      // Initialize MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      })
      
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []
      startTimeRef.current = Date.now()
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioBlob(blob)
        setDuration(Date.now() - startTimeRef.current)
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop())
      }
      
      mediaRecorder.start()
      setIsRecording(true)
      
      // Initialize Speech Recognition if available
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition()
        
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = language
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript
          setTranscript(transcript)
        }
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error)
        }
        
        recognitionRef.current = recognition
        recognition.start()
      }
      
      return true
    } catch (error) {
      console.error('Error starting recording:', error)
      toast.error('Could not access microphone')
      return false
    }
  }, [])
  
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [isRecording])
  
  const resetRecording = useCallback(() => {
    setAudioBlob(null)
    setDuration(0)
    setTranscript('')
    chunksRef.current = []
  }, [])
  
  return {
    isRecording,
    audioBlob,
    duration,
    transcript,
    startRecording,
    stopRecording,
    resetRecording
  }
}
