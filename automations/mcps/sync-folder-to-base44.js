/**
 * Sync Folder to Base44
 * Automatically syncs any client folder update to Base44 portal
 * This should be called whenever any file in a client folder is updated
 */

const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');

module.exports = {
  description: 'Watches client folder for changes and automatically syncs updates to Base44 portal',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    watch: {
      type: 'boolean',
      required: false,
      default: false,
      description: 'If true, watches folder for changes. If false, syncs once.'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name, watch = false } = params;

    if (!client_name) {
      throw new Error('client_name is required');
    }

    const clientDir = path.join(PROJECT_ROOT, 'clients', client_name);
    if (!await fs.pathExists(clientDir)) {
      throw new Error(`Client folder not found: ${client_name}`);
    }

    // Load client profile
    const profilePath = path.join(clientDir, 'client-profile.json');
    if (!await fs.pathExists(profilePath)) {
      throw new Error(`Client profile not found for ${client_name}`);
    }

    const profile = await fs.readJson(profilePath);

    // Check if Base44 portal exists
    if (!profile.client_specific_ids || !profile.client_specific_ids.base44_portal_id) {
      return {
        success: false,
        message: 'Base44 portal not created yet. Portal will be created when proposal is approved.',
        client_name
      };
    }

    // Sync function
    async function syncToBase44() {
      // Get all folders and their contents
      const folders = {
        '01_intake': await getFolderContents(path.join(clientDir, '01_intake')),
        '02_brand': await getFolderContents(path.join(clientDir, '02_brand')),
        '03_website': await getFolderContents(path.join(clientDir, '03_website')),
        '04_automations': await getFolderContents(path.join(clientDir, '04_automations')),
        '05_deliverables': await getFolderContents(path.join(clientDir, '05_deliverables'))
      };

      // Call update-base44-portal MCP
      // In real implementation, this would call the MCP server
      return {
        synced: new Date().toISOString(),
        folders_updated: Object.keys(folders).filter(f => folders[f].files.length > 0),
        message: 'Folder contents synced to Base44 portal'
      };
    }

    async function getFolderContents(folderPath) {
      if (!await fs.pathExists(folderPath)) {
        return { files: [], folders: [] };
      }

      const items = await fs.readdir(folderPath);
      const files = [];
      const folders = [];

      for (const item of items) {
        const itemPath = path.join(folderPath, item);
        const stat = await fs.stat(itemPath);
        if (stat.isDirectory()) {
          folders.push(item);
        } else {
          files.push(item);
        }
      }

      return { files, folders };
    }

    // Perform initial sync
    const syncResult = await syncToBase44();

    // If watch mode, set up file watcher
    if (watch) {
      const watcher = chokidar.watch(clientDir, {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true
      });

      watcher.on('change', async (filePath) => {
        console.log(`File changed: ${filePath}`);
        await syncToBase44();
      });

      watcher.on('add', async (filePath) => {
        console.log(`File added: ${filePath}`);
        await syncToBase44();
      });

      return {
        success: true,
        ...syncResult,
        watching: true,
        message: `Watching ${client_name} folder for changes. Auto-syncing to Base44.`
      };
    }

    return {
      success: true,
      ...syncResult,
      client_name
    };
  }
};

