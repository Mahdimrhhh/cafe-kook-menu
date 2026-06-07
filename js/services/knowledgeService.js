/**
 * @file Coffee knowledge service — mock now, REST API later.
 */

import { API_CONFIG, apiRequest } from "./apiClient.js";
import { mockKnowledgeArticles } from "../data/mockKnowledge.js";
import { appState } from "../state/appState.js";

let knowledgeStore = [...mockKnowledgeArticles];

function syncState() {
    appState.setKnowledgeArticles([...knowledgeStore]);
}

export const knowledgeService = {
    async getAll() {
        if (!API_CONFIG.USE_MOCK) {
            const data = await apiRequest("/knowledge");
            knowledgeStore = data;
            syncState();
            return data;
        }
        syncState();
        return [...knowledgeStore];
    },

    async getById(id) {
        const articles = await this.getAll();
        return articles.find(a => a.id === id) || null;
    },

    async getByCategory(category) {
        const articles = await this.getAll();
        return articles.filter(a => a.category === category);
    },

    /** Admin: create article */
    async create(data) {
        if (!API_CONFIG.USE_MOCK) {
            const created = await apiRequest("/knowledge", {
                method: "POST",
                body: JSON.stringify(data)
            });
            knowledgeStore.push(created);
            syncState();
            return created;
        }

        const article = {
            id: Math.max(...knowledgeStore.map(a => a.id), 0) + 1,
            image: "",
            icon: "☕",
            ...data
        };
        knowledgeStore.push(article);
        syncState();
        return article;
    },

    /** Admin: update article */
    async update(id, updates) {
        if (!API_CONFIG.USE_MOCK) {
            const updated = await apiRequest(`/knowledge/${id}`, {
                method: "PATCH",
                body: JSON.stringify(updates)
            });
            const idx = knowledgeStore.findIndex(a => a.id === id);
            if (idx !== -1) knowledgeStore[idx] = updated;
            syncState();
            return updated;
        }

        const idx = knowledgeStore.findIndex(a => a.id === id);
        if (idx === -1) return null;
        knowledgeStore[idx] = { ...knowledgeStore[idx], ...updates };
        syncState();
        return knowledgeStore[idx];
    },

    /** Admin: delete article */
    async delete(id) {
        if (!API_CONFIG.USE_MOCK) {
            await apiRequest(`/knowledge/${id}`, { method: "DELETE" });
        }
        knowledgeStore = knowledgeStore.filter(a => a.id !== id);
        syncState();
        return true;
    }
};

export async function initKnowledgeService() {
    await knowledgeService.getAll();
}
