"""
Crew Configuration Template

This file shows how to orchestrate agents and tasks into a Crew.
A Crew combines:
- agents: List of agents that can work together
- tasks: List of tasks to be completed
- process: How agents collaborate (sequential, hierarchical, consensual)
- verbose: Whether to show detailed execution logs
"""

from crewai import Crew, Process
from config.agents_config import (
    researcher_agent,
    mortgage_market_researcher,
    property_analyst,
    risk_assessor,
)
from config.tasks_config import (
    research_task,
    property_analysis_task,
    risk_assessment_task,
    mortgage_market_research,
)

# Example: Sequential Process Crew
# Tasks are completed one after another in order
sequential_crew = Crew(
    agents=[researcher_agent, property_analyst],
    tasks=[research_task, property_analysis_task],
    process=Process.sequential,  # One task after another
    verbose=True,
)

# Example: Hierarchical Process Crew
# A manager agent delegates tasks to other agents
hierarchical_crew = Crew(
    agents=[researcher_agent, property_analyst, risk_assessor],
    tasks=[research_task, property_analysis_task, risk_assessment_task],
    process=Process.hierarchical,  # Manager delegates tasks
    manager_llm=None,  # Uses default, or specify: ChatOpenAI(model="gpt-4")
    verbose=True,
)

# Example: Consensual Process Crew
# All agents discuss and reach consensus on tasks
consensual_crew = Crew(
    agents=[mortgage_market_researcher, property_analyst, risk_assessor],
    tasks=[mortgage_market_research, property_analysis_task, risk_assessment_task],
    process=Process.consensual,  # Agents discuss and agree
    verbose=True,
)

# Example: Research Crew for Private Mortgages
mortgage_research_crew = Crew(
    agents=[
        mortgage_market_researcher,
        property_analyst,
        risk_assessor,
    ],
    tasks=[
        mortgage_market_research,
        property_analysis_task,
        risk_assessment_task,
    ],
    process=Process.sequential,  # Start with market research, then property, then risk
    verbose=True,
)

# Template for creating your own crew:
def create_custom_crew(agents, tasks, process_type="sequential", manager_llm=None):
    """
    Template function for creating custom crews.
    
    Args:
        agents: List of Agent instances
        tasks: List of Task instances
        process_type: "sequential", "hierarchical", or "consensual"
        manager_llm: Optional LLM for hierarchical process manager
    
    Returns:
        Configured Crew instance
    """
    process_map = {
        "sequential": Process.sequential,
        "hierarchical": Process.hierarchical,
        "consensual": Process.consensual,
    }
    
    crew_kwargs = {
        "agents": agents,
        "tasks": tasks,
        "process": process_map.get(process_type, Process.sequential),
        "verbose": True,
    }
    
    if process_type == "hierarchical" and manager_llm:
        crew_kwargs["manager_llm"] = manager_llm
    
    return Crew(**crew_kwargs)

# Process Types Explained:
"""
1. Sequential Process:
   - Tasks execute one after another in order
   - Each agent completes their task before next starts
   - Good for: Linear workflows, dependencies between tasks
   - Example: Research → Analysis → Report

2. Hierarchical Process:
   - Manager agent coordinates and delegates
   - Manager decides which agent handles which task
   - Good for: Complex workflows, dynamic task assignment
   - Example: Manager reviews all tasks, assigns to specialists

3. Consensual Process:
   - All agents discuss tasks together
   - Reach consensus on approach and execution
   - Good for: Collaborative decision-making, complex problems
   - Example: Team meeting to decide on research strategy
"""


