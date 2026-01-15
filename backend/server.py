from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path

# Import routes
from routes import auth, repos
from database import connect_to_mongo, close_mongo_connection


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Debug: Print environment variables to verify they're loaded
print(f"MONGO_URL from env: {os.environ.get('MONGO_URL', 'NOT FOUND')}")

# Create the main app
app = FastAPI(
    title="PEI - Predictive Engineering Intelligence",
    description="AI-assisted repository analysis for detecting engineering risks",
    version="1.0.0"
)

# Create a router with the /api prefix for health checks
api_router = APIRouter(prefix="/api")

@api_router.get("/")
async def root():
    return {
        "message": "PEI API - Predictive Engineering Intelligence",
        "status": "operational"
    }

@api_router.get("/health")
async def health():
    return {"status": "healthy"}

# Include routers
app.include_router(api_router)
app.include_router(auth.router)
app.include_router(repos.router)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Startup and shutdown events
@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()
    logger.info("Application startup complete")

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()
    logger.info("Application shutdown complete")