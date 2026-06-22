// MCP Server Launcher - Fixes module resolution for monorepo
process.env.NODE_PATH = __dirname;
require('module')._initPaths();

require('./packages/mcp-server/src/index.js');