# SpeakEasy ASD - Complete File Structure

Generated: 2026-01-18

This document provides a complete overview of all files in the SpeakEasy ASD project.

## 📁 Project Root

```
final_year_project/
├── README.md                    # Main project documentation
├── QUICKSTART.md               # Quick setup guide (5 minutes)
├── PROJECT_SUMMARY.md          # Comprehensive project overview
├── report.tex                  # LaTeX project report
├── backend/                    # FastAPI backend
└── frontend/                   # React frontend
```

---

## 🔧 Backend Structure (FastAPI + Python)

### Root Files
```
backend/
├── requirements.txt            # Python dependencies (21 packages)
├── .env                        # Environment configuration
├── SETUP.md                    # Detailed backend setup guide
└── app/                        # Application code
```

### Core Application
```
backend/app/
├── main.py                     # FastAPI app entry point
│   - CORS middleware configuration
│   - Router registration
│   - MongoDB lifecycle (connect/disconnect)
│   - Admin user seeding on startup
│
├── config.py                   # Settings & environment variables
│   - Pydantic Settings class
│   - MongoDB URI, SECRET_KEY, etc.
│
└── database.py                 # MongoDB connection
    - Motor async client
    - Database instance
    - Collection references
```

### Data Models (Pydantic v2 Schemas)
```
backend/app/models/
├── user.py                     # User schemas
│   - UserRegistration
│   - UserLogin
│   - UserResponse
│   - AdminLogin
│
├── session.py                  # Session schemas
│   - SessionCreate
│   - SessionResponse
│
└── evaluation.py               # Evaluation schemas
    - EvaluationRequest
    - EvaluationResponse
    - FaceMetrics
```

### ML Services
```
backend/app/services/
├── speech_evaluator.py         # Speech analysis service
│   - Wav2Vec2ForCTC model loading
│   - MFCC extraction and comparison
│   - Phoneme matching
│   - evaluate_pronunciation() method
│   - Reference MFCC templates for Tamil letters
│   - Feedback generation with tips
│
├── face_analyzer.py            # Face detection service
│   - MediaPipe Face Mesh initialization
│   - analyze_frame() processes JPEG bytes
│   - Mouth metrics (open ratio)
│   - Stress detection from brow landmarks
│
└── reward_engine.py            # Reward calculation
    - calculate_stars() (3★, 2★, 1★ thresholds)
    - Motivational message generation
```

### API Routers
```
backend/app/routers/
├── auth.py                     # Authentication endpoints
│   POST /auth/register         - User registration
│   POST /auth/login            - User login
│   POST /auth/admin/login      - Admin login
│   POST /auth/logout           - Logout (clear cookie)
│
├── therapy.py                  # Lesson data endpoints
│   GET /therapy/lessons        - List all 6 lessons
│   GET /therapy/lesson/{id}    - Get specific lesson
│
├── evaluation.py               # Evaluation endpoints
│   POST /evaluation/speech     - Submit audio for evaluation
│   WebSocket /evaluation/face  - Real-time face analysis
│
├── progress.py                 # Progress tracking
│   POST /progress/save         - Save user progress
│   GET /progress/summary/{email} - Get progress summary
│
├── admin.py                    # Admin endpoints
│   GET /admin/stats            - Platform statistics
│   GET /admin/users            - User list (paginated)
│   DELETE /admin/user/{id}     - Delete user
│   GET /admin/export-csv       - Export users CSV
│
└── contact.py                  # Contact form
    POST /contact               - Submit contact message
```

### Utilities
```
backend/app/utils/
├── jwt_handler.py              # JWT token management
│   - create_access_token()
│   - verify_token()
│   - 30 minute expiry
│
└── audio_utils.py              # Audio processing utilities
    - extract_mfcc()
    - calculate_airflow_score()
    - Energy and zero-crossing rate
```

---

## 🎨 Frontend Structure (React + Vite)

### Root Files
```
frontend/
├── package.json                # npm dependencies (31 packages)
├── vite.config.js              # Vite configuration + proxy
├── tailwind.config.js          # TailwindCSS custom theme
├── postcss.config.js           # PostCSS plugins
├── index.html                  # HTML entry point
├── SETUP.md                    # Frontend setup guide
└── src/                        # Source code
```

