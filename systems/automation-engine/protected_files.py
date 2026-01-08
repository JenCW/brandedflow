"""
Protected Files System
Defines which files require manual approval before updates
"""

from pathlib import Path

class ProtectedFiles:
    """
    Manages list of protected files that require manual approval.
    """
    
    # Critical files that ALWAYS require manual approval
    CRITICAL_FILES = [
        # Root level critical files
        "MASTER_RULES.md",
        "AI_RULES.md",
        
        # Core documentation
        "docs/internal/CONTEXT.md",
        "docs/internal/DECISIONS_LOG.md",
        "docs/internal/AI_RULES.md",
        
        # DOE Engine core
        "systems/doe-engine/gemini.md",
        "systems/doe-engine/directives/.template.md",
        
        # System configs
        ".cursorrules",
        ".claude_code_rules",
        
        # Client profiles (critical data)
        "clients/*/client-profile.json",
        
        # Status tracking (critical data)
        "systems/trackers/item_status.json",
        "systems/trackers/decision_versions.json",
        
        # MCP server config
        "systems/mcp-server/.env",
        "systems/mcp-server/package.json",
        
        # Automation engine core
        "systems/automation-engine/maintenance_agent.py",
        "systems/automation-engine/apply_updates.py",
        "systems/automation-engine/protected_files.py",
        
        # Daily accountability (live system)
        "systems/daily-accountability/active_work.json",
        
        # Dashboard core
        "systems/dashboard/html/index.html",
    ]
    
    # Protected patterns (files matching these patterns require approval)
    PROTECTED_PATTERNS = [
        "**/RULES.md",
        "**/README.md",
        "**/CONTEXT.md",
        "**/DECISIONS_LOG.md",
        "**/*.env",
        "**/package.json",
        "**/package-lock.json",
        "**/client-profile.json",
        "**/item_status.json",
        "**/decision_versions.json",
        "**/active_work.json",
        "**/.gitignore",
        "**/.cursorrules",
        "**/.claude_code_rules",
    ]
    
    # Protected directories (entire directories that require approval)
    PROTECTED_DIRECTORIES = [
        "systems/doe-engine/directives/",
        "automations/mcps/",
        "systems/mcp-server/",
        "systems/automation-engine/",
        "systems/daily-accountability/",
        "systems/dashboard/",
    ]
    
    def __init__(self, project_root: Path):
        self.project_root = Path(project_root)
    
    def is_protected(self, file_path: str) -> bool:
        """
        Check if a file is protected (requires manual approval).
        
        Args:
            file_path: Relative path from project root
            
        Returns:
            True if file requires manual approval
        """
        file_path_obj = Path(file_path)
        
        # Check exact matches
        if file_path in self.CRITICAL_FILES:
            return True
        
        # Check if in protected directory
        for protected_dir in self.PROTECTED_DIRECTORIES:
            protected_path = Path(protected_dir)
            # Check if file is within protected directory
            try:
                file_path_obj.relative_to(protected_path)
                return True
            except ValueError:
                # Not in this protected directory
                pass
        
        # Check patterns
        for pattern in self.PROTECTED_PATTERNS:
            if self._matches_pattern(file_path, pattern):
                return True
        
        return False
    
    def _matches_pattern(self, file_path: str, pattern: str) -> bool:
        """Check if file path matches a pattern."""
        from fnmatch import fnmatch
        
        # Convert pattern to fnmatch format
        # **/ means match in any directory
        if pattern.startswith("**/"):
            pattern = pattern[3:]
            # Check if filename matches
            return fnmatch(Path(file_path).name, pattern) or fnmatch(file_path, pattern)
        else:
            return fnmatch(file_path, pattern)
    
    def requires_approval(self, file_path: str) -> bool:
        """Alias for is_protected - clearer name."""
        return self.is_protected(file_path)
    
    def get_protection_reason(self, file_path: str) -> str:
        """Get reason why file is protected."""
        file_path_obj = Path(file_path)
        
        # Check exact matches
        if file_path in self.CRITICAL_FILES:
            return f"Critical file: {file_path}"
        
        # Check if in protected directory
        for protected_dir in self.PROTECTED_DIRECTORIES:
            protected_path = Path(protected_dir)
            try:
                file_path_obj.relative_to(protected_path)
                return f"Protected directory: {protected_dir}"
            except ValueError:
                pass
        
        # Check patterns
        for pattern in self.PROTECTED_PATTERNS:
            if self._matches_pattern(file_path, pattern):
                return f"Matches protected pattern: {pattern}"
        
        return "Not protected"
    
    def filter_protected(self, updates: dict) -> dict:
        """
        Filter updates to separate protected and non-protected files.
        
        Args:
            updates: Dict of {file_path: new_content}
            
        Returns:
            Dict with 'protected' and 'unprotected' keys
        """
        protected = {}
        unprotected = {}
        
        for file_path, content in updates.items():
            if self.is_protected(file_path):
                protected[file_path] = content
            else:
                unprotected[file_path] = content
        
        return {
            "protected": protected,
            "unprotected": unprotected,
            "requires_approval": len(protected) > 0
        }

