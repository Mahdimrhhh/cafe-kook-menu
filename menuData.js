const categories = [
    { id: 1, name: "قهوه داغ" },
    { id: 2, name: "نوشیدنی سرد" },
    { id: 3, name: "لاته آرت" },
    { id: 4, name: "دسر و شیرینی" },
    { id: 5, name: "کیک و کلوچه" },
    { id: 6, name: "صبحانه گرم" },
    { id: 7, name: "ساندویچ" },
    { id: 8, name: "سالاد سلامت" },
    { id: 9, name: "اسموتی" },
    { id: 10, name: "دمنوش" },
    { id: 11, name: "پاستا مینی" },
    { id: 12, name: "عصرانه دنج" }
];

const menuCatalog = [
    {
        categoryId: 1,
        items: [
            { name: "اسپرسو سینگل", price: 65000, description: "شات غلیظ و بالغ با کرمای طلایی", ingredients: "دانه عربیکا تازه‌برشت، آب فیلترشده", servingStyle: "فنجان پرسلین ۶۰ میلی‌لیتر، سرو گرم", notes: "مناسب عاشقان طعم خالص قهوه" },
            { name: "اسپرسو دبل", price: 75000, description: "دو شات اسپرسو با عمق طعمی بیشتر", ingredients: "دانه عربیکا ۱۰۰٪، آب ۹۳ درجه", servingStyle: "فنجان دبل ۹۰ میلی‌لیتر", notes: "پایه بسیاری از نوشیدنی‌های ما" },
            { name: "آمریکانو", price: 72000, description: "اسپرسو رقیق‌شده با آب داغ برای طعمی ملایم", ingredients: "اسپرسو دبل، آب فیلترشده", servingStyle: "لیوان ۲۴۰ میلی‌لیتر، سرو داغ", notes: "انتخاب محبوب برای صبح‌های طولانی" },
            { name: "کاپوچینو", price: 88000, description: "تعادل ایده‌آل اسپرسو، شیر بخار و فوم", ingredients: "اسپرسو، شیر تازه، فوم شیر", servingStyle: "فنجان ۱۸۰ میلی‌لیتر با لایه فوم یکنواخت", notes: "پودر دارچین اختیاری" },
            { name: "لاته کلاسیک", price: 92000, description: "شیر بخارشده نرم با اسپرسوی تک‌شات", ingredients: "اسپرسو، شیر تازه ۳.۵٪ چربی", servingStyle: "لیوان ۳۰۰ میلی‌لیتر", notes: "قابل سفارش با شیر بادام یا جو" },
            { name: "موکا شکلاتی", price: 105000, description: "ترکیب شکلات بلژیکی و اسپرسوی غنی", ingredients: "اسپرسو، شیر بخار، سس شکلات تلخ", servingStyle: "لیوان ۳۲۰ میلی‌لیتر با خامه رویی", notes: "برای عاشقان شکلات و قهوه" },
            { name: "فلت وایت", price: 98000, description: "اسپرسوی دبل با شیر میکروفوم ابریشمی", ingredients: "ریستریتو دبل، شیر میکروفوم", servingStyle: "فنجان سرامیکی ۱۶۰ میلی‌لیتر", notes: "طعم قهوه غالب‌تر از لاته" },
            { name: "کوردادو", price: 82000, description: "اسپرسو با لکه‌ای از شیر بخار گرم", ingredients: "اسپرسو سینگل، شیر بخار ۴۰ میلی‌لیتر", servingStyle: "فنجان دم‌افزای ۱۲۰ میلی‌لیتر", notes: "میان‌راه کاپوچینو و ماکیاتو" },
            { name: "قهوه ترک", price: 68000, description: "دم‌آوری سنتی با پودر تازه آسیاب‌شده", ingredients: "پودر قهوه ترک، آب، هل", servingStyle: "جزوه مسی با رسید بخار", notes: "سرو همراه پنجه یا شیرینی" }
        ]
    },
    {
        categoryId: 2,
        items: [
            { name: "کولد برو", price: 95000, description: "استخراج ۱۸ ساعته در دمای سرد", ingredients: "دانه عربیکا متوسط‌برشت، آب سرد", servingStyle: "لیوان یخ‌دار ۳۵۰ میلی‌لیتر", notes: "طعمی شیرین و کم‌اسیدیته" },
            { name: "آیس آمریکانو", price: 78000, description: "اسپرسو روی یخ با آب سرد", ingredients: "اسپرسو دبل، یخ، آب", servingStyle: "لیوان ۴۰۰ میلی‌لیتر", notes: "تازگی تابستان در هر جرعه" },
            { name: "آیس لاته", price: 92000, description: "شیر سرد و اسپرسو روی یخ", ingredients: "اسپرسو، شیر سرد، یخ", servingStyle: "لیوان ۴۵۰ میلی‌لیتر", notes: "قابل سفارش با سیروپ وانیل" },
            { name: "فراپوچینو کارامل", price: 108000, description: "مخلوط یخ‌زده کرمی با سس کارامل", ingredients: "اسپرسو، شیر، یخ، سس کارامل", servingStyle: "لیوان ۵۰۰ میلی‌لیتر با خامه", notes: "شیرین و دلچسب" },
            { name: "لیموناد تازه", price: 65000, description: "لیمو تازه با نعنا و عسل طبیعی", ingredients: "آب لیمو تازه، عسل، نعنا، یخ", servingStyle: "لیوان ۴۰۰ میلی‌لیتر", notes: "بدون شکر افزوده" },
            { name: "موهیتو توت‌فرنگی", price: 82000, description: "نعنا، توت‌فرنگی و سودای ملایم", ingredients: "توت‌فرنگی تازه، نعنا، سودا، یخ", servingStyle: "لیوان بلند ۴۵۰ میلی‌لیتر", notes: "نوشیدنی غیرقهوه‌ای محبوب" },
            { name: "آیس موکا", price: 102000, description: "شکلات سرد با اسپرسو و شیر", ingredients: "اسپرسو، شیر سرد، شکلات، یخ", servingStyle: "لیوان ۴۵۰ میلی‌لیتر", notes: "تزئین با پودر کاکائو" },
            { name: "شیک وانیل", price: 98000, description: "بستنی وانیل با شیر و خامه", ingredients: "بستنی وانیل، شیر کامل، خامه", servingStyle: "لیوان ۴۰۰ میلی‌لیتر", notes: "سرو با نی ضخیم" }
        ]
    },
    {
        categoryId: 3,
        items: [
            { name: "لاته آرت قلب", price: 108000, description: "فوم شیر با طرح قلب توسط باریستا", ingredients: "اسپرسو، شیر میکروفوم", servingStyle: "فنجان سرامیکی ۲۰۰ میلی‌لیتر", notes: "هر فنجان دست‌ساز و منحصربه‌فرد" },
            { name: "لاته آرت ببر", price: 112000, description: "طرح ببر با تکنیک فوم‌دهی پیشرفته", ingredients: "اسپرسو دبل، شیر میکروفوم", servingStyle: "فنجان ۲۰۰ میلی‌لیتر", notes: "محبوب‌ترین طرح بین مهمانان" },
            { name: "لاته آرت گل", price: 110000, description: "طرح گل رز با لایه‌بندی دقیق فوم", ingredients: "اسپرسو، شیر بخار", servingStyle: "فنجان ۲۰۰ میلی‌لیتر", notes: "مناسب عکس‌های شبکه اجتماعی" },
            { name: "لاته آرت بادام", price: 115000, description: "طرح برگ با شیر بادام گیاهی", ingredients: "اسپرسو، شیر بادام", servingStyle: "فنجان ۲۲۰ میلی‌لیتر", notes: "گزینه لاکتوزفری" },
            { name: "لاته آرت کارامل", price: 110000, description: "طرح موج با سس کارامل خانگی", ingredients: "اسپرسو، شیر، سس کارامل", servingStyle: "فنجان ۲۲۰ میلی‌لیتر", notes: "طعم شیرین ملایم" },
            { name: "لاته آرت فندق", price: 113000, description: "طرح ستاره با سیروپ فندق", ingredients: "اسپرسو، شیر، سیروپ فندق", servingStyle: "فنجان ۲۰۰ میلی‌لیتر", notes: "عطر فندق طبیعی" },
            { name: "لاته آرت دبل", price: 118000, description: "دو شات اسپرسو با طرح پیچیده", ingredients: "اسپرسو دبل، شیر میکروفوم", servingStyle: "فنجان ۲۴۰ میلی‌لیتر", notes: "برای دوستداران قهوه قوی" },
            { name: "لاته آرت فصلی", price: 120000, description: "طرح ویژه ماه با خلاقیت باریستا", ingredients: "اسپرسو، شیر، تزئین فصلی", servingStyle: "فنجان ۲۲۰ میلی‌لیتر", notes: "هر ماه طرح جدید" }
        ]
    },
    {
        categoryId: 4,
        items: [
            { name: "چیزکیک نیویورکی", price: 125000, description: "کرم پنیر کلاسیک با بیسکویت کره‌ای", ingredients: "پنیر خامه‌ای، بیسکویت، وانیل", servingStyle: "برش ۱۴۰ گرمی، سرو سرد", notes: "همراه سس توت‌فرنگی" },
            { name: "براونی شکلاتی", price: 95000, description: "شکلات تلخ ۷۰٪ با بافت نرم", ingredients: "شکلات بلژیکی، کره، گردو", servingStyle: "قطعه ۱۲۰ گرمی", notes: "سرو گرم با بستنی اختیاری" },
            { name: "تیرامیسو", price: 135000, description: "لایه‌ای ایتالیایی با قهوه و ماسکارپونه", ingredients: "ماسکارپونه، اسپرسو، لیدی‌فینگر", servingStyle: "کاسه ۱۵۰ گرمی", notes: "تزئین با پودر کاکائو" },
            { name: "پاناکوتا وانیل", price: 98000, description: "دسر ایتالیایی لرزان با وانیل ماداگاسکار", ingredients: "خامه، وانیل، ژلاتین", servingStyle: "کاسه ۱۲۰ گرمی", notes: "همراه سس توت‌فرنگی تازه" },
            { name: "کرم بروله", price: 115000, description: "کرم وانیلی با لایه کارامل ترد", ingredients: "زرده تخم‌مرغ، خامه، وانیل", servingStyle: "ظرف سرامیکی ۱۳۰ گرمی", notes: "کارامل لحظه سرو شکسته می‌شود" },
            { name: "ماکارون فرانسوی", price: 75000, description: "دو عدد ماکارون با طعم‌های فصلی", ingredients: "بادام، شکر، کرم پرشده", servingStyle: "بسته ۲ عددی", notes: "طعم‌ها روزانه متفاوت" },
            { name: "دسر شکلاتی گرم", price: 105000, description: "سوفله شکلاتی با مرکز نرم", ingredients: "شکلات ۶۴٪، تخم‌مرغ، کره", servingStyle: "سرو گرم ۱۱۰ گرمی", notes: "آماده‌سازی ۱۵ دقیقه‌ای" },
            { name: "پای سیب دارچین", price: 92000, description: "سیب کاراملی با خمیر کره‌ای", ingredients: "سیب تازه، دارچین، خمیر شیرین", servingStyle: "برش ۱۳۰ گرمی", notes: "سرو گرم با بستنی وانیل" }
        ]
    },
    {
        categoryId: 5,
        items: [
            { name: "کروسان کره‌ای", price: 65000, description: "لایه‌لایه و ترد با کره فرانسوی", ingredients: "خمیر هزارلایه، کره ۸۴٪", servingStyle: "عدد تکی تازه پخته", notes: "پخته روزانه صبح" },
            { name: "کروسان شکلاتی", price: 75000, description: "کروسان با مغز شکلات تلخ", ingredients: "خمیر لایه‌ای، شکلات بلژیکی", servingStyle: "عدد تکی", notes: "مناسب صبحانه یا عصرانه" },
            { name: "مافین بلوبری", price: 68000, description: "مافین پُر با بلوبری تازه", ingredients: "بلوبری، آرد، کره", servingStyle: "عدد تکی ۱۰۰ گرمی", notes: "سرو گرم یا در دمای اتاق" },
            { name: "کیک هویج", price: 88000, description: "مرطوب با کرم چیز فروستینگ", ingredients: "هویج تازه، گردو، پنیر خامه‌ای", servingStyle: "برش ۱۳۰ گرمی", notes: "طعم ملایم و خانگی" },
            { name: "کیک شکلاتی", price: 95000, description: "چهار لایه شکلات با گاناش", ingredients: "شکلات، کاکائو، خامه", servingStyle: "برش ۱۴۰ گرمی", notes: "گزینه محبوب جشن‌ها" },
            { name: "کلوچه زنجبیل", price: 62000, description: "کلوچه نرم با زنجبیل و ادویه", ingredients: "زنجبیل تازه، دارچین، شکر قهوه‌ای", servingStyle: "عدد تکی ۸۰ گرمی", notes: "عطر گرم پاییزی" },
            { name: "دنیش پنیر و اسفناج", price: 78000, description: "خمیر ترد با پنیر و اسفناج تازه", ingredients: "پنیر خامه‌ای، اسفناج، خمیر", servingStyle: "عدد تکی", notes: "سرو گرم" },
            { name: "کیک لیمو پوپی‌ل", price: 92000, description: "کرم لیمو ترش با بیسکویت", ingredients: "لیمو تازه، تخم‌مرغ، کره", servingStyle: "برش ۱۲۰ گرمی", notes: "تازگی و تعادل ترش‌وشیرین" }
        ]
    },
    {
        categoryId: 6,
        items: [
            { name: "املت سبزیجات", price: 115000, description: "تخم‌مرغ پُر با فلفل و قارچ", ingredients: "تخم‌مرغ ارگانیک، سبزیجات فصل", servingStyle: "بشقاب گرم با نان سور", notes: "قابل سفارش بدون گلوتن" },
            { name: "تست آووکادو", price: 128000, description: "نان سور با آووکادو و تخم‌مرغ پوچ", ingredients: "آووکادو، تخم‌مرغ، نان سور", servingStyle: "بشقاب ۲۸۰ گرمی", notes: "روغن زیتون و فلفل سیاه" },
            { name: "صبحانه ایرانی", price: 145000, description: "پنیر، گردو، عسل و نان تازه", ingredients: "پنیر محلی، عسل طبیعی، گردو", servingStyle: "سینی چوبی اشتراکی", notes: "چای داغ همراه سرو" },
            { name: "پنکیک عسل", price: 105000, description: "سه لایه پنکیک با عسل و کره", ingredients: "آرد، تخم‌مرغ، عسل", servingStyle: "بشقاب ۳ عددی", notes: "میوه فصل اختیاری" },
            { name: "وافل بلژیکی", price: 118000, description: "وافل ترد با سس شکلات یا میوه", ingredients: "آرد، تخم‌مرغ، شیر", servingStyle: "عدد تکی بزرگ", notes: "سرو گرم با بستنی" },
            { name: "املت قارچ و پنیر", price: 122000, description: "قارچ تفت‌داده با پنیر ذوب‌شده", ingredients: "تخم‌مرغ، قارچ، پنیر گودا", servingStyle: "بشقاب گرم", notes: "نان تست همراه" },
            { name: "گرانولا و ماست", price: 88000, description: "گرانولا خانگی با ماست یونانی", ingredients: "جو دوسر، ماست، عسل، میوه", servingStyle: "کاسه ۲۵۰ گرمی", notes: "گزینه سبک و سالم" },
            { name: "اسکرامبل تخم‌مرغ", price: 98000, description: "تخم‌مرغ کرمی با کره و شچه", ingredients: "تخم‌مرغ، کره، شچه تازه", servingStyle: "بشقاب ۲۰۰ گرمی", notes: "نان سور و گوجه گیلاسی" }
        ]
    },
    {
        categoryId: 7,
        items: [
            { name: "ساندویچ مرغ گریل", price: 145000, description: "سینه مرغ گریل با سس مخصوص", ingredients: "مرغ گریل، کاهو، گوجه، سس", servingStyle: "نان باگت تازه ۲۸۰ گرمی", notes: "قابل سفارش بدون سس" },
            { name: "ساندویچ تن ماهی", price: 128000, description: "تن ماهی با سس مایونز سبزیجات", ingredients: "تن ماهی، کاهو، خیارشور", servingStyle: "نان تست ۲۵۰ گرمی", notes: "منبع پروتئین سبک" },
            { name: "کلاب ساندویچ", price: 155000, description: "سه لایه مرغ، بیکن و سبزیجات", ingredients: "مرغ، بیکن، پنیر، کاهو", servingStyle: "نان تست ۳ لایه", notes: "با سیب‌زمینی سرخ‌کرده" },
            { name: "ساندویچ بوقلمون", price: 138000, description: "بوقلمون دودی با پنیر و ریحان", ingredients: "بوقلمون، پنیر، ریحان تازه", servingStyle: "نان چاپاتا ۲۶۰ گرمی", notes: "سس پستو اختیاری" },
            { name: "ساندویچ سبزیجات", price: 115000, description: "کدو، بادمجان گریل و پنیر فتا", ingredients: "سبزیجات گریل، فتا، ریحان", servingStyle: "نان نانو ۲۴۰ گرمی", notes: "گزینه گیاهی" },
            { name: "پنینی موزارلا", price: 132000, description: "پنیر موزارلا ذوب با گوجه و ریحان", ingredients: "موزارلا، گوجه، ریحان", servingStyle: "نان پنینی فشرده", notes: "سرو گرم و ترد" },
            { name: "ساندویچ رست‌بیف", price: 168000, description: "گوشت رست‌شده با سس قارچ", ingredients: "رست‌بیف، قارچ، پیاز کاراملی", servingStyle: "نان باگت ۳۰۰ گرمی", notes: "پرطرفدار ناهار" },
            { name: "رپ سالمون دودی", price: 175000, description: "سالمون دودی با خامه ترش و کپر", ingredients: "سالمون دودی، خامه ترش، کاهو", servingStyle: "نان ترتیلا ۲۷۰ گرمی", notes: "غنی در امگا ۳" }
        ]
    },
    {
        categoryId: 8,
        items: [
            { name: "سالاد سزار", price: 128000, description: "کاهو رومی با سس سزار و پنیر", ingredients: "کاهو، پنیر پارمزان، نان ترد", servingStyle: "کاسه ۳۰۰ گرمی", notes: "مرغ گریل اختیاری" },
            { name: "سالاد یونانی", price: 115000, description: "خیار، گوجه، زیتون و پنیر فتا", ingredients: "فتا، زیتون، گوجه، خیار", servingStyle: "کاسه ۲۸۰ گرمی", notes: "روغن زیتون بکر" },
            { name: "سالاد کوینوآ", price: 135000, description: "کوینوآ با سبزیجات و سس لیمو", ingredients: "کوینوآ، فلفل رنگی، جعفری", servingStyle: "کاسه ۳۰۰ گرمی", notes: "پروتئین گیاهی کامل" },
            { name: "سالاد آووکادو", price: 142000, description: "آووکادو تازه با گوجه گیلاسی", ingredients: "آووکادو، گوجه، پیاز بنفش", servingStyle: "کاسه ۲۸۰ گرمی", notes: "سس لیمو و روغن زیتون" },
            { name: "سالاد مرغ گریل", price: 148000, description: "سینه مرغ با سبزیجات فصل", ingredients: "مرغ گریل، کاهو، ذرت", servingStyle: "کاسه ۳۲۰ گرمی", notes: "سس سبزیجات سبک" },
            { name: "سالاد میوه فصل", price: 98000, description: "میوه‌های تازه با نعنا و عسل", ingredients: "میوه فصل، عسل، نعنا", servingStyle: "کاسه ۲۵۰ گرمی", notes: "بدون قند افزوده" },
            { name: "سالاد اسفناج", price: 118000, description: "اسفناج تازه با توت و بادام", ingredients: "اسفناج، توت، بادام برشته", servingStyle: "کاسه ۲۶۰ گرمی", notes: "سس بالزامیک" },
            { name: "سالاد پروتئین", price: 155000, description: "ترکیب حبوبات، تخم‌مرغ و سبزیجات", ingredients: "لوبیا، تخم‌مرغ، کینوا", servingStyle: "کاسه ۳۵۰ گرمی", notes: "مناسب بعد از ورزش" }
        ]
    },
    {
        categoryId: 9,
        items: [
            { name: "اسموتی توت‌فرنگی", price: 85000, description: "توت‌فرنگی تازه با ماست و عسل", ingredients: "توت‌فرنگی، ماست، عسل", servingStyle: "لیوان ۳۵۰ میلی‌لیتر", notes: "بدون شکر افزوده" },
            { name: "اسموتی موز و کره بادام", price: 92000, description: "موز رسیده با کره بادام طبیعی", ingredients: "موز، کره بادام، شیر بادام", servingStyle: "لیوان ۴۰۰ میلی‌لیتر", notes: "انرژی‌بخش صبحگاهی" },
            { name: "اسموتی انبه", price: 88000, description: "انبه استوایی با یخ و لیمو", ingredients: "انبه تازه، یخ، آب لیمو", servingStyle: "لیوان ۳۵۰ میلی‌لیتر", notes: "طعم گرمسیری" },
            { name: "اسموتی اسفناج و سیب", price: 82000, description: "ترکیب سبز با سیب سبز و جعفری", ingredients: "اسفناج، سیب، جعفری", servingStyle: "لیوان ۳۵۰ میلی‌لیتر", notes: "دتاکس ملایم" },
            { name: "اسموتی پروتئین", price: 105000, description: "پودر پروتئین با موز و کره بادام", ingredients: "پروتئین وی، موز، شیر", servingStyle: "لیوان ۴۰۰ میلی‌لیتر", notes: "بعد از تمرین" },
            { name: "اسموتی هندوانه و نعنا", price: 78000, description: "هندوانه تازه با نعنا خنک‌کننده", ingredients: "هندوانه، نعنا، یخ", servingStyle: "لیوان ۴۰۰ میلی‌لیتر", notes: "خنک‌کننده تابستان" },
            { name: "اسموتی بلوبری", price: 90000, description: "بلوبری با ماست یونانی و عسل", ingredients: "بلوبری، ماست، عسل", servingStyle: "لیوان ۳۵۰ میلی‌لیتر", notes: "سرشار از آنتی‌اکسیدان" },
            { name: "اسموتی تراپیکال", price: 95000, description: "آناناس، انبه و نارگیل", ingredients: "آناناس، انبه، شیر نارگیل", servingStyle: "لیوان ۴۰۰ میلی‌لیتر", notes: "طعم جزیره‌ای" }
        ]
    },
    {
        categoryId: 10,
        items: [
            { name: "چای ماسالا", price: 68000, description: "ادویه هندی با شیر و عسل", ingredients: "چای سیاه، شیر، ادویه ماسالا", servingStyle: "فنجان ۲۵۰ میلی‌لیتر", notes: "سرو داغ و معطر" },
            { name: "دمنوش بابونه", price: 55000, description: "گل بابونه خشک برای آرامش", ingredients: "بابونه خشک، آب جوش", servingStyle: "قوری ۳۰۰ میلی‌لیتر", notes: "مناسب قبل از خواب" },
            { name: "دمنوش نعنا و لیمو", price: 58000, description: "نعنا تازه با لیمو ترش", ingredients: "نعنا تازه، لیمو، عسل", servingStyle: "لیوان ۳۰۰ میلی‌لیتر", notes: "نشاط‌بخش" },
            { name: "چای سبز ژاپنی", price: 65000, description: "چای سبز مرغوب با طعم ملایم", ingredients: "برگ چای سبز سنچا", servingStyle: "فنجان ۲۰۰ میلی‌لیتر", notes: "دم‌آوری ۷۰ درجه" },
            { name: "دمنوش گل گاوزبان", price: 60000, description: "گل گاوزبان برای آرامش اعصاب", ingredients: "گل گاوزبان خشک", servingStyle: "قوری ۳۰۰ میلی‌لیتر", notes: "بدون کافئین" },
            { name: "دمنوش زنجبیل و عسل", price: 62000, description: "زنجبیل تازه با عسل طبیعی", ingredients: "زنجبیل تازه، عسل، لیمو", servingStyle: "لیوان ۳۰۰ میلی‌لیتر", notes: "گرم‌کننده زمستانی" },
            { name: "چای سیاه اصیل", price: 52000, description: "چای سیاه داغ با عطر سنتی", ingredients: "برگ چای سیاه، آب جوش", servingStyle: "استکان ۲۰۰ میلی‌لیتر", notes: "همراه قند یا عسل" },
            { name: "دمنوش میوه‌های قرمز", price: 65000, description: "توت‌فرنگی، تمشک و هیبیسکوس", ingredients: "میوه خشک، هیبیسکوس", servingStyle: "لیوان ۳۵۰ میلی‌لیتر", notes: "سرو گرم یا سرد" }
        ]
    },
    {
        categoryId: 11,
        items: [
            { name: "پاستا آلفردو", price: 165000, description: "سس خامه‌ای با پنیر پارمزان", ingredients: "پاستا فتوچینی، خامه، پارمزان", servingStyle: "بشقاب ۳۲۰ گرمی", notes: "مرغ گریل اختیاری" },
            { name: "پاستا پستو", price: 158000, description: "سس ریحان و پنیر با گردو", ingredients: "پاستا، ریحان، پنیر، گردو", servingStyle: "بشقاب ۳۰۰ گرمی", notes: "طعم مدیترانه‌ای" },
            { name: "پاستا مارینارا", price: 142000, description: "سس گوجه تازه با سیر و ریحان", ingredients: "پاستا، گوجه، سیر، ریحان", servingStyle: "بشقاب ۳۰۰ گرمی", notes: "گیاهی و سبک" },
            { name: "پاستا بلونز", price: 168000, description: "سس گوشت چرخ‌کرده با گوجه", ingredients: "پاستا، گوشت، گوجه، سبزیجات", servingStyle: "بشقاب ۳۵۰ گرمی", notes: "پرطرفدار ناهار" },
            { name: "پاستا سبزیجات", price: 135000, description: "سبزیجات فصل با روغن زیتون", ingredients: "پاستا، کدو، قارچ، فلفل", servingStyle: "بشقاب ۳۰۰ گرمی", notes: "گزینه گیاهی" },
            { name: "پاستا میو", price: 155000, description: "میگو تفت‌داده با سیر و لیمو", ingredients: "پاستا، میگو، سیر، لیمو", servingStyle: "بشقاب ۳۲۰ گرمی", notes: "طعم دریایی" },
            { name: "پاستا سیر و روغن", price: 128000, description: "سیر تفت‌داده با روغن زیتون", ingredients: "پاستا، سیر، روغن زیتون، فلفل", servingStyle: "بشقاب ۲۸۰ گرمی", notes: "ساده و اصیل" }
        ]
    },
    {
        categoryId: 12,
        items: [
            { name: "بشقاب پنیر و گردو", price: 118000, description: "پنیرهای محلی با گردو و عسل", ingredients: "پنیر محلی، گردو، عسل", servingStyle: "سینی چوبی", notes: "همراه نان تازه" },
            { name: "بشقاب میوه فصل", price: 95000, description: "میوه‌های برش‌خورده تازه", ingredients: "میوه فصل متنوع", servingStyle: "بشقاب ۲۵۰ گرمی", notes: "تازه هر روز" },
            { name: "چای عصرانه و کیک", price: 88000, description: "چای سیاه با برش کیک روز", ingredients: "چای سیاه، کیک فصل", servingStyle: "ست چای و کیک", notes: "کیک روزانه متفاوت" },
            { name: "بشقاب آجیل و مویز", price: 105000, description: "آجیل مخلوط با مویز و خرما", ingredients: "بادام، پسته، مویز، خرما", servingStyle: "بشقاب ۱۵۰ گرمی", notes: "انرژی طبیعی" },
            { name: "نان و کره و مربا", price: 75000, description: "نان تازه با مربای خانگی", ingredients: "نان تازه، کره، مربا", servingStyle: "بشقاب ساده", notes: "مربای فصل" },
            { name: "بشقاب تیرامیسو مینی", price: 115000, description: "تیرامیسو تک‌نفره با قهوه", ingredients: "تیرامیسو، اسپرسو", servingStyle: "ست دسر و قهوه", notes: "ترکیب عالی عصرانه" },
            { name: "ست قهوه و شیرینی", price: 128000, description: "اسپرسو با دو شیرینی فصل", ingredients: "اسپرسو، شیرینی روز", servingStyle: "سینی چوبی", notes: "هدیه مناسب" }
        ]
    }
];

const products = [];
let productId = 1;

menuCatalog.forEach(group => {
    group.items.forEach(item => {
        products.push({
            id: productId++,
            categoryId: group.categoryId,
            name: item.name,
            price: item.price,
            image: "",
            description: item.description,
            ingredients: item.ingredients,
            servingStyle: item.servingStyle,
            notes: item.notes
        });
    });
});
