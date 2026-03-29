# Testing Speech Evaluation System

## Quick Test Guide

### 1. Check Backend is Running

Open your backend terminal and look for:
```
✅ Wav2Vec2 model loaded successfully: facebook/wav2vec2-base-960h
```

OR (if model not available):
```
⚠️ Transformers library not available
   Using fallback MFCC-based evaluation
```

### 2. Test the Flow

1. **Login** to the application
2. **Click on letter "அ" (A)**
3. **Navigate to Slide 3** (evaluation screen)
4. **Click "Start Recording"**
5. **Say "A" or "AH" sound clearly**
6. **Click "Stop Recording"**
7. **Click "Evaluate"**

### 3. What You Should See

#### In the UI (Right Panel):
```
🎤 What We Heard:
┌─────────────────────────┐
│ Target Sound:           │
│ அ (A)                   │
└─────────────────────────┘

┌─────────────────────────┐
│ You Said:               │
│ "ah" or "a"             │
└─────────────────────────┘

┌─────────────────────────┐
│ ✓ Match Found!          │
│ We detected "a" sound   │
└─────────────────────────┘

Overall Accuracy: 75%
```

#### In Backend Terminal:
```
============================================================
🎯 NEW EVALUATION REQUEST
   User: your@email.com
   Target: a
   Lesson: 1
============================================================
📦 Audio received: 45678 bytes

🎯 Evaluating pronunciation for: a
📊 User MFCC extracted: shape (13,)
📚 Reference MFCC loaded for: a
✅ MFCC Similarity Score: 72.45/100
💨 Airflow Score: 0.65
🎤 Raw transcription: 'ah'
   ✅ Phoneme match found: 'a' in 'ah'
🎤 Transcription: 'ah' | Match: True
🎯 Final Accuracy: 78.23%

============================================================
✅ EVALUATION COMPLETE
   Transcription: 'ah'
   Phoneme Match: True
   Accuracy: 78.23%
   MFCC Score: 72.45
============================================================
```

#### In Browser Console:
```
📤 Submitting audio for evaluation...
🎯 Target phoneme: a
✅ Evaluation result: {accuracy: 78.23, phoneme_match: true, ...}
🎤 Transcription: "ah"
🎯 Phoneme match: YES ✓
📊 Accuracy: 78.23%
```

### 4. Common Issues

#### Issue: "No speech detected"
- **Cause**: Audio too short or silent
- **Fix**: Speak louder and hold the sound for 1-2 seconds

#### Issue: Transcription shows "(no speech detected)"
- **Cause**: Model couldn't process audio
- **Fix**: 
  - Check microphone permissions
  - Speak more clearly
  - Check backend terminal for errors

#### Issue: Low accuracy (< 50%)
- **Cause**: Audio quality or pronunciation
- **Fix**:
  - Speak directly into microphone
  - Reduce background noise
  - Pronounce clearly

#### Issue: Phoneme match shows "Not Quite Right"
- **Cause**: Wrong sound detected
- **Fix**:
  - Listen to the training video/audio again
  - Match the mouth position shown
  - Try recording again

### 5. Model Status Check

Run this in backend terminal:
```python
python -c "from transformers import Wav2Vec2Processor; print('✅ Transformers installed')"
```

Expected output:
```
✅ Transformers installed
```

If you see error:
```bash
pip install transformers torch torchaudio
```

### 6. Debug Mode

Enable detailed logging by checking:
- ✅ Frontend console (F12)
- ✅ Backend terminal output
- ✅ Network tab (see API responses)

### 7. Expected Behavior

| Pronunciation | Transcription | Match | Accuracy |
|--------------|---------------|-------|----------|
| "ah" (correct) | "ah" or "a" | ✓ | 70-90% |
| "aa" (close) | "aa" or "ah" | ✓ | 65-85% |
| "oh" (wrong) | "oh" | ✗ | 50-60% |
| Silent | "(no speech)" | ✗ | 50% |

### 8. Success Criteria

✅ Transcription appears in UI  
✅ Match status shown clearly  
✅ Accuracy score displayed  
✅ Feedback message appropriate  
✅ Backend logs show full flow  
✅ Can try again after evaluation

The system is working if you see ALL of these elements!
