"""
CrewAI Agent Template for Branded Flow Projects
Follows DOE Architecture with sequential process execution
"""

from crewai import Agent, Task, Crew, Process
from pydantic import BaseModel, Field
from typing import List, Optional
import os

# ============================================
# PYDANTIC MODELS FOR STRUCTURED OUTPUT
# ============================================

class TaskPlan(BaseModel):
    """Structured plan for task execution"""
    objectives: List[str] = Field(description="Clear goals and expected outcomes")
    proposed_changes: List[str] = Field(description="Specific files and modifications")
    logic_edge_cases: List[str] = Field(description="All scenarios to handle")
    fe_be_separation: dict = Field(description="Frontend/backend responsibilities")
    dependencies: List[str] = Field(description="Required libraries, services, or data")
    estimated_complexity: str = Field(description="Simple / Medium / Complex")

class ImplementationResult(BaseModel):
    """Structured result from implementation"""
    files_created: List[str] = Field(description="New files created")
    files_modified: List[str] = Field(description="Files modified")
    tests_written: List[str] = Field(description="Test files created")
    errors_encountered: List[str] = Field(description="Any errors and resolutions")
    performance_impact: str = Field(description="Estimated performance impact")
    seo_considerations: List[str] = Field(description="SEO changes made")

class QualityCheckResult(BaseModel):
    """Structured quality assurance result"""
    linting_passed: bool = Field(description="Whether linting passed")
    type_checking_passed: bool = Field(description="Whether type checking passed")
    tests_passed: bool = Field(description="Whether tests passed")
    pagespeed_score: Optional[int] = Field(description="Lighthouse performance score")
    seo_score: Optional[int] = Field(description="Lighthouse SEO score")
    issues_found: List[str] = Field(description="Issues that need attention")

# ============================================
# AGENT DEFINITIONS
# ============================================

def create_researcher_agent() -> Agent:
    """Creates a researcher agent that analyzes codebase and requirements"""
    return Agent(
        role='Codebase Researcher',
        goal='Thoroughly research the codebase, documentation, and requirements to understand context and patterns',
        backstory="""You are an expert codebase researcher with deep understanding of
        software architecture. Your role is to analyze existing code, documentation,
        and requirements to build comprehensive understanding before any implementation.""",
        verbose=True,
        allow_delegation=False,
        tools=[]  # Add tools as needed (file readers, code analyzers, etc.)
    )

def create_planner_agent() -> Agent:
    """Creates a planner agent that creates detailed implementation blueprints"""
    return Agent(
        role='Implementation Planner',
        goal='Create detailed, step-by-step implementation plans following Blueprint-First approach',
        backstory="""You are a senior software architect specializing in creating
        comprehensive implementation plans. You understand the importance of
        Blueprint-First approach and always create detailed plans before any code
        is written. You ensure all edge cases, FE/BE separation, and dependencies
        are clearly documented.""",
        verbose=True,
        allow_delegation=False,
        tools=[]  # Add tools as needed
    )

def create_implementer_agent() -> Agent:
    """Creates an implementer agent that writes code following approved plans"""
    return Agent(
        role='Code Implementer',
        goal='Implement code strictly following approved blueprints with high quality standards',
        backstory="""You are an expert full-stack developer who writes pristine,
        enterprise-ready code. You strictly follow approved blueprints, maintain
        code quality, ensure type safety, write tests, and consider performance
        and SEO in every implementation.""",
        verbose=True,
        allow_delegation=False,
        tools=[]  # Add code generation tools
    )

def create_quality_agent() -> Agent:
    """Creates a quality assurance agent that validates code quality"""
    return Agent(
        role='Quality Assurance Specialist',
        goal='Ensure all code meets quality standards including linting, testing, performance, and SEO',
        backstory="""You are a meticulous QA specialist who ensures every line of
        code meets the highest standards. You check for linting errors, type safety,
        test coverage, performance optimization, and SEO compliance. Nothing gets
        past you without meeting all quality criteria.""",
        verbose=True,
        allow_delegation=False,
        tools=[]  # Add linting, testing, performance analysis tools
    )