### Core Application
```
frontend/src/
├── main.jsx                    # React entry point
│   - ReactDOM.createRoot()
│   - QueryClientProvider
│   - Toaster for notifications
│
├── App.jsx                     # Router configuration
│   - BrowserRouter
│   - Protected routes
│   - Admin routes
│
└── index.css                   # Global styles
    - TailwindCSS imports
    - Custom animations
    - Tamil font styles
```

### Pages (Route Components)
```
frontend/src/pages/
├── LandingPage.jsx             # Marketing landing page (1000+ lines)
│   - Navbar with smooth scroll
│   - Hero section with particles
│   - Features section (6 cards)
│   - How It Works (4 steps)
│   - About section (team + guide)
│   - Contact form
│   - Footer with SDG badges
│   - Modal integrations
│
├── TherapyPage.jsx             # Therapy session wrapper
│   - Loads lesson by ID from API
│   - Passes to SlideManager
│   - Loading states
│   - Error handling
│
├── UserDashboard.jsx           # User progress dashboard
│   - Sidebar with user info
│   - Stats cards (stars, sessions, accuracy)
│   - Progress chart (Recharts)
│   - Lesson grid (6 lessons with status)
│   - Motivational quote
│
├── AdminPage.jsx               # Admin management panel
│   - Overview stats cards
│   - Charts (sessions over time, accuracy by lesson)
│   - User management table
│   - Search and pagination
│   - CSV export
│   - Delete user functionality
│
└── NotFound.jsx                # 404 error page
    - Animated emoji
    - Home button
```

### Components

#### Authentication
```
frontend/src/components/auth/
├── LoginModal.jsx              # User login form
│   - React Hook Form + Zod validation
│   - Email and password fields
│   - Error handling
│   - Remember me checkbox
│
├── RegisterModal.jsx           # User registration form
│   - Multi-step form (parent + child info)
│   - Validation rules
│   - Password strength indicator
│
└── AdminLoginModal.jsx         # Admin login form
    - Separate admin credentials
    - Admin-specific styling
```

#### Landing Page
```
frontend/src/components/landing/
├── Navbar.jsx                  # Sticky navigation bar
│   - Logo
│   - Smooth scroll links
│   - Auth buttons
│   - Scroll effect (shadow on scroll)
│
└── HeroSection.jsx             # Hero section component
    - Animated headline
    - CTA buttons
    - Particle background
    - Framer Motion animations
```

#### Therapy System
```
frontend/src/components/therapy/
├── SlideManager.jsx            # Slide navigation controller
│   - Progress bar (slide 1-5)
│   - Next/Previous navigation
│   - Slide component switching
│   - Exit confirmation
│
├── Slide1_Picture.jsx          # Letter/Word display
│   - Large Tamil symbol
│   - English pronunciation
│   - Audio playback button
│   - Image with fallback
│
├── Slide2_Animation.jsx        # Mouth animation guide
│   - Animated GIF or SVG
│   - Replay button
│   - Instruction text
│
├── Slide3_Evaluation.jsx       # Live evaluation (500+ lines)
│   - Video preview with face mesh
│   - Canvas overlay for landmarks
│   - Audio recording
│   - Real-time metrics display
│   - Evaluation submission
│   - Results display
│
├── Slide4_CandleTest.jsx       # Candle blow test
│   - 3D candle scene integration
│   - Airflow simulation
│   - Progress indicator
│   - Success/failure feedback
│   - Different goals (amma vs appa)
│
└── Slide5_Rewards.jsx          # Star rewards and celebration
    - Star calculation and display
    - Animated stars with spring
    - Confetti animation (2+ stars)
    - Sound effects
    - Score summary card
    - Progress saving
    - Navigation options (try again, next, dashboard)
```

#### 3D Graphics
```
frontend/src/components/three/
└── CandleScene.jsx             # Three.js 3D candle
    - Candle body (cylinder)
    - Animated flame (cone + point light)
    - Flame flickering animation
    - Airflow-based bending
    - Extinguish animation
    - Smoke particles
```

