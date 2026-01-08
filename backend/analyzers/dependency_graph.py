import os
from pathlib import Path
from typing import Dict, List, Set
import logging
import networkx as nx
from analyzers.code_parser import PythonAnalyzer, JavaScriptAnalyzer

logger = logging.getLogger(__name__)

class DependencyGraphBuilder:
    """Builds dependency graph for multi-file code understanding."""
    
    def __init__(self, repo_path: Path, primary_language: str):
        self.repo_path = repo_path
        self.primary_language = primary_language
        self.graph = nx.DiGraph()
        self.file_info = {}
    
    def build_graph(self) -> nx.DiGraph:
        """Build dependency graph for the repository."""
        # First pass: analyze all files
        for root, dirs, files in os.walk(self.repo_path):
            dirs[:] = [d for d in dirs if d not in {
                '.git', 'node_modules', '__pycache__', '.venv', 'venv',
                'build', 'dist', '.next', 'coverage'
            }]
            
            for file in files:
                file_path = Path(root) / file
                ext = file_path.suffix.lower()
                
                if self._should_analyze_file(ext):
                    relative_path = file_path.relative_to(self.repo_path)
                    analysis = self._analyze_file(file_path, ext)
                    
                    if analysis:
                        self.file_info[str(relative_path)] = analysis
                        self.graph.add_node(
                            str(relative_path),
                            **analysis
                        )
        
        # Second pass: build edges based on imports
        self._build_edges()
        
        return self.graph
    
    def _should_analyze_file(self, ext: str) -> bool:
        """Check if file should be analyzed."""
        python_exts = {'.py'}
        js_exts = {'.js', '.jsx', '.ts', '.tsx'}
        
        if 'python' in self.primary_language.lower():
            return ext in python_exts
        elif 'javascript' in self.primary_language.lower() or 'typescript' in self.primary_language.lower():
            return ext in js_exts
        else:
            return ext in python_exts or ext in js_exts
    
    def _analyze_file(self, file_path: Path, ext: str) -> Dict:
        """Analyze a file based on its extension."""
        if ext == '.py':
            return PythonAnalyzer.analyze_file(file_path)
        elif ext in {'.js', '.jsx', '.ts', '.tsx'}:
            return JavaScriptAnalyzer.analyze_file(file_path)
        return None
    
    def _build_edges(self):
        """Build edges between files based on imports."""
        for file_path, info in self.file_info.items():
            imports = info.get('imports', [])
            
            for imp in imports:
                # Try to resolve import to actual file
                target_file = self._resolve_import(file_path, imp)
                if target_file and target_file in self.file_info:
                    self.graph.add_edge(file_path, target_file)
    
    def _resolve_import(self, source_file: str, import_name: str) -> str:
        """Resolve import to actual file path."""
        # Simple heuristic-based resolution
        # For relative imports
        if import_name.startswith('.'):
            source_dir = Path(source_file).parent
            resolved = (source_dir / import_name).with_suffix('.py')
            if str(resolved) in self.file_info:
                return str(resolved)
        
        # For absolute imports, try to find matching file
        import_parts = import_name.replace('.', '/').replace('-', '_')
        for file_path in self.file_info.keys():
            if import_parts in file_path:
                return file_path
        
        return None
    
    def get_file_metrics(self, file_path: str) -> Dict:
        """Get metrics for a specific file."""
        if file_path not in self.graph:
            return {}
        
        return {
            'in_degree': self.graph.in_degree(file_path),
            'out_degree': self.graph.out_degree(file_path),
            'dependents': list(self.graph.predecessors(file_path)),
            'dependencies': list(self.graph.successors(file_path))
        }
