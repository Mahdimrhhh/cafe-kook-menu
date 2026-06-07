/**
 * @file Premium glassmorphism toast notifications.
 */

import { getRandomMessageAvoiding } from "../data/mockMessages.js";

let toastContainer = null;
let lastMessageText = "";

const TOAST_DURATION = 4000;
const TOAST_ICONS = {
    success: "fa-check-circle",
    info: "fa-mug-hot",
    heart: "fa-heart",
    default: "fa-coffee"
};

function ensureContainer() {
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.className = "toast-container";
        toastContainer.setAttribute("aria-live", "polite");
        toastContainer.setAttribute("aria-atomic", "true");
        document.body.appendChild(toastContainer);
    }
    return toastContainer;
}

/**
 * Show a premium toast notification at the top of the viewport.
 * @param {string} message
 * @param {object} [options]
 * @param {string} [options.icon] - FontAwesome class suffix or emoji
 * @param {string} [options.type] - success | info | heart | default
 */
export function showToast(message, options = {}) {
    const container = ensureContainer();
    const type = options.type || "default";
    const iconClass = TOAST_ICONS[type] || TOAST_ICONS.default;
    const emoji = options.emoji || "";

    const toast = document.createElement("div");
    toast.className = "toast-notify toast-enter";
    toast.setAttribute("role", "status");
    toast.innerHTML = `
        <div class="toast-icon-wrap">
            ${emoji ? `<span class="toast-emoji">${emoji}</span>` : `<i class="fas ${iconClass}"></i>`}
        </div>
        <p class="toast-message">${message}</p>
        <div class="toast-progress"></div>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("toast-visible");
    });

    const progress = toast.querySelector(".toast-progress");
    if (progress) {
        progress.style.animationDuration = `${TOAST_DURATION}ms`;
    }

    setTimeout(() => {
        toast.classList.remove("toast-visible");
        toast.classList.add("toast-exit");
        setTimeout(() => toast.remove(), 400);
    }, TOAST_DURATION);
}

/** Show a random motivational message */
export function showMotivationalToast() {
    const msg = getRandomMessageAvoiding(lastMessageText);
    lastMessageText = msg.text;
    showToast(msg.text, { emoji: msg.icon, type: "info" });
}

/** Alias for backward compatibility */
export function showNotification(message) {
    showToast(message, { type: "heart" });
}
