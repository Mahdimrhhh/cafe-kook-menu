/**
 * @file Product card rendering — pure UI, no data logic.
 */

export function formatPrice(price) {
    return price.toLocaleString("fa-IR") + " تومان";
}

/**
 * @param {import('../models.js').Product} item
 * @param {number|null} expandedItemId
 */
export function renderMenuCard(item, expandedItemId) {
    const imgSrc = item.image 
        ? (item.image.startsWith("http") ? item.image : `http://localhost:5000${item.image}`)
        : "./img/default.jpg";
    const isExpanded = expandedItemId === item.id;

    return `
       <article class="menu-card ${isExpanded ? "expanded" : ""}" draggable="true" data-id="${item.id}">
            <div class="menu-card-main">
                <div class="menu-card-image-wrap">
                    <img src="${imgSrc}" alt="${item.name}" id="img-${item.id}" loading="lazy">
                </div>
                <div class="menu-card-body">
                    <div class="menu-card-header">
                        <h3 class="menu-card-title">${item.name}</h3>
                        <span class="menu-card-price">${formatPrice(item.price)}</span>
                    </div>
                    <p class="menu-card-desc">${item.description}</p>
                    <button class="menu-card-details-btn expand-mini-btn" data-id="${item.id}" aria-expanded="${isExpanded}">
                        <i class="fas fa-chevron-${isExpanded ? "up" : "down"}"></i>
                        <span>${isExpanded ? "بستن" : "جزئیات"}</span>
                    </button>
                    
                </div>
            </div>
            <div class="menu-card-expand ${isExpanded ? "open" : ""}">
                <div class="menu-card-expand-inner">
                    <div class="card-detail-block">
                        <strong>توضیحات کامل</strong>
                        <p>${item.description}</p>
                    </div>
                    <div class="card-detail-block">
                        <strong>مواد تشکیل‌دهنده</strong>
                        <p>${item.ingredients || "—"}</p>
                    </div>
                    
                </div>
            </div>
        </article>
    `;
}

/**
 * @param {import('../models.js').Product[]} items
 * @param {number|null} expandedItemId
 */
export function renderMenuGrid(items, expandedItemId) {
    if (!items.length) {
        return `<div class="menu-grid">
            <div class="menu-empty">
                <i class="fas fa-mug-hot"></i>
                <p>محصولی یافت نشد</p>
            </div>
        </div>`;
    }

    const cards = items.map(item => renderMenuCard(item, expandedItemId)).join("");
    return `<div class="menu-grid">${cards}</div>`;
}

/**
 * @param {import('../models.js').Product|null} product
 */
export function renderFeaturedStrip(product) {
    if (!product) {
        return `
            <div class="featured-strip">
                <div class="featured-strip-badge">⭐ پیشنهاد امروز</div>
                <div class="featured-strip-info">
                    <h3>لاته کلاسیک</h3>
                    <p>محبوب‌ترین نوشیدنی این هفته</p>
                </div>
                <span class="featured-strip-price">۹۲,۰۰۰ تومان</span>
            </div>`;
    }

    return `
        <div class="featured-strip">
            <div class="featured-strip-badge">⭐ پیشنهاد امروز</div>
            <div class="featured-strip-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
            </div>
            <span class="featured-strip-price">${formatPrice(product.price)}</span>
        </div>`;
}
