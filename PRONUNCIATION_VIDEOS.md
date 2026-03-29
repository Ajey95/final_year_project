# Pronunciation Video Setup

## 📹 Video Requirements

Place pronunciation demonstration videos in: `frontend/public/assets/videos/`

## Required Videos

Create high-quality pronunciation videos showing proper mouth movements and sounds:

### For Letter 'அ' (A):
- **File**: `pronunciation_a.mp4`
- **Duration**: 3-5 seconds
- **Content**: Close-up of mouth clearly pronouncing "ah" sound
- **Audio**: Clear "அ" pronunciation

### For Letter 'ஆ' (AA):
- **File**: `pronunciation_aa.mp4`
- **Duration**: 3-5 seconds
- **Content**: Sustained "aah" sound with mouth open
- **Audio**: Clear "ஆ" pronunciation

### For Letter 'ல' (LA):
- **File**: `pronunciation_la.mp4`
- **Duration**: 3-5 seconds
- **Content**: Tongue touching roof of mouth for "la" sound
- **Audio**: Clear "ல" pronunciation

### For Letter 'த' (TA):
- **File**: pronunciation_ta.mp4`
- **Duration**: 3-5 seconds
- **Content**: Tongue behind teeth for "ta" sound
- **Audio**: Clear "த" pronunciation

### For Word 'அம்மா' (AMMA):
- **File**: `pronunciation_amma.mp4`
- **Duration**: 4-6 seconds
- **Content**: Demonstrating "ah-mm-aa" with lips closing for 'mm'
- **Audio**: Clear "அம்மா" pronunciation

### For Word 'அப்பா' (APPA):
- **File**: `pronunciation_appa.mp4`
- **Duration**: 4-6 seconds
- **Content**: Demonstrating "ah-pp-aa" with strong plosive 'p'
- **Audio**: Clear "அப்பா" pronunciation

## Video Specifications

- **Format**: MP4 (H.264 codec)
- **Resolution**: 720p (1280x720) or 1080p (1920x1080)
- **FPS**: 30fps minimum
- **Audio**: AAC codec, 44.1kHz, clear pronunciation
- **Lighting**: Good lighting to clearly see mouth movements
- **Background**: Clean, non-distracting background
- **Focus**: Close-up on mouth/lower face area

## How to Create Videos

### Option 1: Record Yourself
1. Use a smartphone or camera
2. Position camera at face level
3. Zoom in on mouth area
4. Record pronouncing each sound clearly
5. Convert to MP4 if needed

### Option 2: Use a Speech Therapist
1. Record a professional therapist
2. Get clear, demonstration-quality pronunciations
3. Edit to 3-5 second clips

### Option 3: AI Generation (Future)
- Use text-to-speech with video generation
- Sync audio with mouth animations

## Testing Videos

1. Place video files in `frontend/public/assets/videos/`
2. Restart frontend (npm run dev)
3. Navigate to any lesson
4. On Slide 2, you should see "HD Training Video Available" badge
5. Click "Play Video" to test

## Fallback Behavior

If videos are not available:
- ✅ System automatically falls back to animated GIFs
- ✅ Audio-only playback continues to work
- ⚠️ User sees notification: "Video not available"

## Current Status

```
frontend/public/assets/videos/
├── pronunciation_a.mp4      ❌ Not yet added
├── pronunciation_aa.mp4     ❌ Not yet added  
├── pronunciation_la.mp4     ❌ Not yet added
├── pronunciation_ta.mp4     ❌ Not yet added
├── pronunciation_amma.mp4   ❌ Not yet added
└── pronunciation_appa.mp4   ❌ Not yet added
```

## Next Steps

1. **Record or source videos** for each phoneme
2. **Convert to MP4** format if needed
3. **Place in correct folder**: `frontend/public/assets/videos/`
4. **Test each video** by navigating to its lesson
5. **Verify audio quality** and mouth movements

The system is **ready to use videos** - just add the MP4 files!
