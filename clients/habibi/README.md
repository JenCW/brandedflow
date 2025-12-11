# Habibi - CrewAI Research Agents for Private Mortgages

This project uses CrewAI framework to create collaborative research agents for private mortgage analysis.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp env.example .env
# Edit .env and add your API keys
```

## Project Structure

- `config/` - Configuration files for agents, tasks, and crews
- `examples/` - Example implementations to learn from
- `docs/` - Documentation explaining CrewAI concepts
- `src/` - Your implementation code

## Getting Started

1. Read `docs/CREWAI_CONCEPTS.md` to understand the basics
2. Check out `examples/basic_crew.py` for a minimal example
3. Review `examples/private_mortgage_example.py` for domain-specific patterns
4. Use `config/` templates to define your own agents and tasks

## Running Examples

From the project root directory:

```bash
# Basic example
python examples/basic_crew.py

# Research template
python examples/research_crew_template.py

# Private mortgage example
python examples/private_mortgage_example.py
```

**Note**: The examples use standalone imports. If you're importing from `config/` in your own code, you may need to add the project root to your Python path or use relative imports.

## Resources

- [CrewAI Documentation](https://docs.crewai.com/)
- [CrewAI GitHub](https://github.com/joaomdmoura/crewAI)

