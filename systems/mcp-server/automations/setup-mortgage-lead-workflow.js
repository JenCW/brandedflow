/**
 * Setup Mortgage Lead Workflow in n8n
 * Programmatically creates the n8n workflow via API (no manual clicking)
 */

const axios = require('axios');

module.exports = {
  description: 'Automatically creates the mortgage lead workflow in n8n via API',

  params: {
    n8n_url: {
      type: 'string',
      required: false,
      description: 'n8n instance URL (defaults to env var or localhost:5678)'
    },
    n8n_api_key: {
      type: 'string',
      required: false,
      description: 'n8n API key (defaults to env var)'
    },
    airtable_base_id: {
      type: 'string',
      required: true,
      description: 'Airtable Base ID (e.g., appXXXXXXXXXX)'
    },
    mcp_api_key: {
      type: 'string',
      required: false,
      description: 'MCP Server API key (defaults to first key in MCP_API_KEYS env var)'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const {
      n8n_url,
      n8n_api_key,
      airtable_base_id,
      mcp_api_key
    } = params;

    // Get configuration from env vars or params
    const n8nUrl = n8n_url || process.env.N8N_URL || 'http://localhost:5678';
    const n8nApiKey = n8n_api_key || process.env.N8N_API_KEY;
    const mcpApiKey = mcp_api_key || (process.env.MCP_API_KEYS || '').split(',')[0];

    if (!n8nApiKey) {
      throw new Error('n8n API key required (set N8N_API_KEY in .env or pass n8n_api_key param)');
    }

    if (!airtable_base_id) {
      throw new Error('airtable_base_id is required');
    }

    if (!mcpApiKey) {
      throw new Error('MCP API key not found (set MCP_API_KEYS in .env)');
    }

    // Build the workflow
    const workflow = {
      name: 'Mortgage Lead Processor',
      nodes: [
        {
          parameters: {
            pollTimes: {
              item: [
                {
                  mode: 'everyMinute'
                }
              ]
            },
            base: {
              __rl: true,
              value: airtable_base_id,
              mode: 'id'
            },
            table: {
              __rl: true,
              value: 'Mortgage Leads',
              mode: 'id'
            },
            triggerField: 'Created Time'
          },
          id: 'airtable-trigger',
          name: 'Airtable Trigger',
          type: 'n8n-nodes-base.airtableTrigger',
          typeVersion: 2,
          position: [240, 300],
          credentials: {
            airtableTokenApi: {
              id: 'REPLACE_WITH_YOUR_AIRTABLE_CREDENTIAL_ID',
              name: 'Airtable Personal Access Token'
            }
          }
        },
        {
          parameters: {
            method: 'POST',
            url: 'http://localhost:4000/run',
            sendHeaders: true,
            headerParameters: {
              parameters: [
                {
                  name: 'X-API-Key',
                  value: mcpApiKey
                },
                {
                  name: 'Content-Type',
                  value: 'application/json'
                }
              ]
            },
            sendBody: true,
            specifyBody: 'json',
            jsonBody: `={
  "automation": "process-mortgage-lead",
  "params": {
    "lead_name": "{{ $json.fields.Name }}",
    "lead_phone": "{{ $json.fields.Phone }}",
    "lead_email": "{{ $json.fields.Email }}",
    "lead_city": "{{ $json.fields.City }}",
    "lead_situation": "{{ $json.fields.Situation }}"
  },
  "dryRun": false
}`,
            options: {}
          },
          id: 'call-mcp-server',
          name: 'Call MCP Server',
          type: 'n8n-nodes-base.httpRequest',
          typeVersion: 4.2,
          position: [460, 300]
        },
        {
          parameters: {
            conditions: {
              options: {
                caseSensitive: true,
                leftValue: '',
                typeValidation: 'strict'
              },
              conditions: [
                {
                  id: 'success-condition',
                  leftValue: '={{ $json.ok }}',
                  rightValue: true,
                  operator: {
                    type: 'boolean',
                    operation: 'equals'
                  }
                }
              ],
              combinator: 'and'
            },
            options: {}
          },
          id: 'check-success',
          name: 'Check Success',
          type: 'n8n-nodes-base.if',
          typeVersion: 2,
          position: [680, 300]
        },
        {
          parameters: {
            mode: 'logCodeExecution',
            message: '=✅ Lead processed: {{ $json.result.lead.name }} - Email sent to {{ $json.result.recipient }}'
          },
          id: 'success-log',
          name: 'Success',
          type: 'n8n-nodes-base.code',
          typeVersion: 2,
          position: [900, 200]
        },
        {
          parameters: {
            mode: 'logCodeExecution',
            message: '=❌ Failed to process lead: {{ $json.error || "Unknown error" }}'
          },
          id: 'error-log',
          name: 'Error',
          type: 'n8n-nodes-base.code',
          typeVersion: 2,
          position: [900, 400]
        }
      ],
      connections: {
        'Airtable Trigger': {
          main: [
            [
              {
                node: 'Call MCP Server',
                type: 'main',
                index: 0
              }
            ]
          ]
        },
        'Call MCP Server': {
          main: [
            [
              {
                node: 'Check Success',
                type: 'main',
                index: 0
              }
            ]
          ]
        },
        'Check Success': {
          main: [
            [
              {
                node: 'Success',
                type: 'main',
                index: 0
              }
            ],
            [
              {
                node: 'Error',
                type: 'main',
                index: 0
              }
            ]
          ]
        }
      },
      settings: {
        executionOrder: 'v1'
      },
      active: false,
      tags: []
    };

    // Create workflow via n8n API
    try {
      const response = await axios.post(
        `${n8nUrl}/api/v1/workflows`,
        workflow,
        {
          headers: {
            'X-N8N-API-KEY': n8nApiKey,
            'Content-Type': 'application/json'
          }
        }
      );

      const workflowId = response.data.id;

      return {
        success: true,
        workflow_id: workflowId,
        workflow_name: workflow.name,
        n8n_url: n8nUrl,
        message: 'Workflow created successfully in n8n',
        next_steps: [
          '1. Open n8n and find the "Mortgage Lead Processor" workflow',
          '2. Add your Airtable credentials to the Airtable Trigger node',
          '3. Activate the workflow',
          '4. Test by adding a record to your Airtable base'
        ],
        notes: [
          'The workflow is created but NOT activated (you need to add Airtable credentials first)',
          'Make sure your MCP server is running on http://localhost:4000',
          'The workflow checks for new leads every minute'
        ]
      };

    } catch (error) {
      // Enhanced error handling
      if (error.response) {
        throw new Error(`n8n API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        throw new Error(`Cannot reach n8n at ${n8nUrl}. Is n8n running? Error: ${error.message}`);
      } else {
        throw new Error(`Setup error: ${error.message}`);
      }
    }
  }
};
