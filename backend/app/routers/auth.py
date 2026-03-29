"""Authentication router."""
from fastapi import APIRouter, HTTPException, status, Response, Depends
from datetime import datetime, timedelta
import bcrypt
from ..models.user import UserCreate, UserResponse, LoginRequest
from ..database import get_database
from ..utils.jwt_handler import create_access_token, get_current_user
from ..config import settings


router = APIRouter(prefix="/api/auth", tags=["auth"])


def hash_password(password: str) -> str:
    """Hash password with bcrypt."""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against hash."""
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate, response: Response):
    """Register new user."""
    db = get_database()
    
    # Validate password confirmation
    if user_data.password != user_data.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match"
        )
    
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user document
    user_dict = {
        "email": user_data.email,
        "password_hash": hash_password(user_data.password),
        "full_name": user_data.full_name,
        "child_name": user_data.child_name,
        "child_age": user_data.child_age,
        "language": user_data.language,
        "role": "user",
        "created_at": datetime.utcnow(),
        "last_login": None,
        "total_sessions": 0,
        "total_stars": 0
    }
    
    result = await db.users.insert_one(user_dict)
    user_dict["_id"] = str(result.inserted_id)
    
    # Create JWT token
    access_token = create_access_token(
        data={"sub": user_data.email, "role": "user"}
    )
    
    # Set HTTP-only cookie
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        samesite="lax"
    )
    
    return {
        "message": "User registered successfully",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "email": user_data.email,
            "full_name": user_data.full_name,
            "child_name": user_data.child_name,
            "role": "user"
        }
    }


@router.post("/login")
async def login(login_data: LoginRequest, response: Response):
    """Login user."""
    db = get_database()
    
    # Hardcoded admin credentials check
    if login_data.email == "rajuchaswiK@gmail.com" and login_data.password == "Raju@2006":
        # Check if admin user exists, if not create it
        admin_user = await db.users.find_one({"email": "rajuchaswiK@gmail.com"})
        if not admin_user:
            admin_dict = {
                "email": "rajuchaswiK@gmail.com",
                "password_hash": hash_password("Raju@2006"),
                "full_name": "Admin User",
                "child_name": "N/A",
                "child_age": 0,
                "language": "English",
                "role": "admin",
                "created_at": datetime.utcnow(),
                "last_login": datetime.utcnow(),
                "total_sessions": 0,
                "total_stars": 0
            }
            result = await db.users.insert_one(admin_dict)
            admin_dict["_id"] = result.inserted_id
            admin_user = admin_dict
        else:
            await db.users.update_one(
                {"_id": admin_user["_id"]},
                {"$set": {"last_login": datetime.utcnow()}}
            )
        
        access_token = create_access_token(
            data={"sub": "rajuchaswiK@gmail.com", "role": "admin"}
        )
        
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            samesite="lax"
        )
        
        return {
            "message": "Admin login successful",
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "email": "rajuchaswiK@gmail.com",
                "full_name": "Admin User",
                "child_name": "N/A",
                "child_age": 0,
                "role": "admin",
                "total_sessions": 0,
                "total_stars": 0
            }
        }
    
    # Find user
    user = await db.users.find_one({"email": login_data.email})
    if not user or not verify_password(login_data.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Update last login
    await db.users.update_one(
        {"_id": user["_id"]},
        {"$set": {"last_login": datetime.utcnow()}}
    )
    
    # Create JWT token
    access_token = create_access_token(
        data={"sub": user["email"], "role": user["role"]}
    )
    
    # Set HTTP-only cookie
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        samesite="lax"
    )
    
    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "email": user["email"],
            "full_name": user["full_name"],
            "child_name": user["child_name"],
            "child_age": user.get("child_age", 0),
            "role": user["role"],
            "total_sessions": user.get("total_sessions", 0),
            "total_stars": user.get("total_stars", 0)
        }
    }


@router.post("/admin/login")
async def admin_login(login_data: LoginRequest, response: Response):
    """Admin login."""
    db = get_database()
    
    # Find user
    user = await db.users.find_one({"email": login_data.email, "role": "admin"})
    if not user or not verify_password(login_data.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin credentials"
        )
    
    # Create JWT token
    access_token = create_access_token(
        data={"sub": user["email"], "role": "admin"}
    )
    
    # Set HTTP-only cookie
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        samesite="lax"
    )
    
    return {
        "message": "Admin login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "email": user["email"],
            "full_name": user["full_name"],
            "role": "admin"
        }
    }


@router.post("/logout")
async def logout(response: Response):
    """Logout user."""
    response.delete_cookie(key="access_token")
    return {"message": "Logout successful"}


@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    """Get current user info."""
    return {
        "email": current_user["email"],
        "full_name": current_user["full_name"],
        "child_name": current_user.get("child_name"),
        "role": current_user["role"],
        "total_sessions": current_user.get("total_sessions", 0),
        "total_stars": current_user.get("total_stars", 0),
        "language": current_user.get("language", "Tamil")
    }