### State Management (Zustand)
```
frontend/src/store/
├── authStore.js                # Authentication state
│   - user (current user object)
│   - isAuthenticated (boolean)
│   - login(user) action
│   - logout() action
│
└── therapyStore.js             # Therapy session state
    - currentLesson (lesson object)
    - currentSlide (1-5)
    - sessionScores (array)
    - setCurrentLesson() action
    - setCurrentSlide() action
    - addScore() action
```

### API Services
```
frontend/src/services/
└── api.js                      # Axios API client (500+ lines)
    - Base Axios instance with credentials
    - Interceptors
    
    API endpoints:
    - authAPI.register()
    - authAPI.login()
    - authAPI.adminLogin()
    - authAPI.logout()
    - therapyAPI.getLessons()
    - therapyAPI.getLesson(id)
    - evaluationAPI.evaluateSpeech()
    - evaluationAPI.connectFaceWS()
    - progressAPI.saveProgress()
    - progressAPI.getProgressSummary()
    - adminAPI.getStats()
    - adminAPI.getUsers()
    - adminAPI.deleteUser()
    - adminAPI.exportCSV()
    - contactAPI.submitContact()
```

### Custom Hooks
```
frontend/src/hooks/
├── useAudioRecorder.js         # Audio recording hook
│   - startRecording(language)
│   - stopRecording()
│   - MediaRecorder API
│   - SpeechRecognition API
│   - Returns: { isRecording, audioBlob, transcript }
│
├── useFaceDetection.js         # Face detection hook
│   - MediaPipe Face Mesh integration
│   - startDetection(videoRef, canvasRef)
│   - stopDetection()
│   - Returns: { isDetecting, landmarks, metrics }
│
└── useWebSocket.js             # WebSocket connection hook
    - connect(url, onMessage)
    - disconnect()
    - send(data)
    - Returns: { isConnected, lastMessage }
```

### Assets Structure
```
frontend/public/assets/
├── README.md                   # Asset documentation
├── letters/                    # Tamil letter images
│   └── (a.png, aa.png, la.png, ta.png)
├── words/                      # Word images
│   └── (amma.png, appa.png)
├── animations/                 # Mouth animation GIFs
│   └── (*_mouth.gif files)
├── sounds/                     # Audio files
│   ├── letters/
│   ├── words/
│   └── (sound effects)
└── 3d/                         # 3D models
    └── (candle.glb)

Note: All components include fallback mechanisms for missing assets
```

---

## 📊 Database Collections (MongoDB)

### users
```javascript
{
  _id: ObjectId (auto),
  email: String (unique, indexed),
  password: String (bcrypt hashed),
  full_name: String,
  child_name: String,
  child_age: Number,
  is_admin: Boolean (default: false),
  total_stars: Number (default: 0),
  total_sessions: Number (default: 0),
  created_at: DateTime (default: now)
}

Indexes: email_1 (unique)
```

### sessions
```javascript
{
  _id: ObjectId (auto),
  user_email: String (indexed),
  lesson_id: Number (1-6),
  lesson_type: String ("letter" | "word"),
  lesson_symbol: String (Tamil letter/word),
  started_at: DateTime,
  completed_at: DateTime,
  stars_earned: Number (0-3)
}

Indexes: user_email_1, lesson_id_1
```

### evaluations
```javascript
{
  _id: ObjectId (auto),
  session_id: ObjectId (reference to sessions),
  user_email: String (indexed),
  lesson_id: Number,
  audio_path: String,
  recognized_text: String,
  expected_text: String,
  accuracy_score: Number (0-100),
  pronunciation_match: Number (0-100),
  mfcc_similarity: Number (0-100),
  mouth_metrics: {
    mouth_open_ratio: Number,
    avg_mouth_open: Number,
    frame_count: Number
  },
  stress_level: Number (0-10),
  feedback: String,
  tips: [String],
  timestamp: DateTime
}

Indexes: user_email_1, lesson_id_1, session_id_1
```

### progress
```javascript
{
  _id: ObjectId (auto),
  user_email: String (indexed),
  lesson_id: Number (indexed),
  attempts: Number (default: 0),
  best_accuracy: Number (0-100),
  stars_best: Number (0-3),
  completed: Boolean (default: false),
  last_attempt: DateTime
}

Indexes: user_email_1_lesson_id_1 (compound unique)
```

### contacts
```javascript
{
  _id: ObjectId (auto),
  name: String,
  email: String,
  message: String,
  submitted_at: DateTime (default: now)
}

Indexes: email_1
```

