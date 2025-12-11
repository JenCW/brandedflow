"""
Task Configuration Template

This file shows how to define tasks in CrewAI.
Each task has:
- description: What needs to be done
- expected_output: What format/structure the output should have
- agent: Which agent should perform this task (optional - can be assigned by crew)
- tools: Optional tools needed for this task
"""

from crewai import Task

# Example: Basic Research Task
research_task = Task(
    description="""Research the current state of private mortgage markets.
    Focus on recent trends, interest rates, and market conditions.""",
    expected_output="""A comprehensive report with:
    1. Current market overview
    2. Key trends and statistics
    3. Notable changes in the past 6 months
    4. Sources cited""",
    agent=None,  # Will be assigned by the crew
)

# Example: Property Analysis Task
property_analysis_task = Task(
    description="""Analyze a specific property for mortgage consideration.
    Evaluate location, property type, estimated value, and market comparables.""",
    expected_output="""A detailed property analysis report including:
    1. Property details and location assessment
    2. Estimated market value with methodology
    3. Comparable properties analysis
    4. Market conditions in the area
    5. Investment potential assessment""",
    agent=None,
)

# Example: Risk Assessment Task
risk_assessment_task = Task(
    description="""Assess the risks associated with a private mortgage opportunity.
    Evaluate borrower risk, property risk, and market risk factors.""",
    expected_output="""A risk assessment report with:
    1. Overall risk rating (Low/Medium/High)
    2. Borrower risk factors
    3. Property risk factors
    4. Market risk factors
    5. Recommended risk mitigation strategies""",
    agent=None,
)

# Example: Market Research Task for Private Mortgages
mortgage_market_research = Task(
    description="""Research private mortgage market conditions in a specific region.
    Include information about:
    - Average interest rates for private mortgages
    - Typical loan-to-value ratios
    - Common borrower profiles
    - Regulatory requirements
    - Market trends and outlook""",
    expected_output="""A structured market research report with:
    1. Executive summary
    2. Market conditions overview
    3. Interest rate analysis
    4. Borrower profile insights
    5. Regulatory landscape
    6. Market outlook and trends
    7. Data sources and references""",
    agent=None,
)

# Example: Task with specific agent assignment
assigned_task = Task(
    description="Analyze borrower creditworthiness and financial stability",
    expected_output="Credit analysis report with risk assessment",
    agent=None,  # Specify agent here: e.g., risk_assessor
)

# Template for creating your own tasks:
def create_custom_task(description, expected_output, agent=None, tools=None):
    """
    Template function for creating custom tasks.
    
    Args:
        description: What needs to be done (be specific!)
        expected_output: Format and structure of expected output
        agent: Optional specific agent to assign (or None for crew to decide)
        tools: Optional tools needed for this task
    
    Returns:
        Configured Task instance
    """
    return Task(
        description=description,
        expected_output=expected_output,
        agent=agent,
        tools=tools,
    )


