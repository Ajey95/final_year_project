"""Database connection and collections."""
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from .config import settings


class Database:
    """MongoDB database manager."""
    
    client: AsyncIOMotorClient = None
    db: AsyncIOMotorDatabase = None


db_manager = Database()


async def connect_to_mongo():
    """Connect to MongoDB."""
    db_manager.client = AsyncIOMotorClient(settings.MONGODB_URL)
    db_manager.db = db_manager.client[settings.DB_NAME]
    
    # Create indexes
    await db_manager.db.users.create_index("email", unique=True)
    await db_manager.db.evaluations.create_index("user_id")
    await db_manager.db.progress.create_index([("user_id", 1), ("lesson_id", 1)])
    
    print("✅ Connected to MongoDB")


async def close_mongo_connection():
    """Close MongoDB connection."""
    if db_manager.client:
        db_manager.client.close()
        print("❌ Closed MongoDB connection")


def get_database() -> AsyncIOMotorDatabase:
    """Get database instance."""
    return db_manager.db
