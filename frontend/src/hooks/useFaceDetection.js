import { useState, useRef, useEffect, useCallback } from 'react'

export const useFaceDetection = (videoRef, canvasRef) => {
  const [faceData, setFaceData] = useState({
    faceDetected: false,
    mouthOpenRatio: 0,
    mouthIsOpen: false,
    stressLevel: 0,
    emotion: 'neutral'
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const faceMeshRef = useRef(null)
  const animationFrameRef = useRef(null)
  
  // Initialize MediaPipe Face Mesh
  useEffect(() => {
    if (typeof window !== 'undefined' && window.FaceMesh) {
      try {
        const faceMesh = new window.FaceMesh({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
          }
        })
        
        faceMesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        })
        
        faceMesh.onResults(onResults)
        faceMeshRef.current = faceMesh
        
        console.log('✅ MediaPipe Face Mesh initialized')
      } catch (error) {
        console.error('Error initializing Face Mesh:', error)
      }
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])
  
  const onResults = useCallback((results) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    
    if (!ctx || !canvas) return
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
      const landmarks = results.multiFaceLandmarks[0]
      
      // Draw landmarks
      ctx.fillStyle = '#4ECDC4'
      landmarks.forEach((landmark) => {
        ctx.beginPath()
        ctx.arc(
          landmark.x * canvas.width,
          landmark.y * canvas.height,
          2,
          0,
          2 * Math.PI
        )
        ctx.fill()
      })
      
      // Calculate mouth metrics
      const upperLip = landmarks[13]
      const lowerLip = landmarks[14]
      const leftCorner = landmarks[61]
      const rightCorner = landmarks[291]
      
      const mouthHeight = Math.abs(lowerLip.y - upperLip.y) * canvas.height
      const mouthWidth = Math.abs(rightCorner.x - leftCorner.x) * canvas.width
      
      const mouthOpenRatio = mouthWidth > 0 ? mouthHeight / mouthWidth : 0
      const mouthIsOpen = mouthOpenRatio > 0.35
      
      // Draw mouth bounding box
      ctx.strokeStyle = mouthIsOpen ? '#FFE66D' : '#4ECDC4'
      ctx.lineWidth = 2
      ctx.strokeRect(
        leftCorner.x * canvas.width - 5,
        upperLip.y * canvas.height - 5,
        mouthWidth + 10,
        mouthHeight + 10
      )
      
      // Calculate stress level (simplified)
      const leftBrowInner = landmarks[70]
      const rightBrowInner = landmarks[300]
      const browDistance = Math.abs(rightBrowInner.x - leftBrowInner.x) * canvas.width
      const normalizedDistance = browDistance / (canvas.width * 0.12)
      const stressLevel = Math.max(0, Math.min(1, 1.5 - normalizedDistance))
      
      const emotion = stressLevel > 0.6 ? 'stressed' : 
                     stressLevel > 0.3 ? 'focused' : 
                     mouthIsOpen ? 'engaged' : 'calm'
      
      setFaceData({
        faceDetected: true,
        mouthOpenRatio,
        mouthIsOpen,
        stressLevel,
        emotion
      })
    } else {
      setFaceData({
        faceDetected: false,
        mouthOpenRatio: 0,
        mouthIsOpen: false,
        stressLevel: 0,
        emotion: 'neutral'
      })
    }
  }, [canvasRef])
  
  const processFrame = useCallback(async () => {
    if (!faceMeshRef.current || !videoRef.current || !isProcessing) {
      return
    }
    
    try {
      await faceMeshRef.current.send({ image: videoRef.current })
    } catch (error) {
      console.error('Error processing frame:', error)
    }
    
    animationFrameRef.current = requestAnimationFrame(processFrame)
  }, [videoRef, isProcessing])
  
  const startDetection = useCallback(() => {
    setIsProcessing(true)
  }, [])
  
  const stopDetection = useCallback(() => {
    setIsProcessing(false)
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])
  
  useEffect(() => {
    if (isProcessing) {
      processFrame()
    }
  }, [isProcessing, processFrame])
  
  return {
    faceData,
    startDetection,
    stopDetection,
    isProcessing
  }
}
