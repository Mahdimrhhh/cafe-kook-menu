/**
 * @file قهوه‌شناس — سیستم پیشنهاد قهوه بر اساس سوال‌های شخصیتی
 */

const QUESTIONS = [
    {
        id: "mood",
        emoji: "mood",
        text: "الان چه حسی داری؟",
        type: "personality",
        options: [
            { label: "خسته و نیاز به انرژی دارم", value: "tired", icon: "tired" },
            { label: "آروم و می‌خوام لذت ببرم", value: "calm", icon: "calm" },
            { label: "استرس دارم", value: "stressed", icon: "stressed" },
            { label: "شاد و سرحالم", value: "happy", icon: "happy" }
        ]
    },
    {
        id: "taste",
        emoji: "taste",
        text: "طعم مورد علاقه‌ات چیه؟",
        type: "technical",
        options: [
            { label: "تلخ و قوی", value: "bitter", icon: "coffee" },
            { label: "شیرین و ملایم", value: "sweet", icon: "sweet" },
            { label: "ترش و میوه‌ای", value: "fruity", icon: "fruity" },
            { label: "خامه‌ای و نرم", value: "creamy", icon: "milk" }
        ]
    },
    {
        id: "temp",
        emoji: "temp",
        text: "قهوه‌ات رو چطور دوست داری؟",
        type: "technical",
        options: [
            { label: "داغ و گرم‌کننده", value: "hot", icon: "hot" },
            { label: "سرد و رفرش‌کننده", value: "cold", icon: "cold" },
            { label: "فرقی نمی‌کنه", value: "any", icon: "default" }
        ]
    },
    {
        id: "time",
        emoji: "time",
        text: "کِی می‌خوای قهوه‌ات رو بخوری؟",
        type: "personality",
        options: [
            { label: "صبح اول وقت", value: "morning", icon: "morning" },
            { label: "وسط روز", value: "noon", icon: "noon" },
            { label: "بعد از ناهار", value: "afternoon", icon: "afternoon" },
            { label: "عصر یا شب", value: "evening", icon: "evening" }
        ]
    },
    {
        id: "milk",
        emoji: "milk",
        text: "رابطه‌ات با شیر چطوره؟",
        type: "technical",
        options: [
            { label: "هرچی بیشتر بهتر", value: "love", icon: "heart" },
            { label: "یکم بدم نمیاد", value: "little", icon: "ok" },
            { label: "ترجیحاً بدون شیر", value: "none", icon: "none" },
            { label: "برام مهم نیست", value: "any", icon: "default" }
        ]
    },
    {
        id: "experience",
        emoji: "experience",
        text: "چقدر با قهوه آشنایی؟",
        type: "technical",
        options: [
            { label: "تازه‌کارم، راهنماییم کن", value: "beginner", icon: "beginner" },
            { label: "معمولی می‌خورم", value: "casual", icon: "casual" },
            { label: "قهوه‌دون حرفه‌ای‌ام", value: "expert", icon: "expert" },
            { label: "دنبال تجربه جدید می‌گردم", value: "adventurous", icon: "rocket" }
        ]
    }
];

