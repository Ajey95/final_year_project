# SpeakEasy ASD - Project Summary

## 📌 Project Overview

**Project Name**: SpeakEasy ASD  
**Full Title**: AI-Powered, Gamified Speech Therapy Platform for Children with Autism Spectrum Disorder  
**Institution**: Amrita Vishwa Vidyapeetham, Coimbatore  
**Team**: Team 96  
**Guide**: Dr. Venkataraman D (Associate Professor, School of Computing)

## 🎯 Problem Statement

Children with Autism Spectrum Disorder (ASD) often face challenges with speech and pronunciation, requiring consistent speech therapy. However:
- Traditional therapy is expensive and requires in-person sessions
- Lack of engagement leads to poor practice adherence
- Limited availability of Tamil language speech therapy resources
- No objective, real-time feedback mechanism for parents

## 💡 Our Solution

SpeakEasy ASD is a web-based platform that provides:
1. **AI-Powered Evaluation**: Real-time speech and face analysis
2. **Gamification**: Star rewards and progress tracking
3. **Cultural Relevance**: Tamil language lessons (letters and words)
4. **Privacy-First**: No data sharing, local processing where possible
5. **Accessibility**: Web-based, works on any device with camera/mic

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────┐
│                   FRONTEND (React)                   │
│  ┌──────────────────────────────────────────────┐  │
│  │  Landing Page → Authentication → Dashboard    │  │
│  │             ↓                                  │  │
│  │       Therapy Session (5 Slides)              │  │
│  │  Picture → Animation → Evaluation → Candle    │  │
│  │                   → Rewards                    │  │
│  └──────────────────────────────────────────────┘  │
│           ↓ REST API / WebSocket                   │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│                  BACKEND (FastAPI)                   │
│  ┌──────────────────────────────────────────────┐  │
│  │  Auth Router  │  Therapy Router  │  Admin    │  │
│  │  Evaluation   │  Progress        │  Contact  │  │
│  └──────────────────────────────────────────────┘  │
│           ↓                                         │
│  ┌──────────────────────────────────────────────┐  │
│  │            ML Services Layer                  │  │
│  │  • Speech Evaluator (Wav2Vec2 + MFCC)        │  │
│  │  • Face Analyzer (MediaPipe)                 │  │
│  │  • Reward Engine (Star calculation)          │  │
│  └──────────────────────────────────────────────┘  │
│           ↓                                         │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│              DATABASE (MongoDB)                      │
│  Collections: users, sessions, evaluations,         │
│               progress, contacts                     │
└─────────────────────────────────────────────────────┘
```

## 🔬 Key Technologies

### Machine Learning
- **Wav2Vec2**: Pre-trained speech recognition model from Facebook AI
- **MediaPipe Face Mesh**: 468 facial landmark detection
- **MFCC**: Mel-Frequency Cepstral Coefficients for audio feature extraction
- **Librosa**: Audio analysis library

### Backend
- **FastAPI**: Modern async Python web framework
- **Motor**: Async MongoDB driver
- **PyTorch**: Deep learning framework
- **bcrypt**: Password hashing

### Frontend
- **React 18**: UI library with hooks
- **Vite**: Next-generation frontend tooling
- **TailwindCSS**: Utility-first CSS framework
- **Three.js**: 3D graphics (candle simulation)
- **Framer Motion**: Animation library
- **Zustand**: Lightweight state management

## 📊 Features Breakdown

### 1. User Authentication
- Parent registration with child details
- Secure JWT authentication (HTTP-only cookies)
- Admin panel access control

### 2. 6 Progressive Lessons
| ID | Symbol | Pronunciation | Type   | Difficulty |
|----|--------|---------------|--------|------------|
| 1  | அ      | A             | Letter | ⭐         |
| 2  | ஆ      | AA            | Letter | ⭐         |
| 3  | ல      | LA            | Letter | ⭐⭐       |
| 4  | த      | TA            | Letter | ⭐⭐       |
| 5  | அம்மா   | AMMA          | Word   | ⭐⭐⭐     |
| 6  | அப்பா   | APPA          | Word   | ⭐⭐⭐     |

### 3. 5-Slide Therapy Flow

**Slide 1: Picture Display**
- Large Tamil symbol + English pronunciation
- Audio playback of correct pronunciation
- Visual memorization

**Slide 2: Animation Guide**
- Animated mouth movements
- Shows proper articulation
- Repeatable playback

**Slide 3: Live Evaluation**
- Real-time camera feed with face mesh overlay
- Microphone recording
- Speech-to-text transcription
- Accuracy scoring (pronunciation match + MFCC similarity)
- Face metrics (mouth opening, stress detection)

**Slide 4: Candle Test** (Words only)
- 3D interactive candle
- Tests breath control and airflow
- Different goals: "amma" keeps candle lit, "appa" blows it out

**Slide 5: Rewards**
- Star calculation (3★ ≥90%, 2★ ≥70%, 1★ ≥50%)
- Confetti animation
- Sound effects
- Progress saving to database
- Navigation options

### 4. User Dashboard
- Total stars earned
- Sessions completed
- Average accuracy
- Progress chart (Recharts line graph)
- Lesson grid with completion status

### 5. Admin Dashboard
- User management (view, delete)
- Platform statistics
- Charts: sessions over time, accuracy by lesson
- CSV export

## 🧮 Evaluation Algorithm

### Speech Accuracy Score
```
1. Audio Recording → WAV file
2. Wav2Vec2 → Recognized text
3. Compare with expected text using Levenshtein distance
4. Extract MFCC features from audio
5. Compare MFCC with reference templates
6. Final Score = (pronunciation_match * 0.6) + (mfcc_similarity * 0.4)
```

### Face Metrics
```
1. Video frame → MediaPipe Face Mesh
2. Extract 468 facial landmarks
3. Calculate mouth_open_ratio = distance(upper_lip, lower_lip) / mouth_width
4. Calculate stress_level = brow_displacement / baseline
5. Send real-time metrics to frontend via WebSocket
```

### Airflow Detection (Candle Test)
```
1. Audio recording during test
2. Calculate energy = RMS amplitude
3. Calculate zero_crossing_rate
4. Airflow score = (energy * 0.7) + (zcr * 0.3)
5. Score > 0.6 → Candle extinguished
```

### Star Calculation
```
if accuracy ≥ 90% → 3 stars
elif accuracy ≥ 70% → 2 stars
elif accuracy ≥ 50% → 1 star
else → 0 stars
```

## 📈 Impact & Benefits

### For Children
- Engaging, game-like experience
- Immediate feedback
- Progress visualization
- Cultural relevance (native language)

### For Parents
- Objective progress tracking
- Convenient home-based therapy
- Cost-effective compared to traditional therapy
- Detailed performance analytics

### For Therapists
- Scalable solution for multiple patients
- Data-driven insights
- Standardized evaluation metrics
- Remote monitoring capability

## 🔒 Privacy & Security

1. **JWT Authentication**: HTTP-only cookies prevent XSS attacks
2. **Password Hashing**: bcrypt with 10 rounds
3. **Local Processing**: Face/speech analysis done in browser where possible
4. **No Data Sharing**: All data stored locally in MongoDB
5. **CORS Protection**: Restricted origins
6. **Input Validation**: Pydantic schemas prevent injection

## 📊 Database Schema

### Users Collection
```javascript
{
  email: String (unique, indexed),
  password: String (hashed),
  full_name: String,
  child_name: String,
  child_age: Number,
  is_admin: Boolean,
  total_stars: Number,
  total_sessions: Number,
  created_at: DateTime
}
```

### Progress Collection
```javascript
{
  user_email: String (indexed),
  lesson_id: Number (indexed),
  attempts: Number,
  best_accuracy: Number,
  stars_best: Number,
  completed: Boolean,
  last_attempt: DateTime
}
```

## 🌍 Alignment with SDGs

- **SDG 3 (Good Health and Well-being)**: Improves speech therapy accessibility
- **SDG 4 (Quality Education)**: Provides educational tools for children with special needs
- **SDG 10 (Reduced Inequalities)**: Makes therapy accessible regardless of location/income

## 🚀 Future Enhancements

1. **More Languages**: Expand to Hindi, Telugu, Malayalam
2. **More Lessons**: Full alphabet + common words/phrases
3. **Parent Portal**: Detailed analytics and progress reports
4. **Therapist Dashboard**: Multi-patient management
5. **Mobile Apps**: Native iOS/Android apps
6. **Offline Mode**: PWA with service workers
7. **Advanced ML**: Fine-tuned models for ASD-specific speech patterns
8. **Social Features**: Safe community for parents
9. **Integration**: Connect with healthcare providers
10. **Research**: Anonymized data for ASD research (with consent)

## 📚 Research Foundation

This project is based on evidence-based approaches:
- Visual supports for ASD learning
- Immediate reinforcement through gamification
- Multimodal feedback (audio + visual)
- Repetition and consistency
- Cultural and linguistic relevance

## 👥 Team Contributions

| Member            | Role                 | Key Contributions                          |
|-------------------|----------------------|--------------------------------------------|
| Raju Mishra       | Backend Developer    | FastAPI, ML integration, authentication    |
| Chandra Prakash   | Frontend Developer   | React components, UI/UX implementation     |
| Kiran Kumar       | ML Engineer          | Wav2Vec2 integration, MFCC analysis        |
| Aditya Sharma     | UI/UX Designer       | Design system, user flow, wireframes       |
| Priya Nair        | Database Architect   | MongoDB schema, optimization, queries      |

**Project Guide**: Dr. Venkataraman D (d_venkat@cb.amrita.edu)

## 📞 Contact & Support

**Project Repository**: [GitHub Link]  
**Demo Video**: [YouTube Link]  
**Documentation**: See README.md  
**Email**: rajuchaswik@gmail.com  
**Institution**: Amrita Vishwa Vidyapeetham

## 🎓 Academic Context

**Course**: CSE3002 - Final Year Project  
**Department**: School of Computing  
**Academic Year**: 2025-2026  
**Project Duration**: 6 months (Aug 2025 - Jan 2026)

## 📝 Deliverables Completed

- ✅ Complete source code (Backend + Frontend)
- ✅ Documentation (README, SETUP guides, QUICKSTART)
- ✅ Database schema and sample data
- ✅ ML model integration
- ✅ User guide and tutorials
- ✅ LaTeX project report
- ✅ Presentation slides
- ✅ Demo video

## 🏆 Achievements

- Fully functional web application
- Real-time ML integration
- Gamified user experience
- Production-ready code quality
- Comprehensive documentation
- Scalable architecture

---

**"Every voice matters. Every sound is progress."** 🌟

Built with ❤️ by Team 96 for children with ASD.
