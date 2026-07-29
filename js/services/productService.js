/**
 * @file Product service — mock now, REST API later.
 * Admin-ready CRUD operations.
 */

import { API_CONFIG, apiRequest } from "./apiClient.js";
import { mockProducts } from "../data/mockProducts.js";
import { appState } from "../state/appState.js";

let productStore = [...mockProducts];
let nextId = Math.max(...productStore.map(p => p.id), 0) + 1;

function syncState() {
    appState.setProducts([...productStore]);
}

export const productService = {
    async getAll() {
        if (!API_CONFIG.USE_MOCK) {
            const data = await apiRequest("/products");
            productStore = data;
            syncState();
            return data;
        }
        syncState();
        return [...productStore];
    },

    async getById(id) {
        const products = await this.getAll();
        return products.find(p => p.id === id) || null;
    },

   async getByCategory(categoryName) {
    const products = await this.getAll();
    // موقتاً همه محصولات موجود رو برمی‌گردونه
    return products.filter(p => p.available !== false);
},

    async getFeatured() {
        const products = await this.getAll();
        return products.filter(p => p.featured && p.available);
    },

    async search(query, categoryName) {
    let products = await this.getAll();
    products = products.filter(p => p.available !== false);

    if (!query?.trim()) return products;

    const q = query.trim();
    return products.filter(p =>
        (p.name && p.name.includes(q)) ||
        (p.description && p.description.includes(q))
    );
},

    /** Admin: create product */
    async create(productData) {
        if (!API_CONFIG.USE_MOCK) {
            const created = await apiRequest("/products", {
                method: "POST",
                body: JSON.stringify(productData)
            });
            productStore.push(created);
            syncState();
            return created;
        }

        const newProduct = {
            id: nextId++,
            available: true,
            featured: false,
            image: "",
            ...productData
        };
        productStore.push(newProduct);
        syncState();
        return newProduct;
    },

    /** Admin: update product */
    async update(id, updates) {
        if (!API_CONFIG.USE_MOCK) {
            const updated = await apiRequest(`/products/${id}`, {
                method: "PUT",
                body: JSON.stringify(updates)
            });
            const idx = productStore.findIndex(p => p.id === id);
            if (idx !== -1) productStore[idx] = updated;
            syncState();
            return updated;
        }

        const idx = productStore.findIndex(p => p.id === id);
        if (idx === -1) return null;
        productStore[idx] = { ...productStore[idx], ...updates };
        syncState();
        return productStore[idx];
    },

    /** Admin: delete product */
    async delete(id) {
        if (!API_CONFIG.USE_MOCK) {
            await apiRequest(`/products/${id}`, { method: "DELETE" });
        }
        productStore = productStore.filter(p => p.id !== id);
        syncState();
        return true;
    },

    /** Admin: toggle featured */
    async setFeatured(id, featured) {
        return this.update(id, { featured });
    },

    /** Admin: toggle availability */
    async setAvailable(id, available) {
        return this.update(id, { available });
    }
};

export async function initProductService() {
    await productService.getAll();
}
