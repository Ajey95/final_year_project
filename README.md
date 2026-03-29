# SpeakEasy ASD 🗣️✨

**AI-Powered, Gamified Speech Therapy Platform for Children with Autism Spectrum Disorder**

SpeakEasy ASD is a cutting-edge web application that combines artificial intelligence, gamification, and evidence-based speech therapy techniques to help children with ASD improve their pronunciation and communication skills in a fun, interactive environment.

---

## 🎯 Features

- **6 Progressive Lessons**: 4 Tamil letters (அ, ஆ, ல, த) + 2 meaningful words (அம்மா, அப்பா)
- **5-Slide Therapy Flow**:
  1. Picture Display with Audio
  2. Mouth Animation Guide
  3. Live Evaluation (Speech + Face Detection)
  4. Candle Blow Test (for words)
  5. Star Rewards & Progress Saving
- **Real-Time ML Analysis**:
  - Speech evaluation using Wav2Vec2 + MFCC
  - Face mesh analysis with MediaPipe (468 landmarks)
  - Airflow scoring for blowing detection
- **3D Interactive Candle**: Three.js-powered candle simulation
- **Gamification**: Star rewards (3★, 2★, 1★) based on performance
- **Progress Tracking**: Charts, streaks, best scores
- **Admin Dashboard**: User management, analytics, CSV export
- **Privacy-First**: No data sharing, secure JWT authentication

---

## 👥 Team Information

**Team Name**: Team 96  
**Institution**: Amrita Vishwa Vidyapeetham, Coimbatore  
**Project Guide**: Dr. Venkataraman D (Associate Professor, School of Computing)

### Team Members:
1. **Raju Mishra** - Backend Developer (rajuchaswik@gmail.com)
2. **Chandra Prakash** - Frontend Developer
3. **Kiran Kumar** - ML Engineer
4. **Aditya Sharma** - UI/UX Designer
5. **Priya Nair** - Database Architect

---

## 🛠️ Technology Stack

### Backend
- **Framework**: FastAPI (Python 3.11)
- **Database**: MongoDB (Motor async driver)
- **ML Models**:
  - Wav2Vec2 (Speech Recognition)
  - MediaPipe Face Mesh (Face Analysis)
  - Librosa (Audio Processing)
- **Authentication**: JWT with HTTP-only cookies (30min expiry)
- **Password Hashing**: bcrypt

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: TailwindCSS + Framer Motion
- **3D Graphics**: Three.js + React Three Fiber
- **State Management**: Zustand
- **API Client**: React Query + Axios
- **Form Validation**: React Hook Form + Zod
- **Charts**: Recharts
- **Audio**: Howler.js

---

## 📁 Project Structure

```
final_year_project/
├── backend/
│   ├── app/
│   │   ├── main.py                    # FastAPI entry point
│   │   ├── config.py                  # Settings & environment
│   │   ├── database.py                # MongoDB connection
│   │   ├── models/                    # Pydantic schemas
│   │   │   ├── user.py
│   │   │   ├── session.py
│   │   │   └── evaluation.py
│   │   ├── services/                  # ML services
│   │   │   ├── speech_evaluator.py   # Wav2Vec2 speech analysis
│   │   │   ├── face_analyzer.py      # MediaPipe face detection
│   │   │   └── reward_engine.py      # Star calculation
│   │   ├── routers/                   # API endpoints
│   │   │   ├── auth.py
│   │   │   ├── therapy.py
│   │   │   ├── evaluation.py
│   │   │   ├── progress.py
│   │   │   ├── admin.py
│   │   │   └── contact.py
│   │   └── utils/
│   │       ├── jwt_handler.py
│   │       └── audio_utils.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx                   # React entry point
│   │   ├── App.jsx                    # Router configuration
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx        # Marketing page
│   │   │   ├── TherapyPage.jsx        # Therapy session wrapper
│   │   │   ├── UserDashboard.jsx      # User progress dashboard
│   │   │   ├── AdminPage.jsx          # Admin panel
│   │   │   └── NotFound.jsx           # 404 page
│   │   ├── components/
│   │   │   ├── auth/                  # Login, Register, Admin modals
│   │   │   ├── landing/               # Navbar, Hero, Features, etc
│   │   │   ├── therapy/               # 5 slide components + SlideManager
│   │   │   └── three/                 # 3D candle scene
│   │   ├── store/
│   │   │   ├── authStore.js           # Zustand auth state
│   │   │   └── therapyStore.js        # Zustand therapy state
│   │   ├── services/
│   │   │   └── api.js                 # Axios API client
│   │   └── hooks/
│   │       ├── useAudioRecorder.js
│   │       ├── useFaceDetection.js
│   │       └── useWebSocket.js
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── report.tex                         # LaTeX project report
```

---

