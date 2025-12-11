"""
Agent Configuration Template

This file shows how to define agents in CrewAI.
Each agent has:
- role: What the agent does (e.g., "Researcher", "Analyst")
- goal: What the agent aims to achieve
- backstory: Context that shapes the agent's behavior
- tools: Optional tools the agent can use
- llm: Optional specific LLM model (defaults to environment config)
"""

from crewai import Agent
from langchain_openai import ChatOpenAI

# Example: Basic Researcher Agent
researcher_agent = Agent(
    role="Research Analyst",
    goal="Gather comprehensive and accurate information on assigned topics",
    backstory="""You are an experienced research analyst with a keen eye for detail.
    You excel at finding reliable sources and synthesizing information into clear,
    actionable insights. You always verify facts and cite your sources.""",
    verbose=True,  # Set to True to see agent thinking process
    allow_delegation=False,  # Can this agent delegate tasks to others?
)

# Example: Specialized Mortgage Market Researcher
mortgage_market_researcher = Agent(
    role="Private Mortgage Market Researcher",
    goal="Research and analyze private mortgage market trends, regulations, and opportunities",
    backstory="""You are a specialized researcher with deep knowledge of private mortgage
    markets, real estate finance, and regulatory environments. You understand the nuances
    of private lending, borrower profiles, risk assessment, and market dynamics. You
    stay current with industry trends and regulatory changes.""",
    verbose=True,
    allow_delegation=False,
)

# Example: Property Analyst Agent
property_analyst = Agent(
    role="Property Valuation Analyst",
    goal="Analyze property values, market conditions, and investment potential",
    backstory="""You are a real estate analyst with expertise in property valuation,
    market analysis, and investment assessment. You understand local market dynamics,
    property types, and factors that influence value. You provide data-driven insights
    for investment decisions.""",
    verbose=True,
    allow_delegation=False,
)

# Example: Risk Assessment Agent
risk_assessor = Agent(
    role="Risk Assessment Specialist",
    goal="Evaluate and assess risks associated with mortgage opportunities",
    backstory="""You are a risk management expert specializing in private mortgage
    lending. You analyze borrower profiles, property risks, market risks, and
    regulatory compliance. You provide clear risk assessments with mitigation
    strategies.""",
    verbose=True,
    allow_delegation=False,
)

# Example: Using a specific LLM model
# You can specify a different model for specific agents
specialized_agent = Agent(
    role="Senior Analyst",
    goal="Provide expert analysis",
    backstory="You are a senior analyst with decades of experience.",
    llm=ChatOpenAI(model_name="gpt-4", temperature=0.3),  # More focused responses
    verbose=True,
)

# Template for creating your own agents:
def create_custom_agent(role, goal, backstory, tools=None, llm=None):
    """
    Template function for creating custom agents.
    
    Args:
        role: Agent's role/title
        goal: What the agent aims to achieve
        backstory: Context and expertise description
        tools: Optional list of tools the agent can use
        llm: Optional specific LLM model
    
    Returns:
        Configured Agent instance
    """
    return Agent(
        role=role,
        goal=goal,
        backstory=backstory,
        tools=tools,
        llm=llm,
        verbose=True,
        allow_delegation=False,
    )


