# Quick Start Guide 🚀

Get SpeakEasy ASD up and running in 5 minutes!

## Prerequisites Check ✅

Before starting, ensure you have:
- [ ] Python 3.11+
- [ ] Node.js 18+
- [ ] MongoDB 6.0+
- [ ] Git

## Step 1: Clone & Setup (2 min)

```bash
# Clone repository
git clone <repository-url>
cd final_year_project
```

## Step 2: Backend Setup (2 min)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
.\venv\Scripts\activate
# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo MONGODB_URI=mongodb://localhost:27017 > .env
echo DATABASE_NAME=speakeasy_asd >> .env
echo SECRET_KEY=super_secret_key_change_in_production >> .env
echo ADMIN_EMAIL=rajuchaswik@gmail.com >> .env
echo ADMIN_PASSWORD=Raju@2006 >> .env
```

**Start MongoDB:**
```bash
# Windows
mongod --dbpath C:\data\db

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Run Backend:**
```bash
uvicorn app.main:app --reload
```

✅ Backend running at: http://localhost:8000

## Step 3: Frontend Setup (1 min)

**Open new terminal:**

```bash
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev
```

✅ Frontend running at: http://localhost:5173

## Step 4: Test the App 🎉

1. Open browser: **http://localhost:5173**
2. Click "Get Started"
3. Register or use admin login:
   - Email: `rajuchaswik@gmail.com`
   - Password: `Raju@2006`

## Troubleshooting

### MongoDB not starting?
```bash
# Check if already running
ps aux | grep mongod  # Mac/Linux
tasklist | findstr mongod  # Windows
```

### Port already in use?
```bash
# Backend - use different port
uvicorn app.main:app --reload --port 8001

# Frontend - use different port
npm run dev -- --port 3000
```

### Dependencies failing?
```bash
# Backend
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall

# Frontend
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

- 📖 Read [README.md](README.md) for full documentation
- 🔧 Check [backend/SETUP.md](backend/SETUP.md) for backend details
- 🎨 Check [frontend/SETUP.md](frontend/SETUP.md) for frontend details

## Default Credentials

**Admin:**
- Email: rajuchaswik@gmail.com
- Password: Raju@2006

**Test User:**
- Create via registration form

## Key URLs

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- MongoDB: mongodb://localhost:27017

---

**Need help?** Contact: rajuchaswik@gmail.com

**Built with ❤️ by Team 96**