// منطق پیشنهاد بر اساس پاسخ‌ها
function suggestCoffee(answers, products) {
    const scores = {};

    products.forEach(p => { scores[p.id] = 0; });

    products.forEach(p => {
        const name = p.name.toLowerCase();
        const desc = (p.description || "").toLowerCase();
        const combined = name + " " + desc;

        // mood
        if (answers.mood === "tired") {
            if (combined.includes("اسپرسو") || combined.includes("دوپیو") || combined.includes("ریسترتو")) scores[p.id] += 3;
            if (combined.includes("کافئین") || combined.includes("قوی")) scores[p.id] += 2;
        }
        if (answers.mood === "calm") {
            if (combined.includes("لاته") || combined.includes("موکا") || combined.includes("شیر")) scores[p.id] += 3;
        }
        if (answers.mood === "stressed") {
            if (combined.includes("دکاف") || combined.includes("شیر") || combined.includes("وانیل")) scores[p.id] += 3;
            if (combined.includes("کارامل") || combined.includes("شکلات")) scores[p.id] += 2;
        }
        if (answers.mood === "happy") {
            if (combined.includes("فراپه") || combined.includes("کاپوچینو") || combined.includes("کارامل")) scores[p.id] += 3;
        }

        // taste
        if (answers.taste === "bitter") {
            if (combined.includes("اسپرسو") || combined.includes("امریکانو") || combined.includes("ریسترتو")) scores[p.id] += 3;
        }
        if (answers.taste === "sweet") {
            if (combined.includes("کارامل") || combined.includes("وانیل") || combined.includes("موکا") || combined.includes("شکلات")) scores[p.id] += 3;
        }
        if (answers.taste === "fruity") {
            if (combined.includes("اتیوپی") || combined.includes("کنیا") || combined.includes("ترش") || combined.includes("میوه")) scores[p.id] += 3;
        }
        if (answers.taste === "creamy") {
            if (combined.includes("لاته") || combined.includes("فلت وایت") || combined.includes("کاپوچینو") || combined.includes("خامه")) scores[p.id] += 3;
        }
        // temp
        if (answers.temp === "hot") {
            if (combined.includes("داغ") || combined.includes("گرم") || 
                combined.includes("اسپرسو") || combined.includes("لاته") || 
                combined.includes("کاپوچینو") || combined.includes("دمنوش") ||
                combined.includes("ترک") || combined.includes("فیلتر")) scores[p.id] += 3;
            if (combined.includes("آیس") || combined.includes("سرد") || 
                combined.includes("کولد") || combined.includes("فراپ")) scores[p.id] -= 3;
        }
        if (answers.temp === "cold") {
            if (combined.includes("آیس") || combined.includes("سرد") || 
                combined.includes("کولد") || combined.includes("فراپ") ||
                combined.includes("یخ")) scores[p.id] += 3;
            if (combined.includes("سیروپ") || combined.includes("کارامل") || 
                combined.includes("وانیل") || combined.includes("فندق")) scores[p.id] += 2;
            if (combined.includes("داغ") || combined.includes("ترک")) scores[p.id] -= 2;
        }

        // milk
        if (answers.milk === "love") {
            if (combined.includes("لاته") || combined.includes("شیر") || combined.includes("کاپوچینو")) scores[p.id] += 2;
        }
        if (answers.milk === "none") {
            if (combined.includes("اسپرسو") || combined.includes("امریکانو") || combined.includes("فیلتر")) scores[p.id] += 2;
            if (combined.includes("شیر")) scores[p.id] -= 2;
        }

        // experience
        if (answers.experience === "beginner") {
            if (combined.includes("لاته") || combined.includes("موکا") || combined.includes("کاپوچینو")) scores[p.id] += 2;
            if (combined.includes("اسپرسو") || combined.includes("ریسترتو")) scores[p.id] -= 1;
        }
        if (answers.experience === "expert") {
            if (combined.includes("اسپرسو") || combined.includes("فیلتر") || combined.includes("کلدبرو") || combined.includes("ریسترتو")) scores[p.id] += 2;
        }
        if (answers.experience === "adventurous") {
            scores[p.id] += Math.random() * 1.5; // کمی تنوع
        }

        // time
        if (answers.time === "morning") {
            if (combined.includes("اسپرسو") || combined.includes("امریکانو") || combined.includes("دوپیو")) scores[p.id] += 2;
        }
        if (answers.time === "evening") {
            if (combined.includes("دکاف") || combined.includes("شیر") || combined.includes("موکا")) scores[p.id] += 2;
            if (combined.includes("اسپرسو") && !combined.includes("دکاف")) scores[p.id] -= 1;
        }
    });

    // مرتب‌سازی و برگشت ۳ تا
    const sorted = products
        .filter(p => p.available)
        .sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0));

    return sorted.slice(0, 3);
}

function getMoodMessage(answers) {
    if (answers.mood === "tired") return "چون انرژی نیاز داری، اینا برات انتخاب شدن:";
    if (answers.mood === "calm") return "برای یه لحظه آروم، اینا بهترین گزینه‌ان:";
    if (answers.mood === "stressed") return "چیزی که حالت رو بهتر کنه:";
    if (answers.mood === "happy") return "برای این حس خوبت:";
    return "بر اساس پاسخ‌هات، اینا رو پیشنهاد می‌دیم:";
}