---

## 🔑 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=speakeasy_asd
SECRET_KEY=<32+ character secret>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ADMIN_EMAIL=rajuchaswik@gmail.com
ADMIN_PASSWORD=Raju@2006
```

### Frontend (Optional .env)
```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## 📦 Dependencies

### Backend (requirements.txt)
```
fastapi==0.109.0
uvicorn[standard]==0.27.0
motor==3.3.2
pydantic==2.5.3
pydantic-settings==2.1.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
transformers==4.36.2
torch==2.1.2
torchaudio==2.1.2
librosa==0.10.1
mediapipe==0.10.9
opencv-python==4.9.0.80
numpy==1.26.3
scipy==1.11.4
python-dotenv==1.0.0
aiofiles==23.2.1
pandas==2.1.4
websockets==12.0
```

### Frontend (package.json)
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.21.1",
  "vite": "^5.0.8",
  "tailwindcss": "^3.4.0",
  "framer-motion": "^10.18.0",
  "three": "^0.160.0",
  "@react-three/fiber": "^8.15.13",
  "@react-three/drei": "^9.93.0",
  "zustand": "^4.4.7",
  "@tanstack/react-query": "^5.17.9",
  "axios": "^1.6.5",
  "react-hook-form": "^7.49.3",
  "zod": "^3.22.4",
  "recharts": "^2.10.3",
  "react-hot-toast": "^2.4.1",
  "howler": "^2.2.4",
  "react-confetti": "^6.1.0",
  "lucide-react": "^0.307.0"
}
```

---

## 🎯 Key Algorithms

### 1. Speech Evaluation (speech_evaluator.py)
```python
def evaluate_pronunciation(audio_bytes, expected_text):
    # 1. Load Wav2Vec2 model
    # 2. Process audio → recognized_text
    # 3. Calculate Levenshtein distance
    # 4. Extract MFCC features
    # 5. Compare with reference MFCC
    # 6. Calculate final score
    # 7. Generate feedback
    return {
        accuracy, pronunciation_match, 
        mfcc_similarity, feedback, tips
    }
```

### 2. Face Analysis (face_analyzer.py)
```python
def analyze_frame(jpeg_bytes):
    # 1. Decode JPEG to numpy array
    # 2. Process with MediaPipe
    # 3. Extract 468 landmarks
    # 4. Calculate mouth_open_ratio
    # 5. Calculate stress_level
    return {
        landmarks, mouth_open_ratio, stress_level
    }
```

### 3. Star Calculation (reward_engine.py)
```python
def calculate_stars(accuracy):
    if accuracy >= 90: return 3
    elif accuracy >= 70: return 2
    elif accuracy >= 50: return 1
    else: return 0
```

---

## 🔐 Security Features

1. **Password Hashing**: bcrypt (10 rounds)
2. **JWT Tokens**: HTTP-only cookies, 30min expiry
3. **CORS**: Restricted origins
4. **Input Validation**: Pydantic schemas
5. **MongoDB Injection Prevention**: Parameterized queries
6. **XSS Protection**: HTTP-only cookies
7. **CSRF Protection**: SameSite cookie attribute

---

## 📄 Documentation Files

- README.md - Main documentation
- QUICKSTART.md - 5-minute setup guide
- PROJECT_SUMMARY.md - Comprehensive overview
- backend/SETUP.md - Backend setup details
- frontend/SETUP.md - Frontend setup details
- frontend/public/assets/README.md - Asset guide
- FILE_STRUCTURE.md - This file!

---

## 🎓 Academic Deliverables

- [x] Source code (Backend + Frontend)
- [x] Database schema
- [x] ML model integration
- [x] Documentation
- [x] Setup guides
- [x] LaTeX report (report.tex)
- [ ] Presentation slides (TODO)
- [ ] Demo video (TODO)

---

## 📞 Contact

**Team 96**  
**Institution**: Amrita Vishwa Vidyapeetham  
**Guide**: Dr. Venkataraman D  
**Lead**: Raju Mishra (rajuchaswik@gmail.com)

---

**Last Updated**: 2026-01-18  
**Project Status**: ✅ Complete and ready for demo

**"Every voice matters. Every sound is progress."** 🌟
