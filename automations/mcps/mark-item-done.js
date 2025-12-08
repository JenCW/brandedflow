/**
 * Mark Item as Done
 * Marks a decision, task, or note as done (removes from dashboard)
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Marks a decision, task, or note as done (removes from dashboard)',
  
  params: {
    item_type: {
      type: 'string',
      required: true,
      description: 'Type: "decisions", "tasks", or "notes"'
    },
    item_text: {
      type: 'string',
      required: true,
      description: 'The exact text of the item to mark as done'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { item_type, item_text } = params;

    if (!item_type || !item_text) {
      throw new Error('item_type and item_text are required');
    }

    if (!['decisions', 'tasks', 'notes'].includes(item_type)) {
      throw new Error('item_type must be "decisions", "tasks", or "notes"');
    }

    const trackersPath = path.join(PROJECT_ROOT, 'systems', 'trackers');
    const statusFile = path.join(trackersPath, 'item_status.json');

    // Load current status
    let status = {
      decisions: {},
      tasks: {},
      notes: {}
    };

    if (await fs.pathExists(statusFile)) {
      try {
        status = await fs.readJson(statusFile);
      } catch (e) {
        // Start fresh if file is corrupted
      }
    }

    // Normalize item text for key
    const normalizeText = (text) => {
      // Remove prefixes
      const cleaned = text.replace(/^(Decision|Task|Note):\s*/i, '');
      // Normalize whitespace
      return cleaned.split(/\s+/).join(' ').toLowerCase();
    };

    const key = normalizeText(item_text);

    // Mark as done
    if (!status[item_type]) {
      status[item_type] = {};
    }

    status[item_type][key] = {
      done: true,
      item: item_text,
      marked_done_at: new Date().toISOString()
    };

    // Save status
    await fs.writeJson(statusFile, status, { spaces: 2 });

    return {
      success: true,
      message: `Marked ${item_type.slice(0, -1)} as done`,
      item_type,
      item_text,
      status: 'done',
      note: 'This item will no longer appear in dashboard. Next Daily Ops run will filter it out.'
    };
  }
};

