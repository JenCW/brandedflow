# CrewAI Architecture

This document explains how CrewAI orchestrates agents and manages their collaboration.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Your Application                      │
│  (You define agents, tasks, and create crews)            │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                      CrewAI Framework                     │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Agents     │  │    Tasks     │  │   Process    │ │
│  │  (Workers)   │  │  (Work Items)│  │ (Orchestrator)│ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘ │
│         │                  │                  │         │
│         └──────────────────┴──────────────────┘         │
│                          │                               │
│                          ▼                               │
│              ┌───────────────────────┐                  │
│              │      Crew Engine       │                  │
│              │  (Execution Manager)   │                  │
│              └───────────┬───────────┘                  │
└──────────────────────────┼───────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              LLM Provider (OpenAI, Anthropic, etc.)      │
│              Tools (Web Search, APIs, etc.)              │
└─────────────────────────────────────────────────────────┘
```

## Component Details

### Agent Architecture

Each agent is essentially a specialized prompt + LLM + tools:

```
Agent = {
    Role Definition (prompt context)
    + Goal (objective)
    + Backstory (behavioral context)
    + LLM Model (reasoning engine)
    + Tools (capabilities)
    + Delegation Rules (can/can't delegate)
}
```

**How agents work:**
1. Agent receives a task
2. Agent's role/goal/backstory provide context to the LLM
3. LLM generates response based on context
4. Agent can use tools if needed
5. Agent produces output
6. Agent can delegate to other agents (if allowed)

### Task Architecture

Tasks are structured work items:

```
Task = {
    Description (what to do)
    + Expected Output (format/structure)
    + Assigned Agent (or None for crew assignment)
    + Required Tools (optional)
    + Dependencies (implicit in process type)
}
```

**How tasks flow:**
1. Task is created with description and expected output
2. Task is assigned to an agent (explicitly or by crew)
3. Agent receives task context
4. Agent executes task using LLM + tools
5. Task output is generated
6. Output may feed into next task (in sequential process)

### Process Architecture

Processes control agent collaboration:

#### Sequential Process
```
Task 1 → Agent A → Output 1
                    ↓
Task 2 → Agent B → Output 2 (can use Output 1)
                    ↓
Task 3 → Agent C → Final Output
```

**Flow:**
1. Crew executes tasks in order
2. Each task waits for previous to complete
3. Agents can reference previous outputs
4. Simple, predictable execution

#### Hierarchical Process
```
                    Manager Agent
                         │
        ┌────────────────┼────────────────┐
        │                │                │
    Task 1           Task 2           Task 3
        │                │                │
    Agent A          Agent B          Agent C
        │                │                │
    Output 1         Output 2         Output 3
        └────────────────┼────────────────┘
                         │
                    Manager reviews
                         │
                    Final Output
```

**Flow:**
1. Manager agent reviews all tasks
2. Manager decides which agent handles which task
3. Manager can reassign or coordinate
4. Manager synthesizes final results
5. More dynamic, intelligent routing

#### Consensual Process
```
    Task → All Agents Discuss → Consensus → Execution
                                    │
                            ┌───────┼───────┐
                            │       │       │
                         Agent A Agent B Agent C
                            │       │       │
                            └───────┼───────┘
                                    │
                              Final Output
```

**Flow:**
1. All agents receive task information
2. Agents discuss approach and strategy
3. Agents reach consensus on execution plan
4. Agents execute based on consensus
5. Collaborative, democratic approach

## Execution Flow

### Step-by-Step Execution

1. **Initialization**
   - CrewAI loads agents, tasks, and process configuration
   - Validates configuration
   - Sets up LLM connections

2. **Process Selection**
   - Based on process type, CrewAI sets up execution flow
   - Sequential: Creates task queue
   - Hierarchical: Initializes manager agent
   - Consensual: Sets up discussion framework

3. **Task Execution**
   - For each task:
     a. Determine which agent should handle it
     b. Prepare context (role, goal, backstory, task description)
     c. Send to LLM with context
     d. Agent uses tools if needed
     e. Generate output
     f. Store output for next steps

4. **Agent Communication**
   - Agents can see previous task outputs
   - In hierarchical: Manager coordinates
   - In consensual: Agents discuss before executing
   - Delegation happens if allowed

5. **Result Compilation**
   - CrewAI collects all outputs
   - Formats final result
   - Returns to your application

## Memory and Context

**How agents remember:**
- Agents don't have persistent memory between runs
- Within a single crew execution, agents can reference:
  - Previous task outputs in the same crew
  - Their own role/goal/backstory
  - Tools and capabilities available

**Context passing:**
- Sequential: Each task can use previous outputs
- Hierarchical: Manager sees all outputs
- Consensual: All agents see all information

## Tool Integration

**How tools work:**
- Tools are functions/APIs agents can call
- Examples: Web search, calculators, databases, MCPs
- Agents decide when to use tools based on task needs
- Tool results are included in agent context

**Tool flow:**
```
Agent receives task
    ↓
Agent determines tool needed
    ↓
Agent calls tool
    ↓
Tool returns result
    ↓
Agent uses result in response
```

## LLM Integration

**Supported providers:**
- OpenAI (GPT-3.5, GPT-4, etc.)
- Anthropic (Claude)
- Open-source models (via LangChain)
- Custom providers

**How LLMs are used:**
- Each agent can use a specific LLM
- Default LLM from environment variables
- LLM receives: role + goal + backstory + task + context
- LLM generates response based on all context

## Error Handling

**What happens on errors:**
- Agent errors are caught and logged
- CrewAI can retry failed tasks
- Errors are reported in verbose mode
- Execution continues if possible

## Performance Considerations

**Optimization strategies:**
1. **Agent specialization**: More specific agents = better results
2. **Task clarity**: Clear tasks = faster execution
3. **Process selection**: Right process = efficient workflow
4. **Tool usage**: Tools can speed up certain tasks
5. **LLM selection**: Faster/cheaper models for simple tasks

**Scaling:**
- CrewAI handles multiple agents efficiently
- Sequential process is most predictable
- Hierarchical adds overhead but enables smarter routing
- Consensual requires more LLM calls (discussion phase)

## Integration Points

**Where you can extend:**
1. **Custom Tools**: Add your own tools for agents
2. **Custom LLMs**: Use different models per agent
3. **Custom Processes**: Extend process types (advanced)
4. **Output Processing**: Format results for your needs
5. **Monitoring**: Add logging, metrics, tracking

## Comparison to Other Architectures

**vs. Single Agent:**
- More complex orchestration
- Better for multi-step tasks
- Requires more LLM calls
- More flexible and powerful

**vs. Traditional Workflows:**
- AI-driven decision making
- Dynamic task assignment
- Natural language task definitions
- Less rigid than rule-based systems

## Next Steps

- Review `CREWAI_CONCEPTS.md` for basic concepts
- Check `examples/` for implementation patterns
- See `COMPARISON.md` for framework comparisons


