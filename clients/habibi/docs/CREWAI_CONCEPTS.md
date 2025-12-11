# CrewAI Core Concepts

This document explains the fundamental concepts of CrewAI framework.

## Overview

CrewAI is a framework for orchestrating multiple AI agents that work together to complete complex tasks. Think of it like a team of specialized workers, each with their own expertise, collaborating to solve problems.

## Key Components

### 1. Agents

**What they are:**
Agents are AI workers with specific roles, goals, and expertise. Each agent is like a team member with a particular job.

**Key Properties:**
- **Role**: The agent's job title/function (e.g., "Researcher", "Analyst", "Writer")
- **Goal**: What the agent aims to achieve
- **Backstory**: Context that shapes how the agent thinks and behaves
- **Tools**: Optional capabilities the agent can use (web search, calculators, APIs)
- **LLM**: The language model the agent uses (defaults to your environment config)

**Example:**
```python
researcher = Agent(
    role="Research Analyst",
    goal="Find accurate information on assigned topics",
    backstory="You are an experienced researcher who excels at finding reliable sources.",
    verbose=True,
)
```

**Why it matters:**
The role, goal, and backstory guide the agent's behavior. A well-defined agent will make better decisions and produce more relevant outputs.

### 2. Tasks

**What they are:**
Tasks define what needs to be done and what the expected output should look like.

**Key Properties:**
- **Description**: What needs to be done (be specific!)
- **Expected Output**: Format and structure of the result
- **Agent**: Which agent should do this (optional - crew can assign)
- **Tools**: Optional tools needed for the task

**Example:**
```python
research_task = Task(
    description="Research the current state of AI in healthcare",
    expected_output="A report with: 1) Current trends, 2) Key players, 3) Statistics",
    agent=researcher,
)
```

**Why it matters:**
Clear task descriptions and expected outputs help agents understand exactly what to do and how to format their results.

### 3. Crews

**What they are:**
A Crew combines agents and tasks, orchestrating how they work together.

**Key Properties:**
- **Agents**: List of agents that can work together
- **Tasks**: List of tasks to be completed
- **Process**: How agents collaborate (see Processes below)
- **Verbose**: Whether to show detailed execution logs

**Example:**
```python
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, writing_task],
    process=Process.sequential,
    verbose=True,
)
```

**Why it matters:**
The crew orchestrates the entire workflow, managing how agents interact and ensuring tasks are completed in the right order.

### 4. Processes

**What they are:**
Processes define how agents collaborate and work together.

**Types:**

1. **Sequential Process**
   - Tasks execute one after another in order
   - Each agent completes their task before the next starts
   - **Use when**: You have a linear workflow with dependencies
   - **Example**: Research → Analysis → Report

2. **Hierarchical Process**
   - A manager agent coordinates and delegates tasks
   - Manager decides which agent handles which task
   - **Use when**: You need dynamic task assignment or complex coordination
   - **Example**: Manager reviews all tasks, assigns to specialists

3. **Consensual Process**
   - All agents discuss tasks together
   - Reach consensus on approach and execution
   - **Use when**: You need collaborative decision-making
   - **Example**: Team meeting to decide on research strategy

**Example:**
```python
# Sequential - one after another
crew = Crew(agents=[...], tasks=[...], process=Process.sequential)

# Hierarchical - manager delegates
crew = Crew(agents=[...], tasks=[...], process=Process.hierarchical, manager_llm=...)

# Consensual - agents discuss
crew = Crew(agents=[...], tasks=[...], process=Process.consensual)
```

## How It Works: The Execution Flow

1. **You create agents** with specific roles and expertise
2. **You define tasks** that need to be completed
3. **You create a crew** that combines agents and tasks
4. **You execute the crew** with `crew.kickoff()`
5. **CrewAI orchestrates** the agents to complete tasks based on the process
6. **You get results** from the completed tasks

## Key Differences from Single Agents

### Traditional Single Agent:
- One AI handles everything
- Limited specialization
- Sequential thinking only
- No collaboration

### CrewAI Multi-Agent:
- Multiple specialized agents
- Each agent has specific expertise
- Agents can collaborate and delegate
- Better for complex, multi-step tasks

## Best Practices

1. **Define Clear Roles**: Make agent roles specific and distinct
2. **Write Detailed Backstories**: More context = better agent behavior
3. **Be Specific in Tasks**: Clear descriptions lead to better outputs
4. **Define Expected Outputs**: Helps agents format results correctly
5. **Choose the Right Process**: Match process type to your workflow
6. **Use Tools When Needed**: Give agents capabilities they need (web search, APIs, etc.)

## Common Patterns

### Research Workflow
```
Researcher → Analyst → Writer
(Sequential process)
```

### Decision-Making Workflow
```
All agents discuss → Reach consensus → Execute
(Consensual process)
```

### Complex Coordination
```
Manager reviews → Assigns to specialists → Coordinates results
(Hierarchical process)
```

## Next Steps

- See `examples/basic_crew.py` for a minimal working example
- Check `config/` files for templates
- Read `ARCHITECTURE.md` for deeper technical details
- Review `COMPARISON.md` to understand how CrewAI compares to other approaches


