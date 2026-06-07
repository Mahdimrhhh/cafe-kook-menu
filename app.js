        let currentCat = categories[0].name;
        let expandedItemId = null;
        let searchQuery = "";
        let sortMode = "default";
        let selectedRating = 0;
        let guideAutoSlideTimer = null;

        const categoriesData = categories.map(c => ({
            fa: c.name,
            en: c.name
        }));

        const coffeeKnowledge = [
            {
                icon: "🌱",
                title: "دانه عربیکا",
                short: "محبوب‌ترین دانه قهوه جهان با عطر پیچیده و اسیدیته ملایم.",
                fact: "حدود ۶۰ تا ۷۰ درصد قهوه جهان از عربیکا تهیه می‌شود.",
                more: "عربیکا در ارتفاعات رشد می‌کند و طعمی نرم‌تر، شیرین‌تر و میوه‌ای‌تر نسبت به روبوستا دارد. دانه‌های آن بیضی‌شکل و با خط شکاف منحنی شناخته می‌شوند."
            },
            {
                icon: "🌿",
                title: "دانه روبوستا",
                short: "طعمی قوی‌تر با کافئین بالاتر و تلخی بیشتر.",
                fact: "روبوستا در برابر آفات مقاوم‌تر است و کرمای غلیظ‌تری تولید می‌کند.",
                more: "این دانه معمولاً در اسپرسوهای ایتالیایی برای افزایش بادی و کرما استفاده می‌شود. طعم آن خاکی‌تر و با تلخی مشخص‌تر است."
            },
            {
                icon: "☕",
                title: "اسپرسو",
                short: "استخراج فشاری که اساس بسیاری از نوشیدنی‌های کافه است.",
                fact: "یک شات استاندارد اسپرسو حدود ۲۵ تا ۳۰ میلی‌لیتر است.",
                more: "اسپرسو با فشار ۹ بار و آب ۹۳ درجه از پودر تازه آسیاب‌شده استخراج می‌شود. زمان استخراج ایده‌آل بین ۲۵ تا ۳۰ ثانیه است."
            },
            {
                icon: "🧊",
                title: "کولد برو",
                short: "دم‌آوری سرد در ۱۲ تا ۱۸ ساعت برای طعمی شیرین و نرم.",
                fact: "کولد برو تا ۶۷ درصد اسیدیته کمتری نسبت به قهوه داغ دارد.",
                more: "در این روش، آب سرد به‌آرامی عطر و طعم دانه را استخراج می‌کند. نتیجه نوشیدنی‌ای تمیز، شیرین و مناسب روزهای گرم است."
            },
            {
                icon: "🥛",
                title: "لاته",
                short: "اسپرسو با شیر بخارشده و لایه نازک فوم.",
                fact: "نسبت کلاسیک لاته حدود ۱:۳ اسپرسو به شیر است.",
                more: "لاته از ایتالیا آمده و امروز بستر اصلی لاته آرت است. شیر باید به ۶۵ درجه برسد تا شیرین طبیعی خود را حفظ کند."
            },
            {
                icon: "☁️",
                title: "کاپوچینو",
                short: "تعادل سه‌گانه اسپرسو، شیر و فوم با بافت مخملی.",
                fact: "نام کاپوچینو از راهبان کاپوچین گرفته شده است.",
                more: "کاپوچینو کلاسیک یک‌سوم اسپرسو، یک‌سوم شیر بخار و یک‌سوم فوم است. تفاوت اصلی آن با لاته، مقدار بیشتر فوم است."
            },
            {
                icon: "🔥",
                title: "درجه برشت قهوه",
                short: "از روشن تا تیره، هر برشت طعم و عطری متفاوت دارد.",
                fact: "برشت تیرهتر کافئین کمتری دارد اما طعم دودی‌تر.",
                more: "برشت روشن اسیدیته و عطر میوه‌ای بیشتری حفظ می‌کند. برشت متوسط برای اسپرسو محبوب است و برشت تیره طعم شکلاتی و دودی غالب دارد."
            },
            {
                icon: "⚗️",
                title: "روش‌های دم‌آوری",
                short: "از وی۶۰ تا فرنچ پرس، هر روش تجربه‌ای متفاوت می‌سازد.",
                fact: "آسیاب متناسب با روش دم‌آوری تا ۵۰٪ طعم را تعیین می‌کند.",
                more: "وی۶۰ شفافیت طعم را نشان می‌دهد، فرنچ پرس بادی غنی دارد و ایروپرس ترکیبی از هر دو است. انتخاب روش، شخصیت قهوه را تغییر می‌دهد."
            }
        ];

        const ANONYMOUS_NAME_POOL = [
            "دوست قهوه‌دوست",
            "مشتری ناشناس",
            "علاقمند به قهوه",
            "میهمان کافه کوک",
            "دوست دم‌آوری",
            "قهوه‌خور حرفه‌ای",
            "ناشناس"
        ];

        let reviews = JSON.parse(localStorage.getItem("cafe_reviews") || "[]");

        function getCategoryProducts(categoryName) {
            const category = categories.find(c => c.name === categoryName);
            if (!category) return [];
            return products.filter(p => p.categoryId === category.id);
        }

        function formatPrice(price) {
            return price.toLocaleString("fa-IR") + " تومان";
        }

        function renderStars(rating) {
            let stars = "";
            for (let i = 1; i <= 5; i++) {
                stars += `<i class="fas fa-star ${i <= rating ? "filled" : ""}"></i>`;
            }
            return `<span class="review-stars">${stars}</span>`;
        }

        function generateAnonymousName() {
            let counter = parseInt(localStorage.getItem("cafe_guest_counter") || "0", 10) + 1;
            localStorage.setItem("cafe_guest_counter", String(counter));
            if (counter <= 30) return `مهمان شماره ${counter}`;
            return ANONYMOUS_NAME_POOL[counter % ANONYMOUS_NAME_POOL.length];
        }

        function showNotification(msg) {
            let toast = document.createElement("div");
            toast.className = "toast-notify";
            toast.innerHTML = `<i class="fas fa-heart"></i> ${msg}`;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3200);
        }

        let motivationShown = false;
        function showMotivationalQuote() {
            const quotes = [
                "☕️ با یه فنجون قهوه، روزت رو بساز!",
                "✨ لحظه‌ات رو شیرین کن، کافه کوک منتظر توئه",
                "💪 هر روز یه شروع تازه، مثل قهوه صبحگاهی",
                "🌟 آرامش رو با طعم دمنوش تجربه کن",
                "🍰 شیرینی امروز رو از کافه کوک بگیر"
            ];
            const random = quotes[Math.floor(Math.random() * quotes.length)];
            showNotification(random);
        }

        function renderCategoriesSlider() {
            const slider = document.getElementById("categoriesSlider");
            slider.innerHTML = "";
            categoriesData.forEach(cat => {
                const chip = document.createElement("div");
                chip.className = `cat-chip ${currentCat === cat.fa ? "active" : ""}`;
                chip.innerHTML = `<span class="cat-fa">${cat.fa}</span><span class="cat-en">${cat.en}</span>`;
                chip.onclick = () => {
                    currentCat = cat.fa;
                    expandedItemId = null;
                    renderCategoriesSlider();
                    renderMainContent();
                    setTimeout(() => {
                        document.querySelector(".cat-chip.active")?.scrollIntoView({
                            behavior: "smooth",
                            inline: "center",
                            block: "nearest"
                        });
                    }, 50);
                };
                slider.appendChild(chip);
            });
        }

        function getFilteredSortedItems() {
            let items = [...getCategoryProducts(currentCat)];
            if (searchQuery) {
                const q = searchQuery.trim();
                items = items.filter(i =>
                    i.name.includes(q) ||
                    i.description.includes(q) ||
                    (i.ingredients && i.ingredients.includes(q))
                );
            }
            if (sortMode === "price_asc") items.sort((a, b) => a.price - b.price);
            else if (sortMode === "price_desc") items.sort((a, b) => b.price - a.price);
            return items;
        }

        function renderMenuCard(item) {
            const imgSrc = item.image || "./img/default.jpg";
            const isExpanded = expandedItemId === item.id;
            return `
                <article class="menu-card ${isExpanded ? "expanded" : ""}" data-id="${item.id}">
                    <div class="menu-card-main">
                        <div class="menu-card-image-wrap">
                            <img src="${imgSrc}" alt="${item.name}" id="img-${item.id}" loading="lazy">
                        </div>
                        <div class="menu-card-body">
                            <div class="menu-card-header">
                                <h3 class="menu-card-title">${item.name}</h3>
                                <span class="menu-card-price">${formatPrice(item.price)}</span>
                            </div>
                            <p class="menu-card-desc">${item.description}</p>
                            <button class="menu-card-details-btn expand-mini-btn" data-id="${item.id}" aria-expanded="${isExpanded}">
                                <i class="fas fa-chevron-${isExpanded ? "up" : "down"}"></i>
                                <span>${isExpanded ? "بستن" : "جزئیات"}</span>
                            </button>
                        </div>
                    </div>
                    <div class="menu-card-expand ${isExpanded ? "open" : ""}">
                        <div class="menu-card-expand-inner">
                            <div class="card-detail-block">
                                <strong>توضیحات کامل</strong>
                                <p>${item.description}</p>
                            </div>
                            <div class="card-detail-block">
                                <strong>مواد تشکیل‌دهنده</strong>
                                <p>${item.ingredients || "—"}</p>
                            </div>
                            <div class="card-detail-block">
                                <strong>نحوه سرو</strong>
                                <p>${item.servingStyle || "—"}</p>
                            </div>
                            ${item.notes ? `
                            <div class="card-detail-block card-detail-notes">
                                <strong>نکته</strong>
                                <p>${item.notes}</p>
                            </div>` : ""}
                        </div>
                    </div>
                </article>
            `;
        }

        function renderCoffeeKnowledge() {
            const cards = coffeeKnowledge.map(topic => `
                <div class="guide-card">
                    <div class="guide-card-icon">${topic.icon}</div>
                    <h4>${topic.title}</h4>
                    <p class="guide-short">${topic.short}</p>
                    <div class="guide-fact">
                        <i class="fas fa-lightbulb"></i>
                        <span>${topic.fact}</span>
                    </div>
                    <button
                        class="read-more-btn"
                        data-title="${topic.title}"
                        data-content="${topic.more}"
                    >بیشتر بخوانید</button>
                </div>
            `).join("");

            return `
                <section class="coffee-knowledge">
                    <div class="coffee-knowledge-header">
                        <span class="coffee-knowledge-badge">دانش قهوه</span>
                        <h3>راهنمای کوتاه دنیای قهوه</h3>
                        <p>با دانه، روش دم‌آوری و نوشیدنی‌های محبوب آشنا شوید</p>
                    </div>
                    <div class="coffee-guide-slider" id="coffeeGuideSlider">
                        ${cards}
                    </div>
                    <div class="guide-dots" id="guideDots"></div>
                </section>
            `;
        }

        function renderReviewsList() {
            if (!reviews.length) {
                return `<div class="reviews-empty">
                    <i class="fas fa-comment-dots"></i>
                    <p>هنوز نظری ثبت نشده. اولین نفر باشید!</p>
                </div>`;
            }
            return reviews.slice().reverse().map((r, i) => `
                <div class="review-card" style="animation-delay:${i * 0.06}s">
                    <div class="review-card-header">
                        <span class="review-author">${r.name}</span>
                        ${r.rating ? renderStars(r.rating) : ""}
                    </div>
                    <p class="review-text">${r.text}</p>
                </div>
            `).join("");
        }

        function renderReviewSection() {
            return `
                <section class="review-section">
                    <div class="review-section-header">
                        <span class="review-badge">نظرات مهمانان</span>
                        <h3>تجربه شما برای ما ارزشمند است</h3>
                        <p>بدون ثبت‌نام، نظر خود را به‌صورت ناشناس با ما به اشتراک بگذارید</p>
                    </div>
                    <div class="review-form">
                        <label class="rating-label">امتیاز (اختیاری)</label>
                        <div class="rating-input" id="ratingInput">
                            ${[1, 2, 3, 4, 5].map(n =>
                                `<button type="button" class="rating-star ${selectedRating >= n ? "active" : ""}" data-rating="${n}" aria-label="${n} ستاره">
                                    <i class="fas fa-star"></i>
                                </button>`
                            ).join("")}
                        </div>
                        <textarea id="reviewText" rows="3" placeholder="نظر یا پیشنهاد شما..."></textarea>
                        <button class="submit-btn" id="submitReviewBtn">
                            <i class="fas fa-paper-plane"></i>
                            ارسال نظر
                        </button>
                    </div>
                    <div class="reviews-list" id="reviewsList">
                        ${renderReviewsList()}
                    </div>
                </section>
            `;
        }

        function initCoffeeModal() {
            const modal = document.getElementById("coffeeModal");
            const title = document.getElementById("modalTitle");
            const content = document.getElementById("modalContent");

            document.querySelectorAll(".read-more-btn").forEach(btn => {
                btn.onclick = () => {
                    title.textContent = btn.dataset.title;
                    content.textContent = btn.dataset.content;
                    modal.classList.add("active");
                };
            });

            document.getElementById("closeCoffeeModal").onclick = () => {
                modal.classList.remove("active");
            };

            modal.onclick = (e) => {
                if (e.target === modal) modal.classList.remove("active");
            };
        }

        function initCoffeeGuideSlider() {
            if (guideAutoSlideTimer) {
                clearInterval(guideAutoSlideTimer);
                guideAutoSlideTimer = null;
            }

            const slider = document.getElementById("coffeeGuideSlider");
            const dotsContainer = document.getElementById("guideDots");
            if (!slider || !dotsContainer) return;

            const cards = slider.querySelectorAll(".guide-card");
            if (!cards.length) return;

            dotsContainer.innerHTML = "";
            cards.forEach((_, i) => {
                const dot = document.createElement("button");
                dot.className = `guide-dot ${i === 0 ? "active" : ""}`;
                dot.setAttribute("aria-label", `اسلاید ${i + 1}`);
                dot.onclick = () => scrollToGuideCard(i);
                dotsContainer.appendChild(dot);
            });

            let currentIndex = 0;

            function scrollToGuideCard(index) {
                currentIndex = index;
                cards[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                dotsContainer.querySelectorAll(".guide-dot").forEach((d, i) => {
                    d.classList.toggle("active", i === index);
                });
            }

            slider.addEventListener("scroll", () => {
                let closest = 0;
                let minDist = Infinity;
                cards.forEach((card, i) => {
                    const dist = Math.abs(card.offsetLeft - slider.scrollLeft - slider.clientWidth / 2 + card.offsetWidth / 2);
                    if (dist < minDist) {
                        minDist = dist;
                        closest = i;
                    }
                });
                if (closest !== currentIndex) {
                    currentIndex = closest;
                    dotsContainer.querySelectorAll(".guide-dot").forEach((d, i) => {
                        d.classList.toggle("active", i === closest);
                    });
                }
            }, { passive: true });

            guideAutoSlideTimer = setInterval(() => {
                const next = (currentIndex + 1) % cards.length;
                scrollToGuideCard(next);
            }, 4500);
        }

        function bindExpandButtons() {
            document.querySelectorAll(".expand-mini-btn").forEach(btn => {
                btn.onclick = (e) => {
                    e.stopPropagation();
                    const id = parseInt(btn.getAttribute("data-id"), 10);
                    const card = btn.closest(".menu-card");
                    const expandEl = card?.querySelector(".menu-card-expand");
                    const icon = btn.querySelector("i");
                    const label = btn.querySelector("span");
                    const wasExpanded = expandedItemId === id;

                    document.querySelectorAll(".menu-card.expanded").forEach(c => {
                        if (c !== card) {
                            c.classList.remove("expanded");
                            c.querySelector(".menu-card-expand")?.classList.remove("open");
                            const otherBtn = c.querySelector(".expand-mini-btn");
                            if (otherBtn) {
                                otherBtn.setAttribute("aria-expanded", "false");
                                otherBtn.querySelector("i")?.classList.replace("fa-chevron-up", "fa-chevron-down");
                                const otherLabel = otherBtn.querySelector("span");
                                if (otherLabel) otherLabel.textContent = "جزئیات";
                            }
                        }
                    });

                    if (wasExpanded) {
                        expandedItemId = null;
                        card?.classList.remove("expanded");
                        expandEl?.classList.remove("open");
                        btn.setAttribute("aria-expanded", "false");
                        icon?.classList.replace("fa-chevron-up", "fa-chevron-down");
                        if (label) label.textContent = "جزئیات";
                    } else {
                        expandedItemId = id;
                        card?.classList.add("expanded");
                        expandEl?.classList.add("open");
                        btn.setAttribute("aria-expanded", "true");
                        icon?.classList.replace("fa-chevron-down", "fa-chevron-up");
                        if (label) label.textContent = "بستن";
                    }
                };
            });
        }

        function renderMainContent() {
            const container = document.getElementById("dynamicContent");
            const items = getFilteredSortedItems();

            let itemsHtml = `<div class="menu-grid">`;
            if (!items.length) {
                itemsHtml += `<div class="menu-empty">
                    <i class="fas fa-mug-hot"></i>
                    <p>محصولی یافت نشد</p>
                </div>`;
            } else {
                items.forEach(item => {
                    itemsHtml += renderMenuCard(item);
                });
            }
            itemsHtml += `</div>`;
            itemsHtml += renderCoffeeKnowledge();
            itemsHtml += renderReviewSection();

            container.innerHTML = itemsHtml;

            initCoffeeModal();
            initCoffeeGuideSlider();
            bindExpandButtons();

            document.querySelectorAll(".rating-star").forEach(star => {
                star.onclick = () => {
                    const rating = parseInt(star.dataset.rating, 10);
                    selectedRating = selectedRating === rating ? 0 : rating;
                    document.querySelectorAll(".rating-star").forEach((s, i) => {
                        s.classList.toggle("active", i < selectedRating);
                    });
                };
            });

            document.getElementById("submitReviewBtn")?.addEventListener("click", () => {
                const text = document.getElementById("reviewText")?.value?.trim();
                if (!text) {
                    showNotification("لطفاً نظر خود را بنویسید");
                    return;
                }
                reviews.push({
                    name: generateAnonymousName(),
                    text,
                    rating: selectedRating || null,
                    date: Date.now()
                });
                localStorage.setItem("cafe_reviews", JSON.stringify(reviews));
                selectedRating = 0;
                renderMainContent();
                showNotification("نظرت با ❤️ ثبت شد! ممنونیم");
            });
        }

        const searchInput = document.getElementById("searchInput");
        const sortBtn = document.getElementById("sortBtn");

        sortBtn.onclick = () => {
            if (sortMode === "default") sortMode = "price_asc";
            else if (sortMode === "price_asc") sortMode = "price_desc";
            else sortMode = "default";
            if (sortMode === "price_asc") sortBtn.innerHTML = '<i class="fas fa-arrow-up-wide-short"></i> ارزان‌ترین';
            else if (sortMode === "price_desc") sortBtn.innerHTML = '<i class="fas fa-arrow-down-wide-short"></i> گران‌ترین';
            else sortBtn.innerHTML = '<i class="fas fa-clock"></i> پیش‌فرض';
            renderMainContent();
        };

        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            renderMainContent();
        });

        document.getElementById("clearSearchBtn")?.addEventListener("click", () => {
            searchInput.value = "";
            searchQuery = "";
            renderMainContent();
        });

        const themeBtn = document.getElementById("themeToggle");
        let darkEnabled = localStorage.getItem("cafe_dark") === "true";

        if (darkEnabled) {
            document.body.classList.add("dark");
            themeBtn.textContent = "☀️";
        } else {
            themeBtn.textContent = "🌙";
        }

        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            const isDark = document.body.classList.contains("dark");
            localStorage.setItem("cafe_dark", isDark);
            themeBtn.textContent = isDark ? "☀️" : "🌙";
        });

        function showMenuView() {
            document.body.classList.remove("home-view");
            document.getElementById("homePage").style.display = "none";
            document.getElementById("mainApp").classList.add("active");
        }

        function showHomeView() {
            document.body.classList.add("home-view");
            document.getElementById("homePage").style.display = "flex";
            document.getElementById("mainApp").classList.remove("active");
            if (guideAutoSlideTimer) {
                clearInterval(guideAutoSlideTimer);
                guideAutoSlideTimer = null;
            }
        }

        document.getElementById("enterCafeBtn").addEventListener("click", () => {
            showMenuView();
            renderCategoriesSlider();
            renderMainContent();
            if (!motivationShown) {
                showMotivationalQuote();
                motivationShown = true;
            }
        });

        document.getElementById("backHomeBtn").addEventListener("click", (e) => {
            e.preventDefault();
            showHomeView();
        });

        renderCategoriesSlider();
