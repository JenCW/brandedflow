"""
Foundational Document Updater
Updates foundational documents (operating manual, master guide, CONTEXT.md, etc.)
when decisions are made that affect them.
"""

from pathlib import Path
from datetime import datetime
import json
import re
import sys

# Handle both relative and absolute imports
try:
    from .decision_versioning import DecisionVersioning
except ImportError:
    # If running as script, use absolute import
    sys.path.insert(0, str(Path(__file__).parent))
    from decision_versioning import DecisionVersioning

class FoundationalDocUpdater:
    """
    Detects when decisions affect foundational documents and proposes updates.
    """
    
    # Foundational documents that should be updated
    FOUNDATIONAL_DOCS = {
        "docs/internal/CONTEXT.md": {
            "description": "Project context and current state",
            "triggers": ["context", "status", "priority", "current", "state"]
        },
        "docs/internal/DECISIONS_LOG.md": {
            "description": "Log of all major decisions",
            "triggers": ["decision", "decide", "chose", "selected"]
        },
        "docs/processes/BRANDED_FLOW_OPERATIONS_MANUAL (2).md": {
            "description": "Branded Flow operations manual",
            "triggers": ["process", "workflow", "operation", "procedure", "method", "business", "run"]
        },
        "docs/training/MASTER_BRAND_GUIDE.md": {
            "description": "Master brand guide",
            "triggers": ["brand", "branding", "identity", "visual", "design"]
        },
        "MASTER_RULES.md": {
            "description": "Master rules document",
            "triggers": ["rule", "policy", "standard", "guideline"]
        },
        "docs/internal/AI_RULES.md": {
            "description": "AI rules and guidelines",
            "triggers": ["ai", "assistant", "cursor", "claude", "automation"]
        },
        "systems/doe-engine/gemini.md": {
            "description": "DOE engine documentation",
            "triggers": ["doe", "directive", "orchestrate", "execute", "mcp"]
        }
    }
    
    def __init__(self, repo_root: Path, trackers_path: Path):
        self.repo_root = Path(repo_root)
        self.trackers = Path(trackers_path)
        self.pending_updates_file = trackers_path / "foundational_doc_updates_pending.json"
        self.decision_versioning = DecisionVersioning(trackers_path)
    
    def analyze_decisions_for_updates(self, decisions):
        """
        Analyze decisions to see if foundational docs need updates.
        Returns list of proposed updates.
        """
        proposed_updates = []
        
        for decision in decisions:
            # Check if decision affects any foundational docs
            affected_docs = self._find_affected_docs(decision)
            
            if affected_docs:
                for doc_path, reason in affected_docs:
                    proposed_updates.append({
                        "decision": decision,
                        "document": doc_path,
                        "reason": reason,
                        "timestamp": datetime.now().isoformat(),
                        "status": "pending"
                    })
        
        # Save pending updates
        if proposed_updates:
            self._save_pending_updates(proposed_updates)
        
        return proposed_updates
    
    def _find_affected_docs(self, decision):
        """Find which foundational docs are affected by a decision."""
        affected = []
        decision_lower = decision.lower()
        
        for doc_path, doc_info in self.FOUNDATIONAL_DOCS.items():
            # Check if decision mentions any trigger words
            for trigger in doc_info["triggers"]:
                if trigger in decision_lower:
                    affected.append((doc_path, f"Decision mentions '{trigger}' - affects {doc_info['description']}"))
                    break
        
        return affected
    
    def get_pending_updates(self):
        """Get list of pending foundational doc updates."""
        if not self.pending_updates_file.exists():
            return []
        
        try:
            with open(self.pending_updates_file, 'r') as f:
                updates = json.load(f)
            # Filter to only pending
            return [u for u in updates if u.get("status") == "pending"]
        except:
            return []
    
    def generate_update_proposal(self, decision, doc_path):
        """
        Generate a proposed update for a foundational document.
        Returns the proposed new content.
        """
        doc_file = self.repo_root / doc_path
        
        if not doc_file.exists():
            return None
        
        current_content = doc_file.read_text(errors="ignore")
        
        # Generate update based on document type
        if "CONTEXT.md" in doc_path:
            return self._update_context(current_content, decision)
        elif "DECISIONS_LOG.md" in doc_path:
            return self._update_decisions_log(current_content, decision)
        elif "OPERATIONS_MANUAL" in doc_path:
            return self._update_operations_manual(current_content, decision)
        elif "MASTER_RULES.md" in doc_path:
            return self._update_master_rules(current_content, decision)
        elif "AI_RULES.md" in doc_path:
            return self._update_ai_rules(current_content, decision)
        elif "gemini.md" in doc_path:
            return self._update_doe_docs(current_content, decision)
        elif "MASTER_BRAND_GUIDE" in doc_path:
            return self._update_master_brand_guide(current_content, decision)
        else:
            return None
    
    def _update_context(self, current_content, decision):
        """Update CONTEXT.md with new decision."""
        # Find the decisions section or add one
        if "## Recent Decisions" in current_content or "## Decisions" in current_content:
            # Add to existing section
            lines = current_content.split("\n")
            insert_idx = None
            for i, line in enumerate(lines):
                if "## Recent Decisions" in line or "## Decisions" in line:
                    insert_idx = i + 1
                    break
            
            if insert_idx:
                # Find next section or end
                for i in range(insert_idx, len(lines)):
                    if lines[i].startswith("##"):
                        insert_idx = i
                        break
                else:
                    insert_idx = len(lines)
                
                # Insert decision
                decision_line = f"- {decision} (Updated: {datetime.now().strftime('%Y-%m-%d')})"
                lines.insert(insert_idx, decision_line)
                return "\n".join(lines)
        else:
            # Add new section
            return current_content + f"\n\n## Recent Decisions\n\n- {decision} (Updated: {datetime.now().strftime('%Y-%m-%d')})\n"
        
        return current_content
    
    def _update_decisions_log(self, current_content, decision):
        """Update DECISIONS_LOG.md with new decision."""
        # Add decision with timestamp
        timestamp = datetime.now().strftime("%Y-%m-%d")
        new_entry = f"\n## {timestamp}\n\n- {decision}\n"
        return current_content + new_entry
    
    def _update_operations_manual(self, current_content, decision):
        """Update operations manual if decision affects processes."""
        # This would need more sophisticated logic
        # For now, add to a "Recent Updates" section
        if "## Recent Updates" in current_content:
            lines = current_content.split("\n")
            insert_idx = None
            for i, line in enumerate(lines):
                if "## Recent Updates" in line:
                    insert_idx = i + 1
                    break
            
            if insert_idx:
                timestamp = datetime.now().strftime("%Y-%m-%d")
                new_line = f"- {decision} ({timestamp})"
                lines.insert(insert_idx, new_line)
                return "\n".join(lines)
        else:
            timestamp = datetime.now().strftime("%Y-%m-%d")
            return current_content + f"\n\n## Recent Updates\n\n- {decision} ({timestamp})\n"
        
        return current_content
    
    def _update_master_rules(self, current_content, decision):
        """Update MASTER_RULES.md if decision affects rules."""
        # Similar to operations manual
        if "## Recent Updates" in current_content:
            lines = current_content.split("\n")
            insert_idx = None
            for i, line in enumerate(lines):
                if "## Recent Updates" in line:
                    insert_idx = i + 1
                    break
            
            if insert_idx:
                timestamp = datetime.now().strftime("%Y-%m-%d")
                new_line = f"- {decision} ({timestamp})"
                lines.insert(insert_idx, new_line)
                return "\n".join(lines)
        else:
            timestamp = datetime.now().strftime("%Y-%m-%d")
            return current_content + f"\n\n## Recent Updates\n\n- {decision} ({timestamp})\n"
        
        return current_content
    
    def _update_ai_rules(self, current_content, decision):
        """Update AI_RULES.md if decision affects AI rules."""
        return self._update_master_rules(current_content, decision)
    
    def _update_doe_docs(self, current_content, decision):
        """Update DOE docs if decision affects DOE method."""
        return self._update_master_rules(current_content, decision)
    
    def _update_master_brand_guide(self, current_content, decision):
        """Update master brand guide if decision affects branding."""
        return self._update_master_rules(current_content, decision)
    
    def _save_pending_updates(self, updates):
        """Save pending updates to file."""
        existing = []
        if self.pending_updates_file.exists():
            try:
                with open(self.pending_updates_file, 'r') as f:
                    existing = json.load(f)
            except:
                existing = []
        
        # Add new updates (avoid duplicates)
        existing_decision_doc_pairs = {(u["decision"], u["document"]) for u in existing if u.get("status") == "pending"}
        for update in updates:
            key = (update["decision"], update["document"])
            if key not in existing_decision_doc_pairs:
                existing.append(update)
        
        with open(self.pending_updates_file, 'w') as f:
            json.dump(existing, f, indent=2)
    
    def mark_update_applied(self, decision, doc_path):
        """Mark an update as applied."""
        if not self.pending_updates_file.exists():
            return
        
        try:
            with open(self.pending_updates_file, 'r') as f:
                updates = json.load(f)
            
            for update in updates:
                if update["decision"] == decision and update["document"] == doc_path:
                    update["status"] = "applied"
                    update["applied_at"] = datetime.now().isoformat()
            
            with open(self.pending_updates_file, 'w') as f:
                json.dump(updates, f, indent=2)
        except:
            pass

