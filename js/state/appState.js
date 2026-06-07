/**
 * @file Centralized application state.
 * Single source of truth for UI — future admin panel hooks in here.
 */

/** @type {import('../models.js').Category[]} */
let categories = [];

/** @type {import('../models.js').Product[]} */
let products = [];

/** @type {import('../models.js').Review[]} */
let reviews = [];

/** @type {import('../models.js').KnowledgeArticle[]} */
let knowledgeArticles = [];

const uiState = {
    currentCategory: "",
    expandedProductId: null,
    searchQuery: "",
    sortMode: "default",
    selectedRating: 0,
    darkMode: localStorage.getItem("cafe_dark") === "true",
    motivationShown: false
};

export const appState = {
    getCategories: () => categories,
    setCategories: (data) => { categories = data; },

    getProducts: () => products,
    setProducts: (data) => { products = data; },

    getReviews: () => reviews,
    setReviews: (data) => { reviews = data; },

    getKnowledgeArticles: () => knowledgeArticles,
    setKnowledgeArticles: (data) => { knowledgeArticles = data; },

    getUi: () => uiState,

    setCurrentCategory(name) { uiState.currentCategory = name; },
    setExpandedProductId(id) { uiState.expandedProductId = id; },
    setSearchQuery(q) { uiState.searchQuery = q; },
    setSortMode(mode) { uiState.sortMode = mode; },
    setSelectedRating(r) { uiState.selectedRating = r; },
    setDarkMode(v) { uiState.darkMode = v; },
    setMotivationShown(v) { uiState.motivationShown = v; }
};
