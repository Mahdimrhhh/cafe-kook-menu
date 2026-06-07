/**
 * @file Base API client — swap USE_MOCK to false when backend is ready.
 */

const API_CONFIG = {
    USE_MOCK: true,
    BASE_URL: "/api/v1",
    TIMEOUT: 8000
};

/**
 * Future REST endpoint wrapper.
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
            headers: { "Content-Type": "application/json", ...options.headers },
            signal: controller.signal,
            ...options
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
