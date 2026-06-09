/**
 * @file Main application orchestrator.
 * Wires services, state, and UI renderers together.
 */

import { appState } from "./state/appState.js";
import { initCategoryService, categoryService } from "./services/categoryService.js";
import { initProductService, productService } from "./services/productService.js";
import { initReviewService, reviewService } from "./services/reviewService.js";
import { initKnowledgeService, knowledgeService } from "./services/knowledgeService.js";
import { showNotification, showMotivationalToast } from "./notifications/toastService.js";
import { renderMenuGrid, renderFeaturedStrip } from "./ui/productRenderer.js";
import { renderCategoryChips } from "./ui/categoryRenderer.js";
import {
    renderCoffeeKnowledge,
    initCoffeeGuideSlider,
    initCoffeeModal,
    stopGuideSlider
} from "./ui/knowledgeRenderer.js";
import { renderReviewSection } from "./ui/reviewRenderer.js";
import { renderFooter } from "./ui/footerRenderer.js";

async function initServices() {
    await Promise.all([
        initCategoryService(),
        initProductService(),
        initReviewService(),
        initKnowledgeService()
    ]);
}

function getFilteredSortedItems() {
    const ui = appState.getUi();
    let items = appState.getProducts().filter(p => {
        const cat = appState.getCategories().find(c => c.name === ui.currentCategory);
        return cat && p.categoryId === cat.id && p.available;
    });

    if (ui.searchQuery) {
        const q = ui.searchQuery.trim();
        items = items.filter(i =>
            i.name.includes(q) ||
            i.description.includes(q) ||
            (i.ingredients && i.ingredients.includes(q))
        );
    }

    if (ui.sortMode === "price_asc") items.sort((a, b) => a.price - b.price);
    else if (ui.sortMode === "price_desc") items.sort((a, b) => b.price - a.price);

    return items;
}

function renderCategoriesSlider() {
    const slider = document.getElementById("categoriesSlider");
    if (!slider) return;

    const ui = appState.getUi();
    const categories = appState.getCategories();
    slider.innerHTML = renderCategoryChips(categories, ui.currentCategory);

    slider.querySelectorAll(".cat-chip").forEach(chip => {
        chip.onclick = () => {
            appState.setCurrentCategory(chip.dataset.category);
            appState.setExpandedProductId(null);
            renderCategoriesSlider();
            renderMainContent();
            setTimeout(() => {
                document.querySelector(".cat-chip.active")?.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "nearest"
                });
            }, 50);
        };
    });
}

function updateFeaturedStrip() {
    const strip = document.querySelector(".featured-strip");
    if (!strip) return;

    const featured = appState.getProducts().filter(p => p.featured && p.available);
    const product = featured.length
        ? featured[Math.floor(Math.random() * featured.length)]
        : appState.getProducts().find(p => p.available);

    strip.outerHTML = renderFeaturedStrip(product);
}

function bindExpandButtons() {
    const ui = appState.getUi();

    document.querySelectorAll(".expand-mini-btn").forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute("data-id"), 10);
            const card = btn.closest(".menu-card");
            const expandEl = card?.querySelector(".menu-card-expand");
            const icon = btn.querySelector("i");
            const label = btn.querySelector("span");
            const wasExpanded = ui.expandedProductId === id;

            document.querySelectorAll(".menu-card.expanded").forEach(c => {
                if (c !== card) {
                    c.classList.remove("expanded");
                    c.querySelector(".menu-card-expand")?.classList.remove("open");
                    const otherBtn = c.querySelector(".expand-mini-btn");
                    if (otherBtn) {
                        otherBtn.setAttribute("aria-expanded", "false");
                        otherBtn.querySelector("i")?.classList.replace("fa-chevron-up", "fa-chevron-down");
                        const otherLabel = otherBtn.querySelector("span");
                        if (otherLabel) otherLabel.textContent = "جزئیات";
                    }
                }
            });

            if (wasExpanded) {
                appState.setExpandedProductId(null);
                card?.classList.remove("expanded");
                expandEl?.classList.remove("open");
                btn.setAttribute("aria-expanded", "false");
                icon?.classList.replace("fa-chevron-up", "fa-chevron-down");
                if (label) label.textContent = "جزئیات";
            } else {
                appState.setExpandedProductId(id);
                card?.classList.add("expanded");
                expandEl?.classList.add("open");
                btn.setAttribute("aria-expanded", "true");
                icon?.classList.replace("fa-chevron-down", "fa-chevron-up");
                if (label) label.textContent = "بستن";
            }
        };
    });
}

