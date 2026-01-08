import httpx
from typing import List, Dict, Any
from fastapi import HTTPException
import logging

logger = logging.getLogger(__name__)

class GitHubService:
    BASE_URL = "https://api.github.com"
    
    def __init__(self, access_token: str):
        self.access_token = access_token
        self.headers = {
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/json"
        }
    
    async def get_user_info(self) -> Dict[str, Any]:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.BASE_URL}/user",
                headers=self.headers
            )
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail="Failed to get user information"
                )
            
            return response.json()
    
    async def get_user_email(self) -> str:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.BASE_URL}/user/emails",
                headers=self.headers
            )
            
            if response.status_code == 200:
                emails = response.json()
                primary_email = next(
                    (e["email"] for e in emails if e["primary"]), 
                    None
                )
                return primary_email
            return None
    
    async def list_repositories(self) -> List[Dict[str, Any]]:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.BASE_URL}/user/repos",
                headers=self.headers,
                params={
                    "visibility": "all",
                    "affiliation": "owner,collaborator,organization_member",
                    "per_page": 100,
                    "sort": "updated"
                }
            )
            
            if response.status_code != 200:
                logger.error(f"GitHub API error: {response.status_code} - {response.text}")
                raise HTTPException(
                    status_code=response.status_code,
                    detail="Failed to fetch repositories"
                )
            
            repos = response.json()
            
            formatted_repos = [
                {
                    "id": repo["id"],
                    "name": repo["name"],
                    "full_name": repo["full_name"],
                    "private": repo["private"],
                    "clone_url": repo["clone_url"],
                    "description": repo.get("description"),
                    "default_branch": repo.get("default_branch", "main"),
                    "language": repo.get("language"),
                    "updated_at": repo.get("updated_at")
                }
                for repo in repos
            ]
            
            return formatted_repos
    
    async def get_repository_info(self, owner: str, repo: str) -> Dict[str, Any]:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.BASE_URL}/repos/{owner}/{repo}",
                headers=self.headers
            )
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail="Failed to fetch repository information"
                )
            
            return response.json()
