#!/usr/bin/env python3
"""
Sync folder-level .cursorrules files to a minimal, non-drifting stub.

Goal:
- Keep DOE enforcement undeniable (hard-stop message appears even if Cursor opens in subfolder)
- Avoid massive duplicated rulebooks in every folder
- Make it deterministic and repeatable
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path


@dataclass(frozen=True)
class Target:
    rel_path: str
    label: str


TARGETS: list[Target] = [
    Target("automations/.cursorrules", "Automations"),
    Target("clients/.cursorrules", "Clients"),
    Target("company/.cursorrules", "Company"),
    Target("company/website/.cursorrules", "Company Website"),
    Target("company/website/site/.cursorrules", "Company Website Site"),
    Target("docs/.cursorrules", "Docs"),
    Target("systems/.cursorrules", "Systems"),
    Target("templates/.cursorrules", "Templates"),
]


def stub(label: str) -> str:
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    return "\n".join(
        [
            "# AUTO-GENERATED — DO NOT EDIT",
            f"# Updated: {ts}",
            f"# Scope: {label}",
            "",
            "# 🚨 HARD STOP — MCP ENFORCEMENT 🚨",
            "",
            "Before responding to ANY request:",
            "",
            "1. Call `systems/mcp-server/enforce-directive-check.js`",
            "2. If status === \"BLOCKED\", you MUST:",
            "   - Search `systems/doe-engine/directives/`",
            "   - Explicitly report results",
            "   - Wait for user confirmation",
            "3. You may NOT proceed until status is cleared",
            "",
            "",
            "# ✅ REQUIRED WORKSPACE RULE",
            "",
            "This repo must be opened in Cursor at the ROOT:",
            "`/Users/jennifercortez-walters/brandedflow/`",
            "",
            "If you are reading this from a subfolder: STOP and reopen Cursor at the repo root.",
            "",
            "# Why this exists:",
            "- Prevent subfolder sessions from bypassing DOE enforcement",
            "- Prevent duplicated rulebooks from drifting across folders",
            "",
            "",
        ]
    )


def main() -> int:
    repo_root = Path(__file__).resolve().parents[2]

    for target in TARGETS:
        path = repo_root / target.rel_path
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(stub(target.label), encoding="utf-8")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

