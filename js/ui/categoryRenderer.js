/**
 * @file Category slider rendering.
 */

/**
 * @param {import('../models.js').Category[]} categories
 * @param {string} currentCategory
 */
export function renderCategoryChips(categories, currentCategory) {
    return categories.map(cat => {
        const iconKey = (cat.icon || "default").toString().trim();
        // اگر قبلاً ایموجی ذخیره شده، از default استفاده می‌کنیم
        const isEmoji = /[\u{1F300}-\u{1F9FF}]/u.test(iconKey) || iconKey.length <= 2;
        const iconSrc = isEmoji
            ? "icons/default.svg"
            : `icons/${iconKey}.svg`;

        return `
            <div class="cat-chip ${currentCategory === cat.name ? "active" : ""}" data-category="${cat.name}">
                <span class="cat-icon">
                    <img src="${iconSrc}" alt="" class="cat-icon-svg" onerror="this.src='icons/default.svg'">
                </span>
                <span class="cat-fa">${cat.name}</span>
            </div>
        `;
    }).join("");
}