# ============================================
# TASK DEFINITIONS
# ============================================

def create_research_task(description: str, context: dict) -> Task:
    """Creates a research task"""
    return Task(
        description=f"""
        Research and analyze:
        {description}

        Context:
        {context}

        Deliver a comprehensive analysis of:
        1. Existing codebase patterns
        2. Relevant documentation
        3. Similar implementations
        4. Potential challenges
        """,
        agent=create_researcher_agent(),
        expected_output="Comprehensive research report with findings and recommendations"
    )

def create_planning_task(description: str, research_output: str) -> Task:
    """Creates a planning task that generates a blueprint"""
    return Task(
        description=f"""
        Based on the research findings, create a detailed implementation blueprint:

        Requirement: {description}

        Research Findings:
        {research_output}

        Create a blueprint with:
        1. Clear objectives
        2. Proposed changes (specific files)
        3. Logic and edge cases
        4. FE/BE separation
        5. Dependencies
        6. Implementation steps

        Use structured output format (TaskPlan).
        """,
        agent=create_planner_agent(),
        expected_output="Detailed implementation blueprint in TaskPlan format"
    )

def create_implementation_task(blueprint: str) -> Task:
    """Creates an implementation task"""
    return Task(
        description=f"""
        Implement the code following this approved blueprint:

        {blueprint}

        Requirements:
        - Follow the blueprint EXACTLY
        - Write clean, type-safe code
        - Include error handling
        - Write unit tests
        - Consider performance optimization
        - Include SEO best practices
        - Maintain file/folder structure
        - Use shared schemas for type safety

        Use structured output format (ImplementationResult).
        """,
        agent=create_implementer_agent(),
        expected_output="Implemented code with ImplementationResult documentation"
    )

def create_quality_task(implementation_result: str) -> Task:
    """Creates a quality assurance task"""
    return Task(
        description=f"""
        Perform comprehensive quality assurance on:

        {implementation_result}

        Check:
        1. Linting passes (no errors)
        2. Type checking passes
        3. Tests pass and have good coverage
        4. Performance metrics meet targets (Lighthouse)
        5. SEO best practices followed
        6. Code follows project standards

        Use structured output format (QualityCheckResult).
        """,
        agent=create_quality_agent(),
        expected_output="Quality check report with QualityCheckResult"
    )

# ============================================
# CREW ORCHESTRATION
# ============================================

def create_project_crew(requirement: str, context: dict = None) -> Crew:
    """Creates a crew for a complete project workflow"""

    # Create agents
    researcher = create_researcher_agent()
    planner = create_planner_agent()
    implementer = create_implementer_agent()
    quality = create_quality_agent()

    # Create tasks in sequence
    research_task = create_research_task(requirement, context or {})
    planning_task = create_planning_task(requirement, "{{research_task.output}}")
    implementation_task = create_implementation_task("{{planning_task.output}}")
    quality_task = create_quality_task("{{implementation_task.output}}")

    # Create crew with SEQUENTIAL process (MANDATORY)
    crew = Crew(
        agents=[researcher, planner, implementer, quality],
        tasks=[research_task, planning_task, implementation_task, quality_task],
        process=Process.sequential,  # MANDATORY: Sequential for reliability
        verbose=True,
        memory=True,  # Enable memory for context retention
        max_iter=3,  # Limit iterations for safety
        max_rpm=10  # Rate limiting
    )

    return crew

# ============================================
# USAGE EXAMPLE
# ============================================

if __name__ == "__main__":
    # Example usage
    requirement = """
    Build a user profile page component that:
    - Displays user information
    - Allows profile editing
    - Is SEO optimized
    - Meets pagespeed targets
    - Follows brand guidelines
    """

    context = {
        "project": "Branded Flow Website",
        "framework": "Next.js",
        "styling": "Tailwind CSS + Shadcn/ui",
        "backend": "FastAPI"
    }

    crew = create_project_crew(requirement, context)

    # Execute crew
    result = crew.kickoff()

    print("Crew execution completed:")
    print(result)
