"""Main FastAPI application."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import bcrypt
from .config import settings
from .database import connect_to_mongo, close_mongo_connection, get_database
from .routers import auth, therapy, evaluation, progress, admin


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events."""
    # Startup
    await connect_to_mongo()
    await seed_admin_user()
    yield
    # Shutdown
    await close_mongo_connection()


app = FastAPI(
    title="SpeakEasy ASD API",
    description="AI-powered speech therapy platform for children with ASD",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.CORS_ORIGIN, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(therapy.router)
app.include_router(evaluation.router)
app.include_router(progress.router)
app.include_router(admin.router)


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Welcome to SpeakEasy ASD API",
        "version": "1.0.0",
        "team": "Team 96 - Amrita Vishwa Vidyapeetham"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


async def seed_admin_user():
    """Seed admin user if not exists."""
    from datetime import datetime
    
    db = get_database()
    
    # Check if admin exists
    admin = await db.users.find_one({"email": settings.ADMIN_EMAIL})
    
    if not admin:
        # Create admin user
        admin_doc = {
            "email": settings.ADMIN_EMAIL,
            "password_hash": bcrypt.hashpw(
                settings.ADMIN_PASSWORD.encode('utf-8'),
                bcrypt.gensalt()
            ).decode('utf-8'),
            "full_name": "Admin User",
            "child_name": "N/A",
            "child_age": 0,
            "language": "English",
            "role": "admin",
            "created_at": datetime.utcnow(),
            "last_login": None,
            "total_sessions": 0,
            "total_stars": 0
        }
        
        await db.users.insert_one(admin_doc)
        print(f"✅ Admin user seeded: {settings.ADMIN_EMAIL}")
    else:
        print(f"✅ Admin user already exists: {settings.ADMIN_EMAIL}")
