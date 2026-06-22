// Error Handler Middleware

const logger = require('shared/utils/logger');

/**
 * Global error handler middleware
 */
function errorHandler(err, req, res, next) {
  // Log the error
  logger.error('Request error', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Handle validation errors
  if (err.details) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Invalid request data',
      details: err.details,
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid token',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Token expired',
    });
  }

  // Handle database errors
  if (err.code && err.code.startsWith('23')) {
    // PostgreSQL integrity constraint errors
    if (err.code === '23505') {
      return res.status(409).json({
        error: 'Conflict',
        message: 'Resource already exists',
      });
    }
    if (err.code === '23503') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Referenced resource does not exist',
      });
    }
  }

  // Handle known error types
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.name || 'Error',
      message: err.message,
    });
  }

  // Default to 500 Internal Server Error
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : err.message,
  });
}

/**
 * Not found handler middleware
 */
function notFoundHandler(req, res) {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
  });
}

/**
 * Request ID middleware
 */
function requestId(req, res, next) {
  const uuid = require('uuid');
  req.id = req.headers['x-request-id'] || uuid.v4();
  res.setHeader('X-Request-ID', req.id);
  next();
}

/**
 * Async handler wrapper to catch async errors
 * @param {Function} fn - Async route handler
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = {
  errorHandler,
  notFoundHandler,
  requestId,
  asyncHandler,
};
