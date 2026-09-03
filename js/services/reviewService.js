/**
 * @file Review service — localStorage mock, REST API later.
 * Admin-ready: approve, reject, delete.
 */

import { API_CONFIG, apiRequest } from "./apiClient.js";
import { appState } from "../state/appState.js";

const STORAGE_KEY = "cafe_reviews";
const COUNTER_KEY = "cafe_guest_counter";

const ANONYMOUS_NAME_POOL = [
    "دوست قهوه‌دوست",
    "مشتری ناشناس",
    "علاقمند به قهوه",
    "میهمان کافه کوک",
    "دوست دم‌آوری",
    "قهوه‌خور حرفه‌ای",
    "ناشناس"
];

let reviewStore = [];
let nextId = 1;

function loadFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY) || "[]";
        const parsed = JSON.parse(raw);
        reviewStore = parsed.map(r => ({
            id: r.id ?? nextId++,
            name: r.name,
            rating: r.rating ?? null,
            text: r.text,
            createdAt: r.createdAt ?? r.date ?? Date.now(),
            approved: r.approved !== false
        }));
        nextId = Math.max(...reviewStore.map(r => r.id), 0) + 1;
    } catch {
        reviewStore = [];
    }
}

function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviewStore));
}

function syncState() {
    appState.setReviews([...reviewStore]);
}

function generateAnonymousName() {
    let counter = parseInt(localStorage.getItem(COUNTER_KEY) || "0", 10) + 1;
    localStorage.setItem(COUNTER_KEY, String(counter));
    if (counter <= 30) return `مهمان شماره ${counter}`;
    return ANONYMOUS_NAME_POOL[counter % ANONYMOUS_NAME_POOL.length];
}

export const reviewService = {
    async getAll(includeUnapproved = false) {
        if (!API_CONFIG.USE_MOCK) {
            const data = await apiRequest("/reviews/approved");
            reviewStore = data;
            syncState();
            return data; // چون از قبل فقط approvedها میان
        }
        loadFromStorage();
        syncState();
        return includeUnapproved
            ? [...reviewStore]
            : reviewStore.filter(r => r.status === 'approved' || r.approved === true);
    },

    async getById(id) {
        const reviews = await this.getAll(true);
        return reviews.find(r => r.id === id) || null;
    },

    /** Public: submit review (نیاز به لاگین کاربر) */
    async create({ name, text, rating }) {
        if (!API_CONFIG.USE_MOCK) {
            const token = localStorage.getItem("cafe_user_token");

            if (!token) {
                throw new Error("برای ثبت نظر باید وارد حساب کاربری خود شوید");
            }

            const created = await apiRequest("/reviews", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: name || "کاربر",
                    text,
                    rating: rating || 5
                })
            });

            return created;
        }

        // حالت mock (قدیمی)
        const review = {
            id: nextId++,
            name: name || generateAnonymousName(),
            text,
            rating: rating || null,
            createdAt: Date.now(),
            approved: true
        };
        reviewStore.push(review);
        saveToStorage();
        syncState();
        return review;
    },

    /** Admin: approve review */
    async approve(id) {
        if (!API_CONFIG.USE_MOCK) {
            return apiRequest(`/reviews/${id}/status`, {
                method: "PATCH",
                body: JSON.stringify({ status: "approved" })
            });
        }
        const idx = reviewStore.findIndex(r => r.id === id);
        if (idx === -1) return null;
        reviewStore[idx].approved = true;
        saveToStorage();
        syncState();
        return reviewStore[idx];
    },

    /** Admin: reject review */
    async reject(id) {
        if (!API_CONFIG.USE_MOCK) {
            return apiRequest(`/reviews/${id}/status`, {
                method: "PATCH",
                body: JSON.stringify({ status: "rejected" })
            });
        }
        const idx = reviewStore.findIndex(r => r.id === id);
        if (idx === -1) return null;
        reviewStore[idx].approved = false;
        saveToStorage();
        syncState();
        return reviewStore[idx];
    },

    /** Admin: delete review */
    async delete(id) {
        if (!API_CONFIG.USE_MOCK) {
            await apiRequest(`/reviews/${id}`, { method: "DELETE" });
        }
        reviewStore = reviewStore.filter(r => r.id !== id);
        saveToStorage();
        syncState();
        return true;
    }
};

export async function initReviewService() {
    await reviewService.getAll();
}
