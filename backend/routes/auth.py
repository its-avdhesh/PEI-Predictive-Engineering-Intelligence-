from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import RedirectResponse
import httpx
from datetime import datetime, timezone
from config import get_settings
from auth.jwt_handler import create_access_token
from auth.dependencies import get_database
from services.github_service import GitHubService
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/auth", tags=["authentication"])
settings = get_settings()

@router.get("/github/login")
async def github_login():
    """Initiate GitHub OAuth flow."""
    if not settings.github_client_id:
        raise HTTPException(
            status_code=500,
            detail="GitHub OAuth not configured. Please set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET."
        )
    
    github_auth_url = (
        f"https://github.com/login/oauth/authorize"
        f"?client_id={settings.github_client_id}"
        f"&redirect_uri={settings.github_redirect_uri}"
        f"&scope=repo%20user:email"
    )
    return RedirectResponse(url=github_auth_url)

@router.get("/github/callback")
async def github_callback(
    code: str,
    db = Depends(get_database)
):
    """Handle GitHub OAuth callback."""
    if not settings.github_client_id or not settings.github_client_secret:
        raise HTTPException(
            status_code=500,
            detail="GitHub OAuth not configured"
        )
    
    try:
        # Exchange code for access token
        async with httpx.AsyncClient() as client:
            token_response = await client.post(
                "https://github.com/login/oauth/access_token",
                headers={"Accept": "application/json"},
                data={
                    "client_id": settings.github_client_id,
                    "client_secret": settings.github_client_secret,
                    "code": code,
                    "redirect_uri": settings.github_redirect_uri
                }
            )
            
            if token_response.status_code != 200:
                logger.error(f"Token exchange failed: {token_response.text}")
                raise HTTPException(
                    status_code=400,
                    detail="Failed to obtain access token"
                )
            
            token_data = token_response.json()
            access_token = token_data.get("access_token")
            scope = token_data.get("scope", "")
            
            if not access_token:
                raise HTTPException(
                    status_code=400,
                    detail="No access token received"
                )
        
        # Get user information
        github_service = GitHubService(access_token)
        github_user = await github_service.get_user_info()
        
        # Get email if not public
        if not github_user.get("email"):
            email = await github_service.get_user_email()
            if email:
                github_user["email"] = email
        
        # Store/update user in MongoDB
        now = datetime.now(timezone.utc)
        user_doc = {
            "github_id": github_user["id"],
            "username": github_user["login"],
            "email": github_user.get("email"),
            "avatar_url": github_user.get("avatar_url"),
            "access_token": access_token,
            "token_type": "bearer",
            "scope": scope,
            "updated_at": now
        }
        
        users_collection = db["users"]
        existing_user = await users_collection.find_one(
            {"github_id": github_user["id"]}
        )
        
        if existing_user:
            await users_collection.update_one(
                {"github_id": github_user["id"]},
                {"$set": user_doc}
            )
        else:
            user_doc["created_at"] = now
            await users_collection.insert_one(user_doc)
        
        # Create JWT for session management
        jwt_token = create_access_token(
            data={"sub": str(github_user["id"])}
        )
        
        # Redirect to frontend with token
        frontend_base = settings.frontend_url
        redirect_url = f"{frontend_base}/auth/callback?token={jwt_token}&login=success"
        return RedirectResponse(url=redirect_url)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"OAuth callback error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Authentication failed"
        )

@router.post("/logout")
async def logout():
    """Logout endpoint (client-side token removal)."""
    return {"message": "Logged out successfully"}

@router.get("/status")
async def auth_status(
    current_user: dict = Depends(get_database)
):
    """Check authentication status."""
    return {
        "authenticated": True,
        "username": current_user.get("username")
    }
