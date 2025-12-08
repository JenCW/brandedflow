class ReminderEngine:
    def make(self, tasks: list) -> list:
        """Generate simple reminder lines based on tasks."""
        reminders = []
        for t in tasks:
            if "follow" in t.lower():
                reminders.append(f"Reminder: {t}")
        return reminders