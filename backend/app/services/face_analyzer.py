"""Face analysis service using MediaPipe."""
import cv2
import numpy as np
from typing import Dict
try:
    import mediapipe as mp
    MEDIAPIPE_AVAILABLE = True
except ImportError:
    MEDIAPIPE_AVAILABLE = False

from ..models.evaluation import FaceAnalysisResult


class FaceAnalyzer:
    """Face analysis service using MediaPipe Face Mesh."""
    
    def __init__(self):
        """Initialize face analyzer."""
        self.face_mesh = None
        
        if MEDIAPIPE_AVAILABLE:
            try:
                mp_face_mesh = mp.solutions.face_mesh
                self.face_mesh = mp_face_mesh.FaceMesh(
                    max_num_faces=1,
                    refine_landmarks=True,
                    min_detection_confidence=0.5,
                    min_tracking_confidence=0.5
                )
                print("✅ MediaPipe Face Mesh initialized")
            except Exception as e:
                print(f"⚠️  Could not initialize MediaPipe: {e}")
    
    def analyze_frame(self, frame_bytes: bytes) -> FaceAnalysisResult:
        """
        Analyze a video frame for face landmarks and expressions.
        
        Args:
            frame_bytes: JPEG encoded frame bytes
            
        Returns:
            FaceAnalysisResult with mouth and stress metrics
        """
        try:
            # Decode image
            nparr = np.frombuffer(frame_bytes, np.uint8)
            frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            if frame is None:
                return FaceAnalysisResult(face_detected=False)
            
            # Convert BGR to RGB
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            
            if not self.face_mesh:
                # Fallback: return neutral values
                return FaceAnalysisResult(
                    face_detected=True,
                    mouth_open_ratio=0.3,
                    mouth_is_open=False,
                    stress_level=0.0,
                    emotion="neutral"
                )
            
            # Process frame
            results = self.face_mesh.process(rgb_frame)
            
            if not results.multi_face_landmarks:
                return FaceAnalysisResult(face_detected=False)
            
            # Get first face landmarks
            landmarks = results.multi_face_landmarks[0]
            
            # Calculate mouth metrics
            mouth_open_ratio, mouth_is_open = self._calculate_mouth_metrics(
                landmarks,
                frame.shape
            )
            
            # Calculate stress level from brow/forehead tension
            stress_level = self._calculate_stress_level(landmarks, frame.shape)
            
            # Determine emotion
            emotion = self._determine_emotion(mouth_is_open, stress_level)
            
            return FaceAnalysisResult(
                face_detected=True,
                mouth_open_ratio=mouth_open_ratio,
                mouth_is_open=mouth_is_open,
                stress_level=stress_level,
                emotion=emotion
            )
            
        except Exception as e:
            print(f"Error in analyze_frame: {e}")
            return FaceAnalysisResult(face_detected=False)
    
    def _calculate_mouth_metrics(
        self,
        landmarks,
        frame_shape: tuple
    ) -> tuple:
        """Calculate mouth open ratio and status."""
        try:
            h, w = frame_shape[:2]
            
            # Key landmarks for mouth
            # Upper lip: landmark 13
            # Lower lip: landmark 14
            # Left mouth corner: landmark 61
            # Right mouth corner: landmark 291
            
            upper_lip = landmarks.landmark[13]
            lower_lip = landmarks.landmark[14]
            left_corner = landmarks.landmark[61]
            right_corner = landmarks.landmark[291]
            
            # Calculate vertical mouth opening (in pixels)
            mouth_height = abs(lower_lip.y - upper_lip.y) * h
            
            # Calculate horizontal mouth width (in pixels)
            mouth_width = abs(right_corner.x - left_corner.x) * w
            
            # Calculate ratio
            if mouth_width > 0:
                mouth_open_ratio = mouth_height / mouth_width
            else:
                mouth_open_ratio = 0.0
            
            # Threshold for "mouth open" (typically > 0.3-0.4)
            mouth_is_open = mouth_open_ratio > 0.35
            
            return float(mouth_open_ratio), mouth_is_open
            
        except Exception as e:
            print(f"Error calculating mouth metrics: {e}")
            return 0.0, False
    
    def _calculate_stress_level(self, landmarks, frame_shape: tuple) -> float:
        """Calculate stress level from brow landmarks."""
        try:
            h, w = frame_shape[:2]
            
            # Brow landmarks (simplified)
            # Left brow: landmarks 70, 63
            # Right brow: landmarks 300, 293
            
            left_brow_inner = landmarks.landmark[70]
            left_brow_outer = landmarks.landmark[63]
            right_brow_inner = landmarks.landmark[300]
            right_brow_outer = landmarks.landmark[293]
            
            # Calculate brow furrow (distance between inner brow points)
            brow_distance = abs(right_brow_inner.x - left_brow_inner.x) * w
            
            # Normalize (typical relaxed distance is ~60-80 pixels at 640px width)
            # Smaller distance = more furrowed = more stress
            normalized_distance = brow_distance / (w * 0.12)
            stress_level = max(0, min(1, 1.5 - normalized_distance))
            
            return float(stress_level)
            
        except Exception as e:
            print(f"Error calculating stress: {e}")
            return 0.0
    
    def _determine_emotion(self, mouth_is_open: bool, stress_level: float) -> str:
        """Determine basic emotion from face metrics."""
        if stress_level > 0.6:
            return "stressed"
        elif stress_level > 0.3:
            return "focused"
        elif mouth_is_open:
            return "engaged"
        else:
            return "calm"


# Global instance
face_analyzer = FaceAnalyzer()
