// API Server Launcher - Fixes module resolution for monorepo
process.env.NODE_PATH = __dirname;
require('module')._initPaths();

require('./apps/api/src/index.js');