"""Contact form router."""
from fastapi import APIRouter
from datetime import datetime
from ..database import get_database


router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("")
async def submit_contact(contact_data: dict):
    """Save contact form submission."""
    db = get_database()
    
    contact_doc = {
        "name": contact_data.get("name"),
        "email": contact_data.get("email"),
        "message": contact_data.get("message"),
        "created_at": datetime.utcnow(),
        "read": False
    }
    
    await db.contacts.insert_one(contact_doc)
    
    return {"message": "Thank you for contacting us! We'll get back to you soon."}
