"""
Research Crew Template

This template shows how to create a research-focused crew with multiple
specialized agents working together. This is a good starting point for
research tasks in any domain.

Run this example:
    python examples/research_crew_template.py
"""

import os
from dotenv import load_dotenv
from crewai import Agent, Task, Crew, Process

# Load environment variables
load_dotenv()

# Define Research Agents
primary_researcher = Agent(
    role="Primary Researcher",
    goal="Conduct thorough research on assigned topics and gather comprehensive information",
    backstory="""You are a meticulous researcher with expertise in information gathering.
    You know how to find reliable sources, verify facts, and organize information
    systematically. You always cite your sources and note any uncertainties.""",
    verbose=True,
    allow_delegation=False,
)

data_analyst = Agent(
    role="Data Analyst",
    goal="Analyze research data, identify patterns, and extract insights",
    backstory="""You are a data analyst who excels at finding patterns in information.
    You can synthesize large amounts of data into clear insights and identify
    trends, correlations, and key findings.""",
    verbose=True,
    allow_delegation=False,
)

report_writer = Agent(
    role="Report Writer",
    goal="Create well-structured, comprehensive reports from research and analysis",
    backstory="""You are a professional report writer who creates clear, organized
    documents. You know how to structure information logically, highlight key findings,
    and present complex information in an accessible way.""",
    verbose=True,
    allow_delegation=False,
)

# Define Research Tasks
research_task = Task(
    description="""Research the topic: {topic}
    
    Gather information on:
    - Current state and trends
    - Key players and stakeholders
    - Recent developments
    - Relevant statistics and data
    - Expert opinions and perspectives
    
    Be thorough and cite all sources.""",
    expected_output="""A comprehensive research summary including:
    1. Overview of the topic
    2. Current trends and developments
    3. Key statistics and data points
    4. Important stakeholders or players
    5. Expert insights
    6. Complete source citations""",
    agent=primary_researcher,
)

analysis_task = Task(
    description="""Analyze the research findings and identify:
    - Key patterns and trends
    - Important insights
    - Potential implications
    - Areas requiring further investigation
    - Summary of most significant findings""",
    expected_output="""An analysis report with:
    1. Key patterns identified
    2. Main insights and findings
    3. Implications and significance
    4. Recommendations for further research
    5. Summary of critical points""",
    agent=data_analyst,
)

report_task = Task(
    description="""Create a final comprehensive report that combines the research
    findings and analysis. Structure it professionally with clear sections,
    executive summary, and actionable insights.""",
    expected_output="""A professional research report with:
    1. Executive summary
    2. Introduction and context
    3. Research findings (organized by theme)
    4. Analysis and insights
    5. Conclusions
    6. Recommendations
    7. References and sources""",
    agent=report_writer,
)

# Create the Research Crew
research_crew = Crew(
    agents=[primary_researcher, data_analyst, report_writer],
    tasks=[research_task, analysis_task, report_task],
    process=Process.sequential,  # Research → Analyze → Write Report
    verbose=True,
)

# Example usage
if __name__ == "__main__":
    # You can customize the research topic
    topic = "The impact of AI on financial services"
    
    print(f"Starting research on: {topic}")
    print("=" * 50)
    
    # Update the research task with the topic
    research_task.description = research_task.description.format(topic=topic)
    
    # Execute the crew
    result = research_crew.kickoff()
    
    print("\n" + "=" * 50)
    print("Research completed!")
    print("\nFinal Report:")
    print(result)


