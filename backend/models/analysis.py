from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class RiskLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class Risk(BaseModel):
    title: str
    files: List[str]
    evidence: str
    why_it_matters: str
    suggested_action: str
    confidence: RiskLevel

class FeasibilityResult(BaseModel):
    is_feasible: bool
    reasons: List[str]
    stats: Dict[str, Any]

class AnalysisResult(BaseModel):
    repo_id: int
    repo_name: str
    repo_full_name: str
    user_github_id: int
    feasibility: FeasibilityResult
    risks: List[Risk]
    analyzed_at: datetime
    analysis_time_seconds: float
