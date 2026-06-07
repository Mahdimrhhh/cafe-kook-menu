/**
 * @file Category slider rendering.
 */

/**
 * @param {import('../models.js').Category[]} categories
 * @param {string} currentCategory
 */
export function renderCategoryChips(categories, currentCategory) {
    return categories.map(cat => `
        <div class="cat-chip ${currentCategory === cat.name ? "active" : ""}" data-category="${cat.name}">
            <span class="cat-icon">${cat.icon || "☕"}</span>
            <span class="cat-fa">${cat.name}</span>
        </div>
    `).join("");
}
