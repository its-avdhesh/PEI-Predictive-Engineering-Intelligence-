from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path

# Import routes
from routes import auth, repos


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

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

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()