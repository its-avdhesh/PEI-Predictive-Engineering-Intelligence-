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
            
            formatted_repos = []
            for repo in repos:
                # Get additional repository details
                repo_details = await self._get_repo_details(repo["full_name"])
                
                formatted_repo = {
                    "id": repo["id"],
                    "name": repo["name"],
                    "full_name": repo["full_name"],
                    "private": repo["private"],
                    "clone_url": repo["clone_url"],
                    "description": repo.get("description"),
                    "default_branch": repo.get("default_branch", "main"),
                    "language": repo.get("language"),
                    "updated_at": repo.get("updated_at"),
                    "stargazers_count": repo.get("stargazers_count", 0),
                    "forks_count": repo.get("forks_count", 0),
                    "open_issues_count": repo.get("open_issues_count", 0),
                }
                
                # Add additional details if available
                if repo_details:
                    formatted_repo.update({
                        "size": repo_details.get("size", 0),
                        "created_at": repo_details.get("created_at"),
                        "pushed_at": repo_details.get("pushed_at"),
                        "homepage": repo_details.get("homepage"),
                        "topics": repo_details.get("topics", []),
                        "license": repo_details.get("license", {}).get("name") if repo_details.get("license") else None,
                    })
                
                formatted_repos.append(formatted_repo)
            
            return formatted_repos
    
    async def _get_repo_details(self, full_name: str) -> Dict[str, Any]:
        """Get additional repository details."""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.BASE_URL}/repos/{full_name}",
                    headers=self.headers
                )
                
                if response.status_code == 200:
                    return response.json()
                else:
                    logger.warning(f"Failed to get details for {full_name}: {response.status_code}")
                    return None
        except Exception as e:
            logger.warning(f"Error getting details for {full_name}: {str(e)}")
            return None
    
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