export function renderCoffeeFinder() {
    return `
    <section class="coffee-finder-section" id="coffeeFinderSection">
        <div class="coffee-finder-header">
            <div class="coffee-finder-icon">
            <img src="icons/coffee.svg" alt="" class="cf-icon-svg" onerror="this.src='icons/default.svg'">
            </div>
            <h2>قهوه‌شناس</h2>
            <p>چند سوال کوتاه، یه پیشنهاد دقیق</p>
        </div>
        <div class="coffee-finder-body" id="coffeeFinderBody">
            ${renderQuestion(0, {})}
        </div>
    </section>`;
}

function renderQuestion(index, answers) {
    const q = QUESTIONS[index];
    const progress = Math.round((index / QUESTIONS.length) * 100);

    return `
    <div class="cf-question" data-index="${index}">
        <div class="cf-progress">
            <div class="cf-progress-bar" style="width: ${progress}%"></div>
        </div>
        <div class="cf-progress-text">${index + 1} از ${QUESTIONS.length}</div>
       <div class="cf-emoji">
        <img src="icons/${q.emoji || 'default'}.svg" alt="" class="cf-icon-svg" onerror="this.src='icons/default.svg'">
       </div>
        <h3 class="cf-question-text">${q.text}</h3>
        <div class="cf-options">
            ${q.options.map(opt => `
                <button class="cf-option" data-value="${opt.value}" data-question="${q.id}">
                    <span class="cf-option-icon">
                    <img src="icons/${opt.icon || 'default'}.svg" alt="" class="cf-option-svg" onerror="this.src='icons/default.svg'">
                    </span>
                    <span class="cf-option-label">${opt.label}</span>
                </button>
            `).join("")}
        </div>
        ${index > 0 ? `<button class="cf-back-btn" data-back="${index}">← برگشت</button>` : ""}
    </div>`;
}

function renderResult(suggestions, answers) {
    const message = getMoodMessage(answers);
    return `
    <div class="cf-result">
        <div class="cf-result-header">
            <div class="cf-emoji">
            <img src="icons/target.svg" alt="" class="cf-icon-svg" onerror="this.src='icons/default.svg'">
            </div>
            <h3>${message}</h3>
        </div>
        <div class="cf-result-cards">
            ${suggestions.map((p, i) => `
                <div class="cf-result-card ${i === 0 ? "cf-result-card--top" : ""}">
                    ${i === 0 ? '<span class="cf-best-badge">بهترین انتخاب</span>' : ""}
                    <div class="cf-result-card-name">${p.name}</div>
                    <div class="cf-result-card-desc">${p.description || ""}</div>
                    <div class="cf-result-card-price">${p.price ? p.price.toLocaleString("fa-IR") + " تومان" : ""}</div>
                </div>
            `).join("")}
        </div>
        <button class="cf-restart-btn" id="cfRestartBtn">دوباره امتحان کن ↺</button>
    </div>`;
}

export function initCoffeeFinder(products) {
    const body = document.getElementById("coffeeFinderBody");
    if (!body) return;

    const answers = {};

    function goToQuestion(index) {
        body.innerHTML = renderQuestion(index, answers);
        bindQuestion(index);
    }

    function bindQuestion(index) {
        body.querySelectorAll(".cf-option").forEach(btn => {
            btn.addEventListener("click", () => {
                const questionId = btn.dataset.question;
                const value = btn.dataset.value;
                answers[questionId] = value;

                btn.classList.add("cf-option--selected");

                setTimeout(() => {
                    if (index + 1 < QUESTIONS.length) {
                        goToQuestion(index + 1);
                    } else {
                        const suggestions = suggestCoffee(answers, products);
                        body.innerHTML = renderResult(suggestions, answers);
                        document.getElementById("cfRestartBtn")?.addEventListener("click", () => {
                            Object.keys(answers).forEach(k => delete answers[k]);
                            goToQuestion(0);
                        });
                    }
                }, 300);
            });
        });

        body.querySelector(".cf-back-btn")?.addEventListener("click", (e) => {
            const backIndex = parseInt(e.currentTarget.dataset.back, 10) - 1;
            const prevQuestion = QUESTIONS[backIndex];
            delete answers[prevQuestion.id];
            goToQuestion(backIndex);
        });
    }

    bindQuestion(0);
}
