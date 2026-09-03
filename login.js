/**
 * @file Login flow — phone, OTP, birthdate.
 * Connected to backend /api/users/request-otp and /api/users/verify-otp.
 */

const API_BASE = "http://localhost:5000/api/users";

const PERSIAN_MONTHS = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
];

let currentStep = 1;
let phoneNumber = "";
let timerInterval = null;

function toPersianDigits(str) {
    const fa = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
    return String(str).replace(/[0-9]/g, d => fa[d]);
}

function toEnglishDigits(str) {
    return String(str).replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
}

function isValidIranianPhone(phone) {
    return /^09\d{9}$/.test(phone);
}

function goToStep(step) {
    document.querySelectorAll(".login-step").forEach(el => {
        el.classList.toggle("active", parseInt(el.dataset.step, 10) === step);
    });
    document.querySelectorAll(".login-step-dot").forEach(dot => {
        const dotStep = parseInt(dot.dataset.step, 10);
        dot.classList.toggle("active", dotStep === step);
        dot.classList.toggle("done", dotStep < step);
    });
    currentStep = step;

    const subtitle = document.getElementById("loginSubtitle");
    if (step === 1) subtitle.textContent = "برای ثبت نظر و دریافت کادوی تولد، وارد شو";
    if (step === 2) subtitle.textContent = "کد ۵ رقمی رو وارد کن";
    if (step === 3) subtitle.textContent = "یک قدم تا تکمیل ثبت‌نام";
}

function startTimer(seconds) {
    clearInterval(timerInterval);
    const resendBtn = document.getElementById("resendBtn");
    const display = document.getElementById("timerDisplay");
    resendBtn.disabled = true;

    let remaining = seconds;
    function render() {
        const m = String(Math.floor(remaining / 60)).padStart(2, "0");
        const s = String(remaining % 60).padStart(2, "0");
        display.textContent = toPersianDigits(`${m}:${s}`);
    }
    render();

    timerInterval = setInterval(() => {
        remaining--;
        render();
        if (remaining <= 0) {
            clearInterval(timerInterval);
            resendBtn.disabled = false;
            display.textContent = "";
        }
    }, 1000);
}

async function sendOtp(phone) {
    const res = await fetch(`${API_BASE}/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "خطا در ارسال کد");
    return data;
}

async function verifyOtpApi(phone, code) {
    const res = await fetch(`${API_BASE}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "کد اشتباه است");
    return data;
}

function populateDateSelects() {
    const dayEl = document.getElementById("birthDay");
    const monthEl = document.getElementById("birthMonth");
    const yearEl = document.getElementById("birthYear");

    for (let d = 1; d <= 31; d++) {
        const opt = document.createElement("option");
        opt.value = d;
        opt.textContent = toPersianDigits(d);
        dayEl.appendChild(opt);
    }

    PERSIAN_MONTHS.forEach((name, i) => {
        const opt = document.createElement("option");
        opt.value = i + 1;
        opt.textContent = name;
        monthEl.appendChild(opt);
    });

    const currentJalaliYear = 1405;
    for (let y = currentJalaliYear - 14; y >= currentJalaliYear - 90; y--) {
        const opt = document.createElement("option");
        opt.value = y;
        opt.textContent = toPersianDigits(y);
        yearEl.appendChild(opt);
    }
}

function initPhoneStep() {
    const phoneInput = document.getElementById("phoneInput");
    const sendBtn = document.getElementById("sendCodeBtn");
    const errorEl = document.getElementById("phoneError");

    phoneInput.addEventListener("input", (e) => {
        e.target.value = toEnglishDigits(e.target.value).replace(/[^\d]/g, "");
        errorEl.textContent = "";
    });

    sendBtn.addEventListener("click", async () => {
        const phone = toEnglishDigits(phoneInput.value).replace(/[^\d]/g, "");

        if (!isValidIranianPhone(phone)) {
            errorEl.textContent = "شماره موبایل را صحیح وارد کنید";
            return;
        }

        errorEl.textContent = "";
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<span>در حال ارسال...</span>';

        phoneNumber = phone;
        try {
            await sendOtp(phone);
        } catch (err) {
            errorEl.textContent = err.message;
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<span>ارسال کد تایید</span><i class="fas fa-arrow-left"></i>';
            return;
        }

        sendBtn.disabled = false;
        sendBtn.innerHTML = '<span>ارسال کد تایید</span><i class="fas fa-arrow-left"></i>';

        document.getElementById("phoneDisplay").textContent = toPersianDigits(phone);
        goToStep(2);
        startTimer(60);
        document.querySelector('[data-otp-index="0"]').focus();
    });
}

