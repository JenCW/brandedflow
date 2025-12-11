"""
Basic CrewAI Example

This is a minimal working example to understand the core concepts:
1. Define agents
2. Define tasks
3. Create a crew
4. Execute the crew

Run this example:
    python examples/basic_crew.py
"""

import os
from dotenv import load_dotenv
from crewai import Agent, Task, Crew, Process

# Load environment variables
load_dotenv()

# Step 1: Define Agents
# Each agent has a role, goal, and backstory
researcher = Agent(
    role="Research Analyst",
    goal="Find and analyze information on given topics",
    backstory="""You are an experienced researcher who excels at finding
    accurate information and summarizing it clearly.""",
    verbose=True,
    allow_delegation=False,
)

writer = Agent(
    role="Content Writer",
    goal="Write clear and engaging content based on research",
    backstory="""You are a skilled writer who transforms research findings
    into well-structured, readable content.""",
    verbose=True,
    allow_delegation=False,
)

# Step 2: Define Tasks
# Tasks specify what needs to be done and what output is expected
research_task = Task(
    description="""Research the topic of 'AI agents in business automation'.
    Find recent trends, benefits, and use cases.""",
    expected_output="""A summary of:
    1. Key trends in AI agent adoption
    2. Main benefits for businesses
    3. Common use cases
    4. Sources used""",
    agent=researcher,
)

writing_task = Task(
    description="""Write a brief article (2-3 paragraphs) about AI agents
    in business automation based on the research findings.""",
    expected_output="A well-written article about AI agents in business automation",
    agent=writer,
)

# Step 3: Create the Crew
# Combine agents and tasks with a process
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, writing_task],
    process=Process.sequential,  # Complete tasks one after another
    verbose=True,
)

# Step 4: Execute the Crew
if __name__ == "__main__":
    print("Starting crew execution...")
    print("=" * 50)
    
    result = crew.kickoff()
    
    print("\n" + "=" * 50)
    print("Crew execution completed!")
    print("\nResult:")
    print(result)


