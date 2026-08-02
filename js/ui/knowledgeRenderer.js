/**
 * @file Coffee knowledge section rendering + slider init.
 * Uses container-only scroll — never scrollIntoView (prevents page jump).
 */

let guideAutoSlideTimer = null;

/**
 * Scroll slider container only — does NOT affect page scroll position.
 * @param {HTMLElement} slider
 * @param {HTMLElement} card
 * @param {boolean} smooth
 */
export function scrollSliderToCard(slider, card, smooth = true) {
    const sliderRect = slider.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const delta = (cardRect.left + cardRect.width / 2) - (sliderRect.left + sliderRect.width / 2);

    slider.scrollBy({
        left: delta,
        behavior: smooth ? "smooth" : "auto"
    });
}

/**
 * @param {import('../models.js').KnowledgeArticle[]} articles
 */
export function renderCoffeeKnowledge(articles) {
    const cards = articles.map(topic => `
        <div class="guide-card" data-article-id="${topic.id}">
            <div class="guide-card-icon">
              <img
                src="icons/${topic.icon || 'default'}.svg"
                alt=""
                class="guide-icon-svg"
                onerror="this.src='icons/default.svg'"
              > 
            </div>
            <h4>${topic.title}</h4>
            <p class="guide-short">${topic.shortDescription}</p>
            <div class="guide-fact">
                <i class="fas fa-lightbulb"></i>
                <span>${topic.fact || ""}</span>
            </div>
            <button
                class="read-more-btn"
                type="button"
                data-title="${topic.title}"
                data-content="${topic.fullDescription}"
            >بیشتر بخوانید</button>
        </div>
    `).join("");

    return `
        <section class="coffee-knowledge">
            <div class="coffee-knowledge-header">
                <span class="coffee-knowledge-badge">دانش قهوه</span>
                <h3>راهنمای کوتاه دنیای قهوه</h3>
                <p>با دانه، روش دم‌آوری و نوشیدنی‌های محبوب آشنا شوید</p>
            </div>
            <div class="coffee-guide-slider" id="coffeeGuideSlider">
                ${cards}
            </div>
            <div class="guide-dots" id="guideDots"></div>
        </section>
    `;
}

export function stopGuideSlider() {
    if (guideAutoSlideTimer) {
        clearInterval(guideAutoSlideTimer);
        guideAutoSlideTimer = null;
    }
}

export function initCoffeeGuideSlider() {
    stopGuideSlider();

    const slider = document.getElementById("coffeeGuideSlider");
    const dotsContainer = document.getElementById("guideDots");
    if (!slider || !dotsContainer) return;

    const cards = slider.querySelectorAll(".guide-card");
    if (!cards.length) return;

    dotsContainer.innerHTML = "";
    cards.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = `guide-dot ${i === 0 ? "active" : ""}`;
        dot.setAttribute("aria-label", `اسلاید ${i + 1}`);
        dot.tabIndex = -1;
        dot.addEventListener("click", (e) => {
            e.preventDefault();
            goToSlide(i);
        });
        dotsContainer.appendChild(dot);
    });

    let currentIndex = 0;

    function updateDots(index) {
        dotsContainer.querySelectorAll(".guide-dot").forEach((d, i) => {
            d.classList.toggle("active", i === index);
        });
    }

    function goToSlide(index, smooth = true) {
        currentIndex = index;
        scrollSliderToCard(slider, cards[index], smooth);
        updateDots(index);
    }

    slider.addEventListener("scroll", () => {
        let closest = 0;
        let minDist = Infinity;
        cards.forEach((card, i) => {
            const dist = Math.abs(
                card.offsetLeft - slider.scrollLeft - slider.clientWidth / 2 + card.offsetWidth / 2
            );
            if (dist < minDist) {
                minDist = dist;
                closest = i;
            }
        });
        if (closest !== currentIndex) {
            currentIndex = closest;
            updateDots(closest);
        }
    }, { passive: true });

    guideAutoSlideTimer = setInterval(() => {
        const next = (currentIndex + 1) % cards.length;
        goToSlide(next, true);
    }, 4500);
}

export function initCoffeeModal() {
    const modal = document.getElementById("coffeeModal");
    const title = document.getElementById("modalTitle");
    const content = document.getElementById("modalContent");
    if (!modal) return;

    document.querySelectorAll(".read-more-btn").forEach(btn => {
        btn.onclick = () => {
            title.textContent = btn.dataset.title;
            content.textContent = btn.dataset.content;
            modal.classList.add("active");
        };
    });

    document.getElementById("closeCoffeeModal").onclick = () => {
        modal.classList.remove("active");
    };

    modal.onclick = (e) => {
        if (e.target === modal) modal.classList.remove("active");
    };
}