function bindReviewForm() {
    const ui = appState.getUi();

    document.querySelectorAll(".rating-star").forEach(star => {
        star.onclick = () => {
            const rating = parseInt(star.dataset.rating, 10);
            const newRating = ui.selectedRating === rating ? 0 : rating;
            appState.setSelectedRating(newRating);
            document.querySelectorAll(".rating-star").forEach((s, i) => {
                s.classList.toggle("active", i < newRating);
            });
        };
    });

    document.getElementById("submitReviewBtn")?.addEventListener("click", async () => {
        const text = document.getElementById("reviewText")?.value?.trim();
        if (!text) {
            showNotification("لطفاً نظر خود را بنویسید");
            return;
        }

        await reviewService.create({
            text,
            rating: ui.selectedRating || null
        });

        appState.setSelectedRating(0);
        await renderMainContent();
        showNotification("نظرت با ❤️ ثبت شد! ممنونیم");
    });
}

async function renderMainContent() {
    const container = document.getElementById("dynamicContent");
    if (!container) return;

    const ui = appState.getUi();
    const items = getFilteredSortedItems();
    const reviews = await reviewService.getAll();
    const articles = await knowledgeService.getAll();

    container.innerHTML =
        renderMenuGrid(items, ui.expandedProductId) +
        renderCoffeeKnowledge(articles) +
        renderReviewSection(reviews, ui.selectedRating);

    initCoffeeModal();
    initCoffeeGuideSlider();
    bindExpandButtons();
    bindReviewForm();
}

function initThemeToggle() {
    const themeBtn = document.getElementById("themeToggle");
    if (!themeBtn) return;

    const ui = appState.getUi();
    if (ui.darkMode) {
        document.body.classList.add("dark");
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        appState.setDarkMode(isDark);
        localStorage.setItem("cafe_dark", isDark);
        themeBtn.textContent = isDark ? "☀️" : "🌙";
    });
}

function initSearchAndSort() {
    const searchInput = document.getElementById("searchInput");
    const sortBtn = document.getElementById("sortBtn");

    sortBtn?.addEventListener("click", () => {
        const ui = appState.getUi();
        let mode = ui.sortMode;
        if (mode === "default") mode = "price_asc";
        else if (mode === "price_asc") mode = "price_desc";
        else mode = "default";
        appState.setSortMode(mode);

        if (mode === "price_asc") sortBtn.innerHTML = '<i class="fas fa-arrow-up-wide-short"></i> ارزان‌ترین';
        else if (mode === "price_desc") sortBtn.innerHTML = '<i class="fas fa-arrow-down-wide-short"></i> گران‌ترین';
        else sortBtn.innerHTML = '<i class="fas fa-clock"></i> پیش‌فرض';

        renderMainContent();
    });

    searchInput?.addEventListener("input", (e) => {
        appState.setSearchQuery(e.target.value);
        renderMainContent();
    });

    document.getElementById("clearSearchBtn")?.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        appState.setSearchQuery("");
        renderMainContent();
    });
}

function initHeaderScroll() {
    const header = document.querySelector(".hero-header");

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const headerHeight = header.offsetHeight;

        const opacity = Math.max(0, 1 - scrollY / (headerHeight * 0.6));
        header.style.opacity = opacity;
        // translateY رو کامل حذف کن
    });
}

function showMenuView() {
    document.body.classList.remove("home-view");
    document.getElementById("homePage").style.display = "none";
    document.getElementById("mainApp").classList.add("active");
}

function showHomeView() {
    document.body.classList.add("home-view");
    document.getElementById("homePage").style.display = "flex";
    document.getElementById("mainApp").classList.remove("active");
    stopGuideSlider();
}

function initNavigation() {
    document.getElementById("enterCafeBtn")?.addEventListener("click", () => {
        showMenuView();
        renderCategoriesSlider();
        updateFeaturedStrip();
        renderMainContent();

        const ui = appState.getUi();
        if (!ui.motivationShown) {
            showMotivationalToast();
            appState.setMotivationShown(true);
        }
    });

    document.getElementById("backHomeBtn")?.addEventListener("click", (e) => {
        e.preventDefault();
        showHomeView();
    });
}

function initFooter() {
    const footerEl = document.querySelector(".footer");
    if (footerEl) {
        footerEl.outerHTML = renderFooter();
    }
}

async function bootstrap() {
    await initServices();
    initThemeToggle();
    initSearchAndSort();
    initNavigation();
    initFooter();
    renderCategoriesSlider();
    initHeaderScroll();
}

bootstrap();

// Export for future admin panel integration
export { appState, productService, categoryService, reviewService, knowledgeService };
