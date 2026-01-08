from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class GitHubUser(BaseModel):
    github_id: int
    username: str
    email: Optional[str] = None
    avatar_url: Optional[str] = None
    access_token: str
    token_type: str = "bearer"
    scope: str
    created_at: datetime
    updated_at: datetime

class UserInDB(GitHubUser):
    pass
