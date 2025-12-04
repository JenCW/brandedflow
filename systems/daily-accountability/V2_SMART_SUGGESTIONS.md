# V2: Smart Priority Suggestions

## The Problem You Had

Asking you to TYPE priorities was too much work. You skipped it.

## The New Approach

**The system does the thinking FOR you.**

Instead of typing, you just **PICK from smart suggestions**.

## How It Works

### Morning Routine (3 minutes, not 15)

**Step 1: Context**
- Shows today (Tuesday)
- Shows yesterday's incomplete tasks (if any)
- Shows today's focus: "Client work + sales"

**Step 2: Pick Priority 1** (Revenue)
System shows you a LIST to choose from:
- Finish AQR website design
- Update AQR kitchen mockups
- Send AQR project update
- Complete Luxe brand strategy
- Create Luxe social media content
- Follow up on Dental Bunny proposal
- ✏️  Write my own

Click one. That's it.

**Step 3: Pick Priority 2** (Business)
- Post 2-3 Instagram stories/reels
- Send 5 cold outreach DMs
- Update portfolio with recent work
- Create LinkedIn content
- Build new service template
- Update pricing document
- ✏️  Write my own

Click one. Done.

**Step 4: Pick Priority 3** (Admin)
- Send outstanding invoices
- Follow up on unpaid invoices
- File this week's receipts
- Update financial tracker
- Schedule next week's calls
- ✏️  Write my own
- ⏭️  Skip Priority 3

Click one or skip. Finished.

**Step 5: Summary**
Shows your 3 picks, then you start working.

## The Magic

The system KNOWS:
- Your active clients (AQR, Luxe, Dental Bunny, Richard Hart)
- Common tasks for each client
- Day of week (Tuesday = client work focus)
- What you didn't finish yesterday (auto-suggests those first)

So it suggests **RELEVANT** options, not random generic tasks.

## Updating Your Active Work

Edit this file anytime:
```
~/brandedflow/automation-system/active_work.json
```

Add new clients, update tasks, change day-of-week defaults.

### Adding a New Client

```json
{
  "name": "New Client Name",
  "status": "active",
  "common_tasks": [
    "Task 1 for this client",
    "Task 2 for this client",
    "Task 3 for this client"
  ]
}
```

### Updating Tasks

Just edit the arrays:
```json
"recurring_business_tasks": [
  "Your new task here",
  "Another task",
  ...
]
```

## Testing It

Run it now:
```bash
python3 ~/brandedflow/automation-system/morning_routine_v2.py
```

You'll see:
1. Welcome notification
2. Context dialog
3. Dropdown list for P1 (pick one)
4. Dropdown list for P2 (pick one)
5. Dropdown list for P3 (pick one or skip)
6. Summary of your day

Takes 2-3 minutes max.

## The Difference

**Old way:**
- "Type your priority"
- Blank text box
- You think "uh... what should I do?"
- Skip it

**New way:**
- Shows you 6 options based on YOUR actual work
- Click "Finish AQR website design"
- Done
- No thinking required

## Auto-Runs Every Morning

After 8am when you open your laptop, this will pop up automatically.

Quick picks, then you're working.
