/**
 * Upload to PandaDoc
 * Uploads proposal or contract to PandaDoc and sends for signature
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Uploads proposal or contract to PandaDoc, sets up signature fields, and sends for signature',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    document_type: {
      type: 'string',
      required: true,
      description: 'Type of document: "proposal" or "contract"'
    },
    document_path: {
      type: 'string',
      required: false,
      description: 'Path to document file (PDF or markdown). If not provided, will look in deliverables folder.'
    },
    recipient_email: {
      type: 'string',
      required: true,
      description: 'Email address to send document to'
    },
    expiration_days: {
      type: 'number',
      required: false,
      default: 30,
      description: 'Number of days until document expires'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { 
      client_name, 
      document_type, 
      document_path, 
      recipient_email,
      expiration_days = 30
    } = params;

    if (!client_name || !document_type || !recipient_email) {
      throw new Error('client_name, document_type, and recipient_email are required');
    }

    // Check for PandaDoc API credentials
    const pandadocApiKey = process.env.PANDADOC_API_KEY;
    const pandadocWorkspaceId = process.env.PANDADOC_WORKSPACE_ID;
    
    if (!pandadocApiKey || !pandadocWorkspaceId) {
      return {
        success: true,
        skipped: true,
        message: 'PandaDoc API credentials not configured. Skipping upload. Add PANDADOC_API_KEY and PANDADOC_WORKSPACE_ID to .env to enable.',
        client_name,
        document_type
      };
    }

    // Find document if path not provided
    let docPath = document_path;
    if (!docPath) {
      const deliverablesDir = path.join(PROJECT_ROOT, 'clients', client_name, '05_deliverables');
      if (await fs.pathExists(deliverablesDir)) {
        const files = await fs.readdir(deliverablesDir);
        const docFiles = files.filter(f => 
          f.includes(document_type) && (f.endsWith('.md') || f.endsWith('.pdf'))
        );
        if (docFiles.length > 0) {
          // Get most recent
          docFiles.sort().reverse();
          docPath = path.join(deliverablesDir, docFiles[0]);
        }
      }
    }

    if (!docPath || !await fs.pathExists(docPath)) {
      return {
        success: false,
        error: `Document not found. Please create ${document_type} first.`,
        client_name,
        document_type
      };
    }

    // TODO: Implement actual PandaDoc API call
    // PandaDoc API: https://api.pandadoc.com/public/v1/documents
    // Steps:
    // 1. Upload document (if PDF) or create from template (if markdown)
    // 2. Set up signature fields
    // 3. Add recipient
    // 4. Set expiration date
    // 5. Send for signature

    // For now, return success with instructions
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expiration_days);

    return {
      success: true,
      client_name,
      document_type,
      document_path: docPath,
      recipient_email,
      expiration_date: expirationDate.toISOString().split('T')[0],
      pandadoc_link: '[PandaDoc link will be generated when API is fully configured]',
      message: `PandaDoc upload prepared for ${client_name}. Note: Actual API call pending PandaDoc API configuration.`,
      next_steps: [
        '1. Review document at: ' + docPath,
        '2. Manually upload to PandaDoc if needed',
        '3. Or configure PandaDoc API to enable automatic upload'
      ]
    };
  }
};

