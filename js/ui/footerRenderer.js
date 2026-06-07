/**
 * @file Premium footer rendering.
 */

export function renderFooter() {
    return `
        <footer class="footer">
            <div class="footer-top-accent" aria-hidden="true"></div>
            <div class="footer-inner">
                <div class="footer-brand">
                    <div class="footer-logo">
                        <i class="fas fa-mug-hot"></i>
                    </div>
                    <h3 class="footer-brand-name">کافه کوک</h3>
                    <p class="footer-brand-tagline">تخصصی · دم‌آوری دستی · تجربه‌ای متفاوت</p>
                </div>

                <div class="footer-grid">
                    <div class="footer-col">
                        <h4 class="footer-col-title">
                            <i class="fas fa-seedling"></i>
                            درباره کافه
                        </h4>
                        <p class="footer-col-text">
                            کافه کوک فضایی گرم و صمیمی برای دوستداران قهوه تخصصی است.
                            ما با دانه‌های منتخب و دم‌آوری دستی، هر فنجان را به یک تجربه تبدیل می‌کنیم.
                        </p>
                    </div>

                    <div class="footer-col">
                        <h4 class="footer-col-title">
                            <i class="fas fa-clock"></i>
                            ساعات کاری
                        </h4>
                        <ul class="footer-hours">
                            <li><span>شنبه تا چهارشنبه</span><span>۸:۰۰ – ۲۳:۰۰</span></li>
                            <li><span>پنج‌شنبه</span><span>۸:۰۰ – ۲۴:۰۰</span></li>
                            <li><span>جمعه</span><span>۱۰:۰۰ – ۲۳:۰۰</span></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h4 class="footer-col-title">
                            <i class="fas fa-map-marker-alt"></i>
                            تماس با ما
                        </h4>
                        <ul class="footer-contact">
                            <li>
                                <i class="fas fa-location-dot"></i>
                                <span>تهران، خیابان ولیعصر، پلاک ۱۲۳۴</span>
                            </li>
                            <li>
                                <i class="fas fa-phone"></i>
                                <span dir="ltr">۰۲۱-۱۲۳۴۵۶۷۸</span>
                            </li>
                            <li>
                                <i class="fas fa-envelope"></i>
                                <span>info@cafe-kook.ir</span>
                            </li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h4 class="footer-col-title">
                            <i class="fas fa-share-nodes"></i>
                            شبکه‌های اجتماعی
                        </h4>
                        <div class="footer-social">
                            <a href="#" class="footer-social-link" aria-label="اینستاگرام">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="#" class="footer-social-link" aria-label="تلگرام">
                                <i class="fab fa-telegram"></i>
                            </a>
                            <a href="#" class="footer-social-link" aria-label="واتساپ">
                                <i class="fab fa-whatsapp"></i>
                            </a>
                        </div>
                        <p class="footer-social-note">به زودی — لینک‌های رسمی</p>
                    </div>
                </div>

                <div class="footer-divider" aria-hidden="true"></div>

                <div class="footer-bottom">
                    <p class="footer-copy">© ۲۰۲۵ کافه کوک — تمامی حقوق محفوظ است</p>
                    <p class="footer-made">ساخته شده با <i class="fas fa-heart"></i> و قهوه</p>
                </div>
            </div>
            <div class="footer-beans" aria-hidden="true"></div>
        </footer>
    `;
}
