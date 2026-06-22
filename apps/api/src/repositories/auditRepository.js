// Audit Repository - Database operations for audit logs

const db = require('shared/database');
const logger = require('shared/utils/logger');

class AuditRepository {
  /**
   * Create a new audit log entry
   * @param {Object} auditData - Audit data
   * @returns {Promise<Object>} Created audit entry
   */
  async create(auditData) {
    const { userId, action, resource, details, ipAddress, userAgent } = auditData;

    const query = `
      INSERT INTO audit_logs (user_id, action, resource, details, ip_address, user_agent)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, user_id as "userId", action, resource, details,
               ip_address as "ipAddress", user_agent as "userAgent",
               created_at as "createdAt"
    `;

    const result = await db.query(query, [
      userId,
      action,
      resource,
      JSON.stringify(details || {}),
      ipAddress,
      userAgent
    ]);

    logger.debug('Audit log created', { action, resource, userId });
    return result.rows[0];
  }

  /**
   * Find audit logs by user ID
   * @param {string} userId - User UUID
   * @param {Object} options - Query options
   * @returns {Promise<Array>} List of audit logs
   */
  async findByUserId(userId, options = {}) {
    const { limit = 50, offset = 0 } = options;

    const query = `
      SELECT id, user_id as "userId", action, resource, details,
             ip_address as "ipAddress", user_agent as "userAgent",
             created_at as "createdAt"
      FROM audit_logs
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `;

    const result = await db.query(query, [userId, limit, offset]);
    return result.rows;
  }

  /**
   * Find audit logs by action
   * @param {string} action - Action type
   * @param {Object} options - Query options
   * @returns {Promise<Array>} List of audit logs
   */
  async findByAction(action, options = {}) {
    const { limit = 50, offset = 0 } = options;

    const query = `
      SELECT id, user_id as "userId", action, resource, details,
             ip_address as "ipAddress", user_agent as "userAgent",
             created_at as "createdAt"
      FROM audit_logs
      WHERE action = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `;

    const result = await db.query(query, [action, limit, offset]);
    return result.rows;
  }

  /**
   * Get recent audit logs
   * @param {number} limit - Number of records
   * @returns {Promise<Array>} Recent audit logs
   */
  async getRecent(limit = 100) {
    const query = `
      SELECT id, user_id as "userId", action, resource, details,
             ip_address as "ipAddress", user_agent as "userAgent",
             created_at as "createdAt"
      FROM audit_logs
      ORDER BY created_at DESC
      LIMIT $1
    `;

    const result = await db.query(query, [limit]);
    return result.rows;
  }

  /**
   * Clean up old audit logs
   * @param {number} retentionDays - Days to retain
   * @returns {Promise<number>} Number of deleted records
   */
  async cleanup(retentionDays = 90) {
    const query = `
      DELETE FROM audit_logs
      WHERE created_at < CURRENT_TIMESTAMP - INTERVAL '1 day' * $1
      RETURNING id
    `;

    const result = await db.query(query, [retentionDays]);
    const deletedCount = result.rowCount;

    if (deletedCount > 0) {
      logger.info('Audit logs cleaned up', { deletedCount, retentionDays });
    }

    return deletedCount;
  }
}

module.exports = new AuditRepository();
