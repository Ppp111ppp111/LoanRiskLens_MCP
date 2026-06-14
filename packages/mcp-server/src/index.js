// MCP Server Entry Point

const { createMCPServer } = require('./server/mcpServer');
const logger = require('../../shared/src/utils/logger');

async function main() {
  try {
    const server = await createMCPServer({
      port: parseInt(process.env.MCP_PORT || '3001'),
      host: process.env.MCP_HOST || 'localhost',
    });

    await server.start();

    console.log(`
╔══════════════════════════════════════════════════════════════╗
║     AltCredit Intelligence MCP Server                       ║
║     Version: 1.0.0                                          ║
╠══════════════════════════════════════════════════════════════╣
║  MCP Endpoint: http://localhost:${server.port}/mcp                ║
║  Health Check: http://localhost:${server.port}/health             ║
╠══════════════════════════════════════════════════════════════╣
║  Available Tools:                                            ║
║    • analyze_creditworthiness                               ║
║    • analyze_financial_behavior                             ║
║    • generate_underwriting_report                           ║
╚══════════════════════════════════════════════════════════════╝
    `);

    // Graceful shutdown handlers
    process.on('SIGTERM', async () => {
      logger.info('SIGTERM received, shutting down...');
      await server.stop();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      logger.info('SIGINT received, shutting down...');
      await server.stop();
      process.exit(0);
    });

  } catch (error) {
    logger.error('Failed to start MCP server', { error: error.message });
    process.exit(1);
  }
}

main();
