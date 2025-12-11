"""
Private Mortgage Research Crew Example

This example demonstrates how to create a crew specifically for private
mortgage research. It shows domain-specific agents and tasks.

Run this example:
    python examples/private_mortgage_example.py
"""

import os
from dotenv import load_dotenv
from crewai import Agent, Task, Crew, Process

# Load environment variables
load_dotenv()

# Define Private Mortgage Research Agents
market_researcher = Agent(
    role="Private Mortgage Market Researcher",
    goal="Research and analyze private mortgage market conditions, trends, and opportunities",
    backstory="""You are a specialized researcher with deep expertise in private mortgage
    markets. You understand:
    - Private lending structures and models
    - Market trends and interest rate dynamics
    - Regulatory environment for private mortgages
    - Borrower profiles and risk factors
    - Regional market variations
    
    You stay current with industry news, regulatory changes, and market data.
    You can identify opportunities and risks in the private mortgage space.""",
    verbose=True,
    allow_delegation=False,
)

property_analyst = Agent(
    role="Property Investment Analyst",
    goal="Analyze properties for mortgage consideration, including valuation and market position",
    backstory="""You are a real estate analyst specializing in property investment analysis.
    Your expertise includes:
    - Property valuation methodologies
    - Market comparables analysis
    - Location and neighborhood assessment
    - Property condition evaluation
    - Investment potential assessment
    
    You provide data-driven property analysis that helps assess mortgage risk
    and investment viability.""",
    verbose=True,
    allow_delegation=False,
)

risk_specialist = Agent(
    role="Mortgage Risk Assessment Specialist",
    goal="Evaluate and assess risks associated with private mortgage opportunities",
    backstory="""You are a risk management expert specializing in private mortgage lending.
    You analyze:
    - Borrower creditworthiness and financial stability
    - Property risk factors (location, condition, market)
    - Loan-to-value ratios and equity positions
    - Market and economic risks
    - Regulatory and compliance risks
    
    You provide clear risk assessments with mitigation strategies and recommendations.""",
    verbose=True,
    allow_delegation=False,
)

# Define Private Mortgage Research Tasks
market_research_task = Task(
    description="""Research the current private mortgage market conditions for {region}.
    
    Focus on:
    - Current interest rates for private mortgages
    - Typical loan-to-value (LTV) ratios
    - Average loan terms and structures
    - Borrower profile trends
    - Market activity levels
    - Regulatory requirements and changes
    - Regional market variations
    - Outlook and trends for the next 6-12 months
    
    Provide specific data points and cite sources.""",
    expected_output="""A comprehensive market research report with:
    1. Executive summary of market conditions
    2. Current interest rate analysis
    3. Typical loan structures and terms
    4. Borrower profile insights
    5. Regulatory landscape overview
    6. Market activity and trends
    7. Regional analysis
    8. Market outlook and predictions
    9. Data sources and references""",
    agent=market_researcher,
)

property_analysis_task = Task(
    description="""Analyze the property at {property_address} for private mortgage consideration.
    
    Evaluate:
    - Property details (type, size, condition)
    - Estimated market value with methodology
    - Comparable properties (comps) in the area
    - Location and neighborhood assessment
    - Market conditions in the specific area
    - Property investment potential
    - Factors affecting value and marketability
    
    Provide a detailed analysis with supporting data.""",
    expected_output="""A detailed property analysis report including:
    1. Property overview and details
    2. Market value estimate with methodology
    3. Comparable properties analysis
    4. Location and neighborhood assessment
    5. Local market conditions
    6. Investment potential evaluation
    7. Risk factors related to the property
    8. Recommendations""",
    agent=property_analyst,
)

risk_assessment_task = Task(
    description="""Assess the overall risk of a private mortgage opportunity.
    
    Consider:
    - Borrower risk (credit, income, financial stability)
    - Property risk (value, location, condition, marketability)
    - Loan risk (LTV ratio, terms, structure)
    - Market risk (economic conditions, interest rate trends)
    - Regulatory and compliance risk
    
    Provide a comprehensive risk assessment with mitigation strategies.""",
    expected_output="""A comprehensive risk assessment report with:
    1. Overall risk rating (Low/Medium/High) with justification
    2. Borrower risk analysis
    3. Property risk analysis
    4. Loan structure risk analysis
    5. Market and economic risk factors
    6. Regulatory and compliance considerations
    7. Risk mitigation strategies
    8. Recommendations for proceeding""",
    agent=risk_specialist,
)

# Create the Private Mortgage Research Crew
mortgage_crew = Crew(
    agents=[market_researcher, property_analyst, risk_specialist],
    tasks=[market_research_task, property_analysis_task, risk_assessment_task],
    process=Process.sequential,  # Market Research → Property Analysis → Risk Assessment
    verbose=True,
)

# Example usage
if __name__ == "__main__":
    # Example parameters - customize these
    region = "California"
    property_address = "123 Main St, Los Angeles, CA"
    
    print(f"Starting private mortgage research for {region}")
    print(f"Analyzing property: {property_address}")
    print("=" * 50)
    
    # Update tasks with specific parameters
    market_research_task.description = market_research_task.description.format(region=region)
    property_analysis_task.description = property_analysis_task.description.format(
        property_address=property_address
    )
    
    # Execute the crew
    result = mortgage_crew.kickoff()
    
    print("\n" + "=" * 50)
    print("Private mortgage research completed!")
    print("\nFinal Assessment:")
    print(result)
    
    # Note: In a real implementation, you might want to:
    # - Save results to a file or database
    # - Format output for specific use cases
    # - Add error handling
    # - Integrate with external tools (APIs, databases, etc.)


