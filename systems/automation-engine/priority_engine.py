class PriorityEngine:
    def generate(self, decisions: list, tasks: list) -> list:
        """Very simple priority logic — expands later."""
        priorities = []

        if tasks:
            priorities.extend(tasks[:3])

        if not priorities and decisions:
            priorities.append(decisions[-1])

        return priorities
        