## 🚀 Installation & Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- MongoDB 6.0+
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd final_year_project
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**Create `.env` file:**
```env
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=speakeasy_asd
SECRET_KEY=your_super_secret_key_change_this_in_production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ADMIN_EMAIL=rajuchaswik@gmail.com
ADMIN_PASSWORD=Raju@2006
```

**Start MongoDB:**
```bash
# Windows:
mongod --dbpath C:\data\db

# Mac:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
```

**Run Backend:**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: `http://localhost:8000`  
API docs at: `http://localhost:8000/docs`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

---

## 🔐 Default Credentials

### Admin Account
- **Email**: rajuchaswik@gmail.com
- **Password**: Raju@2006

### Test User (Create via Register)
- Register from the landing page
- Fill in parent and child details

---

## 📊 Database Collections

### users
```javascript
{
  _id: ObjectId,
  email: String (unique),
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

### sessions
```javascript
{
  _id: ObjectId,
  user_email: String,
  lesson_id: Number,
  lesson_type: String,
  lesson_symbol: String,
  started_at: DateTime,
  completed_at: DateTime,
  stars_earned: Number
}
```

### evaluations
```javascript
{
  _id: ObjectId,
  session_id: ObjectId,
  user_email: String,
  lesson_id: Number,
  audio_path: String,
  accuracy_score: Number,
  pronunciation_match: Number,
  mouth_metrics: Object,
  stress_level: Number,
  feedback: String,
  timestamp: DateTime
}
```

### progress
```javascript
{
  _id: ObjectId,
  user_email: String,
  lesson_id: Number,
  attempts: Number,
  best_accuracy: Number,
  stars_best: Number,
  completed: Boolean,
  last_attempt: DateTime
}
```

---

## 🎓 ML Models & Algorithms

### Speech Evaluation
- **Model**: facebook/wav2vec2-base-960h
- **Features**: MFCC extraction (13 coefficients)
- **Scoring**: Levenshtein distance + MFCC similarity
- **Airflow Detection**: Energy + Zero-crossing rate

### Face Analysis
- **Model**: MediaPipe Face Mesh (468 landmarks)
- **Metrics**:
  - Mouth Open Ratio: Distance between upper/lower lips
  - Stress Level: Brow landmark displacement

---

## 📱 User Flow

1. **Landing Page** → Register/Login
2. **User Dashboard** → View progress, select lesson
3. **Therapy Session**:
   - **Slide 1**: View letter + hear pronunciation
   - **Slide 2**: Watch mouth animation guide
   - **Slide 3**: Practice with live camera + mic evaluation
   - **Slide 4**: (Words only) Blow out candle test
   - **Slide 5**: Receive stars + save progress
4. **Dashboard** → View charts, continue learning

---

## 🎨 Design System

### Colors
- **Coral**: #FF6B6B (Primary actions)
- **Teal**: #4ECDC4 (Success states)
- **Yellow**: #FFE66D (Stars, highlights)
- **Purple**: #A8B5F3 (Admin, premium)

### Typography
- **Headings**: Poppins (Bold)
- **Body**: Poppins (Regular)
- **Tamil**: Noto Sans Tamil

### Animations
- Framer Motion for page transitions
- CSS keyframes for loading states
- React Spring for interactive elements

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest tests/ -v
```

### Frontend Tests
```bash
cd frontend
npm run test
```

---

## 📦 Deployment

### Backend (Production)
```bash
# Install production dependencies
pip install -r requirements.txt

# Run with gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend (Production)
```bash
# Build for production
npm run build

# Preview build
npm run preview

# Deploy 'dist' folder to hosting (Vercel, Netlify, etc.)
```

---

## 🔒 Security Features

- JWT tokens in HTTP-only cookies (prevents XSS)
- Bcrypt password hashing (10 rounds)
- CORS configuration
- Input validation with Pydantic
- MongoDB injection prevention
- Rate limiting on API endpoints

---

## 🌍 SDG Alignment

This project aligns with the following UN Sustainable Development Goals:

- **SDG 3**: Good Health and Well-being
- **SDG 4**: Quality Education
- **SDG 10**: Reduced Inequalities

---

## 📄 License

This project is developed as part of a Final Year Project at Amrita Vishwa Vidyapeetham.  
All rights reserved.

---

## 🤝 Contributing

This is an academic project. For any queries, contact:  
**Project Guide**: Dr. Venkataraman D (d_venkat@cb.amrita.edu)  
**Team Lead**: Raju Mishra (rajuchaswik@gmail.com)

---

## 🙏 Acknowledgments

- **Amrita Vishwa Vidyapeetham** for providing resources and guidance
- **Dr. Venkataraman D** for mentorship
- **MediaPipe** and **Hugging Face** for ML models
- Parents and children who inspired this project

---

## 📞 Support

For technical support or questions:
- Email: rajuchaswik@gmail.com
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)

---

**Built with ❤️ by Team 96 for children with ASD**

*"Every voice matters. Every sound is progress."* 🌟
