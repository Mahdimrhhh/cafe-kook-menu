/**
 * @file Product card rendering — pure UI, no data logic.
 */

export function formatPrice(price) {
    return Number(price || 0).toLocaleString("fa-IR") + " تومان";
}

export function renderMenuCard(item) {
    const imgSrc = item.image
        ? (item.image.startsWith("http") ? item.image : `http://localhost:5000${item.image}`)
        : "./img/default.jpg";

    const desc = (item.description || "").trim();
    const shortDesc = desc.length > 42 ? desc.slice(0, 42) + "..." : desc;

    return `
        <article class="menu-card" data-id="${item.id}">
            <div class="menu-card-image-wrap">
                <img src="${imgSrc}" alt="${item.name || ""}" loading="lazy">
            </div>
            <div class="menu-card-body">
                <h3 class="menu-card-title">${item.name || ""}</h3>
                <p class="menu-card-desc">${shortDesc}</p>
                <div class="menu-card-price-btn">${formatPrice(item.price)}</div>
            </div>
        </article>
    `;
}

export function renderMenuGrid(items = []) {
    if (!items.length) {
        return `
            <div class="menu-grid">
                <div class="menu-empty">
                    <p>محصولی یافت نشد</p>
                </div>
            </div>
        `;
    }

    const cards = items.map(item => renderMenuCard(item)).join("");
    return `<div class="menu-grid">${cards}</div>`;
}

export function renderFeaturedStrip(product) {
    if (!product) {
        return `
            <div class="featured-strip">
                <div class="featured-strip-badge">پیشنهاد امروز</div>
                <div class="featured-strip-info">
                    <h3>پیشنهاد ویژه</h3>
                    <p>یکی از محبوب‌ترین آیتم‌ها</p>
                </div>
            </div>
        `;
    }

    return `
        <div class="featured-strip">
            <div class="featured-strip-badge">پیشنهاد امروز</div>
            <div class="featured-strip-info">
                <h3>${product.name || ""}</h3>
                <p>${product.description || ""}</p>
            </div>
            <span class="featured-strip-price">${formatPrice(product.price)}</span>
        </div>
    `;
}