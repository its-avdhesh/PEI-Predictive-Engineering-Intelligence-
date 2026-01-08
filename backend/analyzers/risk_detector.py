from pathlib import Path
from typing import List, Dict, Any
import logging
import networkx as nx
from analyzers.dependency_graph import DependencyGraphBuilder
from models.analysis import Risk, RiskLevel

logger = logging.getLogger(__name__)

class RiskDetector:
    """Detects engineering risks in code structure."""
    
    # Thresholds for risk detection
    GOD_FILE_LOC = 500
    GOD_FILE_COMPLEXITY = 30
    HIGH_FAN_IN = 10
    HIGH_FAN_OUT = 15
    
    def __init__(self, repo_path: Path, primary_language: str):
        self.repo_path = repo_path
        self.primary_language = primary_language
        self.graph_builder = DependencyGraphBuilder(repo_path, primary_language)
        self.graph = None
        self.file_info = None
    
    def detect_risks(self) -> List[Risk]:
        """Detect all risks in the repository."""
        # Build dependency graph
        self.graph = self.graph_builder.build_graph()
        self.file_info = self.graph_builder.file_info
        
        risks = []
        
        # Detect various risk patterns
        risks.extend(self._detect_god_files())
        risks.extend(self._detect_circular_dependencies())
        risks.extend(self._detect_high_coupling())
        risks.extend(self._detect_missing_abstraction())
        
        # Sort by confidence (high to low)
        risks.sort(key=lambda r: ['high', 'medium', 'low'].index(r.confidence))
        
        return risks
    
    def _detect_god_files(self) -> List[Risk]:
        """Detect files that are too large or complex (God Files)."""
        risks = []
        
        for file_path, info in self.file_info.items():
            loc = info.get('loc', 0)
            complexity = info.get('complexity', 0)
            
            if loc > self.GOD_FILE_LOC or complexity > self.GOD_FILE_COMPLEXITY:
                metrics = self.graph_builder.get_file_metrics(file_path)
                
                risk = Risk(
                    title="God File Detected",
                    files=[file_path],
                    evidence=f"File has {loc} lines of code and complexity score of {complexity}. "
                             f"Depended on by {metrics.get('in_degree', 0)} other files.",
                    why_it_matters="Large, complex files are harder to maintain, test, and understand. "
                                   "They often violate Single Responsibility Principle and become bottlenecks for changes.",
                    suggested_action=f"Consider breaking {file_path} into smaller, focused modules. "
                                    "Extract related functionality into separate files with clear responsibilities.",
                    confidence=RiskLevel.HIGH if loc > self.GOD_FILE_LOC * 1.5 else RiskLevel.MEDIUM
                )
                risks.append(risk)
        
        return risks
    
    def _detect_circular_dependencies(self) -> List[Risk]:
        """Detect circular dependencies between files."""
        risks = []
        
        try:
            cycles = list(nx.simple_cycles(self.graph))
            
            for cycle in cycles:
                if len(cycle) > 1:  # Ignore self-loops
                    risk = Risk(
                        title="Circular Dependency",
                        files=cycle,
                        evidence=f"Files form a circular dependency chain: {' -> '.join(cycle)} -> {cycle[0]}",
                        why_it_matters="Circular dependencies make code harder to test, refactor, and understand. "
                                       "They create tight coupling and can lead to import errors or initialization issues.",
                        suggested_action="Break the cycle by introducing an abstraction layer, using dependency injection, "
                                       "or restructuring the code to have a clear hierarchy.",
                        confidence=RiskLevel.HIGH
                    )
                    risks.append(risk)
        except Exception as e:
            logger.warning(f"Error detecting circular dependencies: {e}")
        
        return risks
    
    def _detect_high_coupling(self) -> List[Risk]:
        """Detect files with high fan-in (many dependents) or fan-out (many dependencies)."""
        risks = []
        
        for file_path in self.graph.nodes():
            metrics = self.graph_builder.get_file_metrics(file_path)
            in_degree = metrics.get('in_degree', 0)
            out_degree = metrics.get('out_degree', 0)
            
            if in_degree >= self.HIGH_FAN_IN:
                risk = Risk(
                    title="High Fan-In (Central File)",
                    files=[file_path],
                    evidence=f"File is depended upon by {in_degree} other files. "
                             f"Dependents: {', '.join(metrics.get('dependents', [])[:5])}",
                    why_it_matters="Files with many dependents become critical change points. "
                                   "Any modification ripples through many parts of the codebase, increasing risk of bugs.",
                    suggested_action="Consider if this file has too many responsibilities. "
                                    "Extract interfaces or abstract base classes to reduce direct coupling.",
                    confidence=RiskLevel.MEDIUM
                )
                risks.append(risk)
            
            if out_degree >= self.HIGH_FAN_OUT:
                risk = Risk(
                    title="High Fan-Out (Excessive Dependencies)",
                    files=[file_path],
                    evidence=f"File depends on {out_degree} other files. "
                             f"Dependencies: {', '.join(metrics.get('dependencies', [])[:5])}",
                    why_it_matters="Files with many dependencies are fragile and hard to test. "
                                   "They're tightly coupled to many parts of the system.",
                    suggested_action="Apply dependency injection or use facade pattern to reduce direct dependencies. "
                                    "Consider if this file is doing too much.",
                    confidence=RiskLevel.MEDIUM
                )
                risks.append(risk)
        
        return risks
    
    def _detect_missing_abstraction(self) -> List[Risk]:
        """Detect potential missing abstraction layers."""
        risks = []
        
        # Look for files that might be mixing concerns
        # Heuristic: files with both database and HTTP/API related code
        db_keywords = {'database', 'db', 'model', 'schema', 'query', 'mongo', 'sql'}
        api_keywords = {'api', 'route', 'endpoint', 'controller', 'handler', 'view'}
        
        for file_path, info in self.file_info.items():
            file_lower = file_path.lower()
            
            # Check if file name suggests mixing layers
            has_db = any(kw in file_lower for kw in db_keywords)
            has_api = any(kw in file_lower for kw in api_keywords)
            
            if has_db and has_api:
                risk = Risk(
                    title="Potential Layer Violation",
                    files=[file_path],
                    evidence=f"File appears to mix database and API concerns based on naming and structure.",
                    why_it_matters="Mixing architectural layers (e.g., database access in controllers) "
                                   "makes code harder to test and violates separation of concerns.",
                    suggested_action="Introduce a service layer to separate business logic from controllers. "
                                    "Keep database access in dedicated repository or data access files.",
                    confidence=RiskLevel.LOW
                )
                risks.append(risk)
        
        return risks
