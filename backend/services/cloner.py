import os
import shutil
import tempfile
from pathlib import Path
from typing import Tuple, Optional
import git
from git import Repo
import logging

logger = logging.getLogger(__name__)

class RepositoryCloner:
    @staticmethod
    def clone_repository(
        clone_url: str,
        access_token: str,
        username: str
    ) -> Tuple[Optional[Path], Optional[str]]:
        """
        Clone a repository to a temporary directory.
        Returns (path, error_message)
        """
        temp_dir = None
        try:
            temp_dir = tempfile.mkdtemp(prefix="pei_analysis_")
            
            # Construct authenticated clone URL
            if clone_url.startswith("https://github.com/"):
                auth_url = clone_url.replace(
                    "https://github.com/",
                    f"https://{username}:{access_token}@github.com/"
                )
            else:
                auth_url = clone_url
            
            logger.info(f"Cloning repository to {temp_dir}")
            Repo.clone_from(
                auth_url,
                temp_dir,
                depth=1,
                single_branch=True
            )
            
            return Path(temp_dir), None
            
        except git.GitCommandError as e:
            logger.error(f"Git clone error: {str(e)}")
            if temp_dir and os.path.exists(temp_dir):
                shutil.rmtree(temp_dir, ignore_errors=True)
            return None, f"Failed to clone repository: {str(e)}"
        except Exception as e:
            logger.error(f"Unexpected error during clone: {str(e)}")
            if temp_dir and os.path.exists(temp_dir):
                shutil.rmtree(temp_dir, ignore_errors=True)
            return None, f"Unexpected error: {str(e)}"
    
    @staticmethod
    def cleanup_repository(repo_path: Path):
        """
        Clean up the cloned repository.
        """
        try:
            if repo_path and os.path.exists(repo_path):
                shutil.rmtree(repo_path, ignore_errors=True)
                logger.info(f"Cleaned up repository at {repo_path}")
        except Exception as e:
            logger.error(f"Error cleaning up repository: {str(e)}")
