/**
 * @file Review section rendering.
 */

function renderStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        stars += `<i class="fas fa-star ${i <= rating ? "filled" : ""}"></i>`;
    }
    return `<span class="review-stars">${stars}</span>`;
}

/**
 * @param {import('../models.js').Review[]} reviews
 */
export function renderReviewsList(reviews) {
    if (!reviews.length) {
        return `<div class="reviews-empty">
            <i class="fas fa-comment-dots"></i>
            <p>هنوز نظری ثبت نشده. اولین نفر باشید!</p>
        </div>`;
    }

    return reviews.slice().reverse().map((r, i) => `
        <div class="review-card" style="animation-delay:${i * 0.06}s">
            <div class="review-card-header">
                <span class="review-author">${r.name}</span>
                ${r.rating ? renderStars(r.rating) : ""}
            </div>
            <p class="review-text">${r.text}</p>
        </div>
    `).join("");
}

/**
 * @param {import('../models.js').Review[]} reviews
 * @param {number} selectedRating
 */
export function renderReviewSection(reviews, selectedRating) {
    return `
        <section class="review-section">
            <div class="review-section-header">
                <span class="review-badge">نظرات مهمانان</span>
                <h3>تجربه شما برای ما ارزشمند است</h3>
                <p>بدون ثبت‌نام، نظر خود را به‌صورت ناشناس با ما به اشتراک بگذارید</p>
            </div>
            <div class="review-form">
                <label class="rating-label">امتیاز (اختیاری)</label>
                <div class="rating-input" id="ratingInput">
                    ${[1, 2, 3, 4, 5].map(n =>
                        `<button type="button" class="rating-star ${selectedRating >= n ? "active" : ""}" data-rating="${n}" aria-label="${n} ستاره">
                            <i class="fas fa-star"></i>
                        </button>`
                    ).join("")}
                </div>
                <textarea id="reviewText" rows="3" placeholder="نظر یا پیشنهاد شما..."></textarea>
                <button class="submit-btn" id="submitReviewBtn">
                    <i class="fas fa-paper-plane"></i>
                    ارسال نظر
                </button>
            </div>
            <div class="reviews-list" id="reviewsList">
                ${renderReviewsList(reviews)}
            </div>
        </section>
    `;
}
