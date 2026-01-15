from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from config import get_settings
import logging

logger = logging.getLogger(__name__)

class Database:
    client: AsyncIOMotorClient = None
    database = None

db = Database()

async def connect_to_mongo():
    """Connect to MongoDB Atlas"""
    try:
        settings = get_settings()
        db.client = AsyncIOMotorClient(
            settings.mongo_url, 
            server_api=ServerApi('1'),
            connectTimeoutMS=30000,
            socketTimeoutMS=30000,
            serverSelectionTimeoutMS=30000
        )
        
        # Test the connection
        await db.client.admin.command('ping')
        logger.info("Successfully connected to MongoDB Atlas!")
        
        # Set the database
        db.database = db.client[settings.db_name]
        
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        # Don't raise the exception to allow the app to start without DB
        logger.warning("Application will continue without database connection")

async def close_mongo_connection():
    """Close MongoDB connection"""
    if db.client:
        db.client.close()
        logger.info("MongoDB connection closed")

def get_database():
    """Get the database instance"""
    return db.database
