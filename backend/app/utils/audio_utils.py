"""Audio processing utilities."""
import librosa
import numpy as np
from scipy.io import wavfile
import io


def extract_mfcc(audio_bytes: bytes, sr: int = 16000, n_mfcc: int = 13) -> np.ndarray:
    """Extract MFCC features from audio."""
    try:
        # Load audio from bytes
        audio_io = io.BytesIO(audio_bytes)
        y, sr = librosa.load(audio_io, sr=sr)
        
        # Extract MFCC
        mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc)
        mfcc_mean = np.mean(mfcc, axis=1)
        
        return mfcc_mean
    except Exception as e:
        print(f"Error extracting MFCC: {e}")
        return np.zeros(n_mfcc)


def calculate_airflow_score(audio_bytes: bytes, sr: int = 16000) -> float:
    """Calculate airflow score from audio energy and zero-crossing rate."""
    try:
        audio_io = io.BytesIO(audio_bytes)
        y, sr = librosa.load(audio_io, sr=sr)
        
        # Calculate energy
        energy = np.sum(y ** 2) / len(y)
        
        # Calculate zero-crossing rate
        zcr = librosa.feature.zero_crossing_rate(y)[0]
        zcr_mean = np.mean(zcr)
        
        # Normalize to 0-1 range
        # High energy + high ZCR = strong airflow (plosives like "pa")
        # Low energy + low ZCR = weak airflow (nasals like "ma")
        airflow_score = min(1.0, (energy * 1000 + zcr_mean) / 2)
        
        return float(airflow_score)
    except Exception as e:
        print(f"Error calculating airflow: {e}")
        return 0.5


def calculate_audio_similarity(mfcc1: np.ndarray, mfcc2: np.ndarray) -> float:
    """
    Calculate similarity between two MFCC vectors.
    
    Uses a lenient similarity metric suitable for child speech evaluation.
    Returns score from 0-100.
    """
    try:
        # Normalize vectors
        mfcc1_norm = mfcc1 / (np.linalg.norm(mfcc1) + 1e-8)
        mfcc2_norm = mfcc2 / (np.linalg.norm(mfcc2) + 1e-8)
        
        # Calculate cosine similarity (-1 to 1)
        cosine_sim = np.dot(mfcc1_norm, mfcc2_norm)
        
        # Calculate Euclidean distance (normalized)
        euclidean_dist = np.linalg.norm(mfcc1_norm - mfcc2_norm)
        euclidean_sim = 1 / (1 + euclidean_dist)  # Convert distance to similarity
        
        # Combine both metrics (weighted average)
        # More emphasis on cosine similarity
        combined_sim = (cosine_sim * 0.7 + euclidean_sim * 0.3)
        
        # Convert to 0-100 scale with lenient transformation
        # Map -1,1 range to 0,100 but with bias towards higher scores
        # -1 -> 30, 0 -> 65, 1 -> 100
        if combined_sim >= 0:
            score = 65 + (combined_sim * 35)
        else:
            score = 65 + (combined_sim * 35)
        
        # Additional boost for reasonable similarity
        # If score is above 50, boost it
        if score >= 50:
            score = 50 + ((score - 50) * 1.3)
        
        # Clamp to 0-100
        score = max(0, min(100, score))
        
        return float(score)
        
    except Exception as e:
        print(f"Error calculating similarity: {e}")
        # Return neutral score on error
        return 60.0