function initOtpStep() {
    const boxes = document.querySelectorAll(".login-otp-box");
    const errorEl = document.getElementById("otpError");
    const verifyBtn = document.getElementById("verifyCodeBtn");
    const resendBtn = document.getElementById("resendBtn");
    const backBtn = document.getElementById("backToPhoneBtn");

    boxes.forEach((box, idx) => {
        box.addEventListener("input", (e) => {
            e.target.value = toEnglishDigits(e.target.value).replace(/[^\d]/g, "").slice(0, 1);
            errorEl.textContent = "";
            if (e.target.value && idx < boxes.length - 1) {
                boxes[idx + 1].focus();
            }
        });

        box.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && !box.value && idx > 0) {
                boxes[idx - 1].focus();
            }
        });
    });

    verifyBtn.addEventListener("click", async () => {
        const code = Array.from(boxes).map(b => b.value).join("");

        if (code.length !== 5) {
            errorEl.textContent = "کد ۵ رقمی را کامل وارد کنید";
            return;
        }

        verifyBtn.disabled = true;
        verifyBtn.innerHTML = '<span>در حال بررسی...</span>';

        try {
            const result = await verifyOtpApi(phoneNumber, code);
            verifyBtn.disabled = false;
            verifyBtn.innerHTML = '<span>تایید کد</span><i class="fas fa-arrow-left"></i>';

            if (result.token) {
                localStorage.setItem("cafe_user_token", result.token);
                if (result.user) {
                    localStorage.setItem("cafe_user_phone", result.user.phone);
                    localStorage.setItem("cafe_user_birthdate", result.user.birthDate || "نامشخص");
                    localStorage.setItem("cafe_user_id", result.user.id);
                }
                window.location.href = "./index.html";
            } else if (result.isNewUser) {
                goToStep(3);
            } else {
                window.location.href = "./index.html";
            }
        } catch (err) {
            verifyBtn.disabled = false;
            verifyBtn.innerHTML = '<span>تایید کد</span><i class="fas fa-arrow-left"></i>';
            errorEl.textContent = err.message;
            boxes.forEach(b => b.value = "");
            boxes[0].focus();
        }
    });

    resendBtn.addEventListener("click", async () => {
        try {
            await sendOtp(phoneNumber);
        } catch (err) {
            errorEl.textContent = err.message;
            return;
        }
        startTimer(60);
        boxes.forEach(b => b.value = "");
        boxes[0].focus();
    });

    backBtn.addEventListener("click", () => {
        clearInterval(timerInterval);
        goToStep(1);
    });
}

function initBirthdateStep() {
    const finishBtn = document.getElementById("finishBtn");
    const skipBtn = document.getElementById("skipBirthBtn");
    const errorEl = document.getElementById("birthError");

    async function completeLogin(birthDate) {
        finishBtn.disabled = true;
        finishBtn.innerHTML = '<span>در حال ورود...</span>';
        errorEl.textContent = "";

        try {
            const res = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone: phoneNumber,
                    birthDate: birthDate || "نامشخص"
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "خطا در ورود");
            }

            // ذخیره توکن و اطلاعات کاربر
            localStorage.setItem("cafe_user_token", data.token);
            localStorage.setItem("cafe_user_phone", data.user.phone);
            localStorage.setItem("cafe_user_birthdate", data.user.birthDate);
            localStorage.setItem("cafe_user_id", data.user.id);

            window.location.href = "./index.html";

        } catch (err) {
            errorEl.textContent = err.message;
            finishBtn.disabled = false;
            finishBtn.innerHTML = '<span>تکمیل ثبت‌نام</span>';
        }
    }

    finishBtn.addEventListener("click", () => {
        const day = document.getElementById("birthDay").value;
        const month = document.getElementById("birthMonth").value;
        const year = document.getElementById("birthYear").value;

        if (!day || !month || !year) {
            errorEl.textContent = "تاریخ تولد را کامل انتخاب کنید";
            return;
        }

        const birthDate = `${year}-${month}-${day}`;
        completeLogin(birthDate);
    });

    skipBtn.addEventListener("click", () => {
        completeLogin("نامشخص");
    });
}

populateDateSelects();
initPhoneStep();
initOtpStep();
initBirthdateStep();
