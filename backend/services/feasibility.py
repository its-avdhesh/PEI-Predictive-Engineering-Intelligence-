import os
from pathlib import Path
from typing import Dict, Any, List
import logging

logger = logging.getLogger(__name__)

class FeasibilityChecker:
    # Hard limits from PRD
    MAX_FILES = 300
    MAX_LOC = 40000
    MAX_FOLDER_DEPTH = 8
    
    # Soft limits
    WARN_FILES = 200
    WARN_LOC = 30000
    
    # File extensions to analyze
    CODE_EXTENSIONS = {
        '.py', '.js', '.jsx', '.ts', '.tsx', '.java', '.cpp', '.c', '.h',
        '.cs', '.go', '.rb', '.php', '.swift', '.kt', '.rs', '.scala'
    }
    
    @staticmethod
    def check_feasibility(repo_path: Path) -> Dict[str, Any]:
        """
        Check if repository meets feasibility constraints.
        Returns: {is_feasible, reasons, stats}
        """
        stats = FeasibilityChecker._collect_stats(repo_path)
        reasons = []
        warnings = []
        
        # Hard limit checks
        if stats['total_files'] > FeasibilityChecker.MAX_FILES:
            reasons.append(
                f"Repository has {stats['total_files']} files, exceeding limit of {FeasibilityChecker.MAX_FILES}"
            )
        
        if stats['total_loc'] > FeasibilityChecker.MAX_LOC:
            reasons.append(
                f"Repository has {stats['total_loc']} lines of code, exceeding limit of {FeasibilityChecker.MAX_LOC}"
            )
        
        if stats['max_depth'] > FeasibilityChecker.MAX_FOLDER_DEPTH:
            reasons.append(
                f"Repository folder depth is {stats['max_depth']}, exceeding limit of {FeasibilityChecker.MAX_FOLDER_DEPTH}"
            )
        
        if stats['is_monorepo']:
            reasons.append("Repository appears to be a monorepo, which is not supported")
        
        if len(stats['languages']) > 1:
            primary_lang = max(stats['languages'].items(), key=lambda x: x[1])
            if primary_lang[1] / stats['total_loc'] < 0.7:
                reasons.append(
                    f"Repository has multiple primary languages: {list(stats['languages'].keys())}. Single language projects only."
                )
        
        # Soft limit warnings
        if FeasibilityChecker.WARN_FILES < stats['total_files'] <= FeasibilityChecker.MAX_FILES:
            warnings.append("Repository is large; analysis may take longer")
        
        if FeasibilityChecker.WARN_LOC < stats['total_loc'] <= FeasibilityChecker.MAX_LOC:
            warnings.append("High LOC count; explanations may be limited")
        
        is_feasible = len(reasons) == 0
        
        return {
            'is_feasible': is_feasible,
            'reasons': reasons,
            'warnings': warnings,
            'stats': stats
        }
    
    @staticmethod
    def _collect_stats(repo_path: Path) -> Dict[str, Any]:
        """
        Collect repository statistics.
        """
        total_files = 0
        total_loc = 0
        max_depth = 0
        languages = {}
        
        # Directories that strongly suggest monorepo (very specific indicators)
        monorepo_indicators = {
            'packages', 'apps', 'microservices', 'libs'
        }
        is_monorepo = False
        package_config_files = 0
        
        for root, dirs, files in os.walk(repo_path):
            # Skip common non-code directories
            dirs[:] = [d for d in dirs if d not in {
                '.git', 'node_modules', '__pycache__', '.venv', 'venv',
                'build', 'dist', '.next', 'coverage', '.pytest_cache'
            }]
            
            # Count package config files across the entire repo
            config_files = [f for f in files if f in ['package.json', 'pyproject.toml', 'Cargo.toml', 'pom.xml', 'build.gradle']]
            package_config_files += len(config_files)
            
            # Only consider monorepo if we find strong indicators AND multiple package files
            if any(indicator in dirs for indicator in monorepo_indicators) and package_config_files > 1:
                is_monorepo = True
            
            # Calculate depth
            depth = len(Path(root).relative_to(repo_path).parts)
            max_depth = max(max_depth, depth)
            
            for file in files:
                file_path = Path(root) / file
                ext = file_path.suffix.lower()
                
                if ext in FeasibilityChecker.CODE_EXTENSIONS:
                    total_files += 1
                    
                    # Count lines of code
                    try:
                        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                            lines = len([l for l in f if l.strip()])
                            total_loc += lines
                            
                            # Track language
                            lang = FeasibilityChecker._extension_to_language(ext)
                            languages[lang] = languages.get(lang, 0) + lines
                    except Exception as e:
                        logger.warning(f"Could not read file {file_path}: {e}")
        
        return {
            'total_files': total_files,
            'total_loc': total_loc,
            'max_depth': max_depth,
            'languages': languages,
            'is_monorepo': is_monorepo,
            'primary_language': max(languages.items(), key=lambda x: x[1])[0] if languages else 'unknown'
        }
    
    @staticmethod
    def _extension_to_language(ext: str) -> str:
        mapping = {
            '.py': 'Python',
            '.js': 'JavaScript',
            '.jsx': 'JavaScript',
            '.ts': 'TypeScript',
            '.tsx': 'TypeScript',
            '.java': 'Java',
            '.cpp': 'C++',
            '.c': 'C',
            '.h': 'C/C++',
            '.cs': 'C#',
            '.go': 'Go',
            '.rb': 'Ruby',
            '.php': 'PHP',
            '.swift': 'Swift',
            '.kt': 'Kotlin',
            '.rs': 'Rust',
            '.scala': 'Scala'
        }
        return mapping.get(ext, 'Unknown')
