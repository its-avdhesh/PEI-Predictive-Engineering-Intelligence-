from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from typing import List, Dict, Any
import time
import logging
from datetime import datetime, timezone
from auth.dependencies import get_current_user, get_database
from services.github_service import GitHubService
from services.cloner import RepositoryCloner
from services.feasibility import FeasibilityChecker
from analyzers.risk_detector import RiskDetector

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/repos", tags=["repositories"])

@router.get("/list")
async def list_repositories(
    current_user: dict = Depends(get_current_user)
) -> Dict[str, Any]:
    """List all repositories the user has access to."""
    try:
        access_token = current_user["access_token"]
        github_service = GitHubService(access_token)
        
        repositories = await github_service.list_repositories()
        
        return {
            "repositories": repositories,
            "count": len(repositories)
        }
    except Exception as e:
        logger.error(f"Error listing repositories: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to fetch repositories"
        )

@router.post("/analyze/{repo_id}")
async def analyze_repository(
    repo_id: int,
    current_user: dict = Depends(get_current_user),
    db = Depends(get_database)
) -> Dict[str, Any]:
    """Analyze a repository for engineering risks."""
    start_time = time.time()
    repo_path = None
    
    try:
        access_token = current_user["access_token"]
        username = current_user["username"]
        github_service = GitHubService(access_token)
        
        # Get all repositories to find the one with matching ID
        repositories = await github_service.list_repositories()
        repo = next((r for r in repositories if r["id"] == repo_id), None)
        
        if not repo:
            raise HTTPException(
                status_code=404,
                detail="Repository not found or you don't have access"
            )
        
        # Clone repository
        logger.info(f"Cloning repository {repo['full_name']}")
        repo_path, clone_error = RepositoryCloner.clone_repository(
            repo["clone_url"],
            access_token,
            username
        )
        
        if clone_error:
            raise HTTPException(
                status_code=400,
                detail=f"Failed to clone repository: {clone_error}"
            )
        
        # Run feasibility check
        logger.info(f"Running feasibility check on {repo['full_name']}")
        feasibility_result = FeasibilityChecker.check_feasibility(repo_path)
        
        # Prepare response with feasibility data
        result = {
            "repo_id": repo_id,
            "repo_name": repo["name"],
            "repo_full_name": repo["full_name"],
            "user_github_id": current_user["github_id"],
            "feasibility": feasibility_result,
            "risks": [],
            "analyzed_at": datetime.now(timezone.utc).isoformat(),
            "analysis_time_seconds": 0
        }
        
        # If not feasible, return early
        if not feasibility_result["is_feasible"]:
            analysis_time = time.time() - start_time
            result["analysis_time_seconds"] = round(analysis_time, 2)
            
            # Save to database
            analyses_collection = db["analyses"]
            await analyses_collection.insert_one(result)
            
            # Cleanup
            if repo_path:
                RepositoryCloner.cleanup_repository(repo_path)
            
            return result
        
        # Run risk detection
        logger.info(f"Running risk detection on {repo['full_name']}")
        primary_language = feasibility_result["stats"].get("primary_language", "Python")
        risk_detector = RiskDetector(repo_path, primary_language)
        
        detected_risks = risk_detector.detect_risks()
        
        # Convert Risk objects to dicts
        risks_data = [
            {
                "title": risk.title,
                "files": risk.files,
                "evidence": risk.evidence,
                "why_it_matters": risk.why_it_matters,
                "suggested_action": risk.suggested_action,
                "confidence": risk.confidence
            }
            for risk in detected_risks
        ]
        
        analysis_time = time.time() - start_time
        result["risks"] = risks_data
        result["analysis_time_seconds"] = round(analysis_time, 2)
        
        # Save to database
        analyses_collection = db["analyses"]
        await analyses_collection.insert_one(result)
        
        logger.info(f"Analysis complete for {repo['full_name']}: {len(risks_data)} risks found")
        
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error analyzing repository: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )
    finally:
        # Always cleanup cloned repository
        if repo_path:
            RepositoryCloner.cleanup_repository(repo_path)

@router.get("/analyses")
async def get_analyses(
    current_user: dict = Depends(get_current_user),
    db = Depends(get_database)
) -> Dict[str, Any]:
    """Get all analyses for the current user."""
    try:
        analyses_collection = db["analyses"]
        analyses = await analyses_collection.find(
            {"user_github_id": current_user["github_id"]},
            {"_id": 0}
        ).sort("analyzed_at", -1).to_list(100)
        
        return {
            "analyses": analyses,
            "count": len(analyses)
        }
    except Exception as e:
        logger.error(f"Error fetching analyses: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to fetch analyses"
        )
