/**
 * @file Category service — mock now, REST API later.
 */

import { API_CONFIG, apiRequest } from "./apiClient.js";
import { mockCategories } from "../data/mockProducts.js";
import { appState } from "../state/appState.js";

let categoryStore = [...mockCategories];

function syncState() {
    appState.setCategories([...categoryStore]);
}

export const categoryService = {
    async getAll() {
        if (!API_CONFIG.USE_MOCK) {
            const data = await apiRequest("/categories");
            console.log("Categories loaded from API:", data);
            categoryStore = data;
            syncState();
            return data;
        }
        syncState();
        return [...categoryStore];
    },

    async getById(id) {
        const categories = await this.getAll();
        return categories.find(c => c.id === id) || null;
    },

    /** Admin: create category */
    async create(data) {
        if (!API_CONFIG.USE_MOCK) {
            const created = await apiRequest("/categories", {
                method: "POST",
                body: JSON.stringify(data)
            });
            categoryStore.push(created);
            syncState();
            return created;
        }

        const newCat = {
            id: Math.max(...categoryStore.map(c => c.id), 0) + 1,
            icon: "☕",
            ...data
        };
        categoryStore.push(newCat);
        syncState();
        return newCat;
    },

    /** Admin: update category */
    async update(id, updates) {
        if (!API_CONFIG.USE_MOCK) {
           const updated = await apiRequest(`/categories/${id}`, {
               method: "PUT",
               body: JSON.stringify(updates)
            });
            const idx = categoryStore.findIndex(c => c.id === id);
            if (idx !== -1) categoryStore[idx] = updated;
            syncState();
            return updated;
        }

        const idx = categoryStore.findIndex(c => c.id === id);
        if (idx === -1) return null;
        categoryStore[idx] = { ...categoryStore[idx], ...updates };
        syncState();
        return categoryStore[idx];
    },

    /** Admin: delete category */
    async delete(id) {
        if (!API_CONFIG.USE_MOCK) {
            await apiRequest(`/categories/${id}`, { method: "DELETE" });
        }
        categoryStore = categoryStore.filter(c => c.id !== id);
        syncState();
        return true;
    }
};

export async function initCategoryService() {
    const categories = await categoryService.getAll();
    if (categories.length && !appState.getUi().currentCategory) {
        appState.setCurrentCategory(categories[0].name);
    }
}
