// MCP Server Implementation

const express = require('express');
const http = require('http');
const config = require('../../../../shared/src/config');
const db = require('../../../../shared/src/database');
const logger = require('../../../../shared/src/utils/logger');
const { TOOL_DEFINITIONS, executeTool } = require('../tools/creditTools');

/**
 * Alternative Credit Intelligence MCP Server
 *
 * This server exposes credit intelligence tools via the Model Context Protocol,
 * enabling AI clients like Claude Desktop, Cursor, and VSCode to access
 * fintech underwriting capabilities.
 */

class AltCreditMCPServer {
  constructor(options = {}) {
    this.port = options.port || config.mcp.port;
    this.host = options.host || 'localhost';
    this.server = null;
    this.expressApp = null;
    this.isRunning = false;
  }

  /**
   * Initialize the MCP server
   */
  async initialize() {
    // Create Express app for health checks
    this.expressApp = express();
    this.expressApp.use(express.json());

    // Health check endpoint
    this.expressApp.get('/health', (req, res) => {
      res.json({
        status: 'healthy',
        service: config.mcp.name,
        version: config.mcp.version,
        timestamp: new Date().toISOString(),
      });
    });

    // MCP protocol endpoint
    this.expressApp.post('/mcp', async (req, res) => {
      try {
        const { method, params, id } = req.body;

        switch (method) {
          case 'tools/list':
            res.json({
              jsonrpc: '2.0',
              result: {
                tools: TOOL_DEFINITIONS,
              },
              id,
            });
            break;

          case 'tools/call':
            const { name, arguments: toolArgs } = params;
            const result = await executeTool(name, toolArgs);
            res.json({
              jsonrpc: '2.0',
              result: {
                content: [
                  {
                    type: 'text',
                    text: JSON.stringify(result, null, 2),
                  },
                ],
              },
              id,
            });
            break;

          case 'initialize':
            res.json({
              jsonrpc: '2.0',
              result: {
                protocolVersion: '2024-11-05',
                capabilities: {
                  tools: {
                    listChanged: true,
                  },
                },
                serverInfo: {
                  name: config.mcp.name,
                  version: config.mcp.version,
                },
              },
              id,
            });
            break;

          case 'tools/list_changed':
            res.json({
              jsonrpc: '2.0',
              result: {
                tools: TOOL_DEFINITIONS,
              },
              id,
            });
            break;

          default:
            res.json({
              jsonrpc: '2.0',
              error: {
                code: -32601,
                message: `Method not found: ${method}`,
              },
              id,
            });
        }
      } catch (error) {
        logger.error('MCP request error', { error: error.message });
        res.json({
          jsonrpc: '2.0',
          error: {
            code: -32603,
            message: error.message,
          },
          id: req.body.id,
        });
      }
    });

    // Create HTTP server
    this.server = http.createServer(this.expressApp);

    return this;
  }

  /**
   * Start the MCP server
   */
  async start() {
    if (this.isRunning) {
      throw new Error('Server is already running');
    }

    // Initialize database
    try {
      await db.initializeSchema();
      logger.info('Database initialized for MCP server');
    } catch (error) {
      logger.warn('Database initialization skipped (may already be initialized)', { error: error.message });
    }

    // Start listening
    return new Promise((resolve, reject) => {
      this.server.listen(this.port, this.host, () => {
        this.isRunning = true;
        logger.info(`AltCredit MCP Server started`, {
          host: this.host,
          port: this.port,
          endpoints: {
            health: `http://${this.host}:${this.port}/health`,
            mcp: `http://${this.host}:${this.port}/mcp`,
          },
        });
        resolve(this);
      });

      this.server.on('error', (error) => {
        logger.error('Server error', { error: error.message });
        reject(error);
      });
    });
  }

  /**
   * Stop the MCP server
   */
  async stop() {
    if (!this.isRunning) {
      return;
    }

    return new Promise((resolve) => {
      this.server.close(() => {
        this.isRunning = false;
        logger.info('MCP Server stopped');
        resolve();
      });
    });
  }

  /**
   * Check if server is running
   */
  getStatus() {
    return {
      running: this.isRunning,
      host: this.host,
      port: this.port,
      name: config.mcp.name,
      version: config.mcp.version,
    };
  }
}

// Factory function to create and start server
async function createMCPServer(options = {}) {
  const server = new AltCreditMCPServer(options);
  await server.initialize();
  return server;
}

// Run as standalone server
async function main() {
  const server = await createMCPServer({
    port: process.env.MCP_PORT || 3001,
    host: process.env.MCP_HOST || 'localhost',
  });

  await server.start();

  // Handle shutdown
  process.on('SIGTERM', async () => {
    logger.info('Shutting down MCP server...');
    await server.stop();
    await db.closePool();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    logger.info('Shutting down MCP server...');
    await server.stop();
    await db.closePool();
    process.exit(0);
  });
}

// Export for use as module
module.exports = {
  AltCreditMCPServer,
  createMCPServer,
  executeTool,
  getToolDefinitions: () => TOOL_DEFINITIONS,
};

// Run if standalone
if (require.main === module) {
  main().catch((error) => {
    logger.error('Failed to start MCP server', { error: error.message });
    process.exit(1);
  });
}
