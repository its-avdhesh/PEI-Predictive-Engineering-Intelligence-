import os
import ast
import re
from pathlib import Path
from typing import Dict, List, Set, Tuple
import logging
import networkx as nx

logger = logging.getLogger(__name__)

class PythonAnalyzer:
    """Analyzes Python code for architectural patterns and risks."""
    
    @staticmethod
    def analyze_file(file_path: Path) -> Dict:
        """Analyze a single Python file."""
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                tree = ast.parse(content)
            
            imports = PythonAnalyzer._extract_imports(tree)
            functions = PythonAnalyzer._extract_functions(tree)
            classes = PythonAnalyzer._extract_classes(tree)
            loc = len([l for l in content.split('\n') if l.strip()])
            
            return {
                'imports': imports,
                'functions': functions,
                'classes': classes,
                'loc': loc,
                'complexity': len(functions) + len(classes)
            }
        except Exception as e:
            logger.warning(f"Error analyzing {file_path}: {e}")
            return {'imports': [], 'functions': [], 'classes': [], 'loc': 0, 'complexity': 0}
    
    @staticmethod
    def _extract_imports(tree: ast.AST) -> List[str]:
        imports = []
        for node in ast.walk(tree):
            if isinstance(node, ast.Import):
                for alias in node.names:
                    imports.append(alias.name)
            elif isinstance(node, ast.ImportFrom):
                if node.module:
                    imports.append(node.module)
        return imports
    
    @staticmethod
    def _extract_functions(tree: ast.AST) -> List[str]:
        functions = []
        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef):
                functions.append(node.name)
        return functions
    
    @staticmethod
    def _extract_classes(tree: ast.AST) -> List[str]:
        classes = []
        for node in ast.walk(tree):
            if isinstance(node, ast.ClassDef):
                classes.append(node.name)
        return classes

class JavaScriptAnalyzer:
    """Analyzes JavaScript/TypeScript code for architectural patterns and risks."""
    
    @staticmethod
    def analyze_file(file_path: Path) -> Dict:
        """Analyze a single JavaScript/TypeScript file."""
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            imports = JavaScriptAnalyzer._extract_imports(content)
            exports = JavaScriptAnalyzer._extract_exports(content)
            functions = JavaScriptAnalyzer._extract_functions(content)
            loc = len([l for l in content.split('\n') if l.strip()])
            
            return {
                'imports': imports,
                'exports': exports,
                'functions': functions,
                'loc': loc,
                'complexity': len(functions)
            }
        except Exception as e:
            logger.warning(f"Error analyzing {file_path}: {e}")
            return {'imports': [], 'exports': [], 'functions': [], 'loc': 0, 'complexity': 0}
    
    @staticmethod
    def _extract_imports(content: str) -> List[str]:
        imports = []
        # Match ES6 imports
        import_patterns = [
            r"import\s+.*?from\s+['\"]([^'\"]+)['\"]",
            r"require\(['\"]([^'\"]+)['\"]\)"
        ]
        for pattern in import_patterns:
            matches = re.findall(pattern, content)
            imports.extend(matches)
        return imports
    
    @staticmethod
    def _extract_exports(content: str) -> List[str]:
        exports = []
        export_patterns = [
            r"export\s+(?:default\s+)?(?:class|function|const|let|var)\s+(\w+)",
            r"export\s+\{([^}]+)\}"
        ]
        for pattern in export_patterns:
            matches = re.findall(pattern, content)
            for match in matches:
                if '{' not in str(match):
                    exports.append(str(match))
        return exports
    
    @staticmethod
    def _extract_functions(content: str) -> List[str]:
        function_patterns = [
            r"function\s+(\w+)\s*\(",
            r"const\s+(\w+)\s*=\s*(?:async\s+)?\([^)]*\)\s*=>",
            r"(\w+)\s*:\s*(?:async\s+)?function"
        ]
        functions = []
        for pattern in function_patterns:
            matches = re.findall(pattern, content)
            functions.extend(matches)
        return functions
