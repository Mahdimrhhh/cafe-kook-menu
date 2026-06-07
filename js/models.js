/**
 * @file Data models for Cafe Kook frontend.
 * These interfaces mirror the future REST API contract.
 */

/**
 * @typedef {Object} Category
 * @property {number} id
 * @property {string} name
 * @property {string} icon - Emoji or icon class identifier
 */

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {string} category - Category name (denormalized for display)
 * @property {number} categoryId
 * @property {string} image
 * @property {string} description
 * @property {string} ingredients
 * @property {number} price
 * @property {boolean} available
 * @property {boolean} featured
 * @property {string} [servingStyle]
 * @property {string} [notes]
 */

/**
 * @typedef {Object} Review
 * @property {number} id
 * @property {string} name
 * @property {number|null} rating
 * @property {string} text
 * @property {number} createdAt - Unix timestamp
 * @property {boolean} approved - Admin approval status
 */

/**
 * @typedef {Object} KnowledgeArticle
 * @property {number} id
 * @property {string} title
 * @property {string} shortDescription
 * @property {string} fullDescription
 * @property {string} image
 * @property {string} category
 * @property {string} icon - Display emoji
 * @property {string} [fact] - Quick fact for card display
 */

/**
 * @typedef {Object} MotivationalMessage
 * @property {number} id
 * @property {string} text
 * @property {string} icon
 * @property {string} category
 */

export {};
