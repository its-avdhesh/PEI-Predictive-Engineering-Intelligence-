from fastapi import Header, HTTPException, Depends
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient
from auth.jwt_handler import decode_access_token
import os

async def get_database():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    try:
        yield db
    finally:
        client.close()

async def get_current_user(
    authorization: Optional[str] = Header(None),
    db = Depends(get_database)
):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.split(" ")[1]
    payload = decode_access_token(token)
    
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    github_id = payload.get("sub")
    users_collection = db["users"]
    user = await users_collection.find_one({"github_id": int(github_id)})
    
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user
