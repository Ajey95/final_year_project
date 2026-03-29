# Backend Setup Instructions

## Prerequisites
- Python 3.11 or higher
- MongoDB 6.0+
- Virtual environment tool (venv)

## Installation Steps

### 1. Create and Activate Virtual Environment

**Windows:**
```powershell
python -m venv venv
.\venv\Scripts\activate
```

**Mac/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

This will install:
- FastAPI (web framework)
- Motor (async MongoDB driver)
- Transformers & PyTorch (ML models)
- MediaPipe (face detection)
- Librosa (audio processing)
- And all other dependencies

### 3. Setup MongoDB

**Windows:**
```powershell
# Install MongoDB Community Edition from mongodb.com
# Start MongoDB service
mongod --dbpath C:\data\db
```

**Mac (with Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### 4. Configure Environment Variables

Create `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=speakeasy_asd
SECRET_KEY=your_super_secret_key_change_this_in_production_min_32_characters
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ADMIN_EMAIL=rajuchaswik@gmail.com
ADMIN_PASSWORD=Raju@2006
```

**Important**: Change the SECRET_KEY in production!

### 5. Run the Application

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- Base URL: http://localhost:8000
- Interactive docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/admin/login` - Admin login
- `POST /auth/logout` - Logout

### Therapy
- `GET /therapy/lessons` - Get all lessons
- `GET /therapy/lesson/{lesson_id}` - Get specific lesson

### Evaluation
- `POST /evaluation/speech` - Submit speech evaluation
- `WebSocket /evaluation/face` - Real-time face analysis

### Progress
- `POST /progress/save` - Save user progress
- `GET /progress/summary/{email}` - Get progress summary

### Admin
- `GET /admin/stats` - Get platform statistics
- `GET /admin/users` - Get all users (paginated)
- `DELETE /admin/user/{user_id}` - Delete user
- `GET /admin/export-csv` - Export users to CSV

### Contact
- `POST /contact` - Submit contact form

## Database Collections

The application will automatically create the following collections:
- `users` - User accounts
- `sessions` - Therapy sessions
- `evaluations` - Speech/face evaluations
- `progress` - User progress tracking
- `contacts` - Contact form submissions

## Admin Seeding

The admin account is automatically created on first startup:
- Email: rajuchaswik@gmail.com
- Password: Raju@2006

## Troubleshooting

### Issue: MongoDB connection failed
**Solution**: Ensure MongoDB is running:
```bash
# Check if MongoDB is running
# Windows:
tasklist | findstr mongod
# Mac/Linux:
ps aux | grep mongod
```

### Issue: ModuleNotFoundError
**Solution**: Ensure virtual environment is activated and dependencies are installed:
```bash
pip install -r requirements.txt
```

### Issue: Port 8000 already in use
**Solution**: Kill the process or use a different port:
```bash
# Use different port
uvicorn app.main:app --reload --port 8001
```

### Issue: Wav2Vec2 model download fails
**Solution**: Model downloads on first use. Ensure internet connection and sufficient disk space (3GB+).

## Development Tips

### Hot Reload
The `--reload` flag enables auto-reload on code changes.

### Debug Mode
Add `--log-level debug` for detailed logging:
```bash
uvicorn app.main:app --reload --log-level debug
```

### CORS Configuration
Update `main.py` to allow different origins if needed:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://your-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Production Deployment

### Using Gunicorn (Recommended)
```bash
pip install gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Environment Variables
Set secure environment variables:
- Use strong SECRET_KEY (32+ characters)
- Use MongoDB Atlas for production database
- Enable HTTPS

### Docker Deployment
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["gunicorn", "app.main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]
```

## Testing

Run tests with pytest:
```bash
pytest tests/ -v --cov=app
```

## Performance Optimization

- Enable MongoDB indexing (automatically done on startup)
- Use Redis for caching if needed
- Compress API responses
- Optimize ML model loading (load once, reuse)

---

For more information, see the main README.md file.
