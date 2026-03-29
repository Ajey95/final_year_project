"""User models and schemas."""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId


class PyObjectId(ObjectId):
    """Custom ObjectId for Pydantic."""
    
    @classmethod
    def __get_validators__(cls):
        yield cls.validate
    
    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)


class UserBase(BaseModel):
    """Base user schema."""
    email: EmailStr
    full_name: str
    child_name: str
    child_age: int = Field(ge=4, le=12)
    language: str = Field(default="Tamil")


class UserCreate(UserBase):
    """User creation schema."""
    password: str = Field(min_length=8)
    confirm_password: str


class UserInDB(UserBase):
    """User in database."""
    id: str = Field(alias="_id")
    password_hash: str
    role: str = "user"
    created_at: datetime
    last_login: Optional[datetime] = None
    total_sessions: int = 0
    total_stars: int = 0
    
    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


class UserResponse(UserBase):
    """User response schema."""
    id: str
    role: str
    total_sessions: int
    total_stars: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    """Login request schema."""
    email: EmailStr
    password: str


class TokenData(BaseModel):
    """Token data schema."""
    email: Optional[str] = None
    role: Optional[str] = None
