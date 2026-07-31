/**
 * @file Base API client — connected to real backend
 */

const API_CONFIG = {
    USE_MOCK: false,                          // ← تغییر به false
    BASE_URL: "http://localhost:5000/api",    // ← آدرس بک‌اند
    TIMEOUT: 8000
};

/**
 * REST endpoint wrapper
 * @param {string} endpoint
 * @param {RequestInit} [options]
 * @returns {Promise<any>}
 */
export async function apiRequest(endpoint, options = {}) {
    if (API_CONFIG.USE_MOCK) {
        throw new Error("Mock mode active — use service layer directly");
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
            method: options.method || "GET",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            },
            body: options.body || undefined,
            signal: controller.signal
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `HTTP ${response.status}`);
        }

        return response.json();
    } finally {
        clearTimeout(timeoutId);
    }
}

export { API_CONFIG };