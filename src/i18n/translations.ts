export type Locale = 'uk' | 'en';

export const translations: Record<Locale, Record<string, string>> = {
  uk: {
    // Header / Hero
    header_title: "Облік товарів, який не заважає бізнесу 🙌",
    header_description: "Простий застосунок для обліку товарів, продажів і залишків — замість Excel і блокнотів.",

    // Features section
    features_section_title: "Усе для обліку — в одному застосунку",
    features_section_subtitle: "Ви займаєтесь бізнесом — Statch бере облік на себе.",

    // CTA button
    join_beta: "Приєднатись до бета-тесту",

    // Small feature cards
    card_easy_start_title: "Легкий старт",
    card_easy_start_desc: "Жодних інструкцій — реєструєтесь і починаєте працювати за кілька хвилин.",
    card_orders_title: "Продажі і замовлення",
    card_orders_desc: "Додавайте товари в замовлення і фіксуйте продажі в кілька кліків.",
    card_stock_title: "Залишки і товари",
    card_stock_desc: "Назви, фото, варіанти, ціни та залишки — все організовано і під рукою.",
    card_notifications_title: "Нагадування і сповіщення",
    card_notifications_desc: "Statch нагадає про замовлення, що зависло, або товар без продажів — інтервал налаштовуєте самі.",

    // Big feature cards
    big_card_1_title: "📦 Історія змін — завжди під рукою",
    big_card_1_desc: "Будь-яка зміна кількості, списання чи переміщення — фіксується автоматично. Ви завжди бачите, що і коли змінилось.",
    big_card_1_p1: "Актуальні залишки в реальному часі",
    big_card_1_p2: "Повна історія кожного товару",
    big_card_1_p3: "Списання та переміщення між складами",
    big_card_1_p4: "Жодна зміна не загубиться",

    big_card_2_title: "💰 Прибуток рахується автоматично",
    big_card_2_desc: "Маржа по кожному замовленню видна одразу — без формул і підрахунків вручну.",
    big_card_2_p1: "Деталі замовлення на одному екрані",
    big_card_2_p2: "Знижки, повернення і коментарі",
    big_card_2_p3: "Маржу видно одразу",
    big_card_2_p4: "Статуси і повна історія",

    // Mid-page banner (FeaturesList)
    banner_title: "Спробуйте Statch безкоштовно",
    banner_desc: "Жодних складних програм — облік, який зрозумілий з першого кліку.",

    // CTA section
    cta_title: "Приєднуйтесь до Statch раніше за всіх! 🚀",
    cta_description: "Залиште email — надішлемо запрошення, щойно відкриємо доступ.",

    // Footer
    footer_site: "Сайт",
    footer_app: "Застосунок",
    footer_terms_use: "Умови використання",
    footer_privacy: "Політика конфіденційності",
    footer_socials: "Соціалки",
    footer_contacts: "Контакти",
    footer_copyright: "© {year} Statch. Усі права захищені.",
    footer_message: "З гордістю створено в Україні 💙💛",

    // Beta modal
    beta_modal_title: "Запис на бета-тест Statch ✍️",
    beta_modal_description: "Ніякого спаму. Тільки один лист із запрошенням — коли все буде готово.",
    beta_email_label: "Email",
    beta_send: "Надіслати",
    beta_sending: "Надсилання...",
    beta_error: "Щось пішло не так. Спробуйте ще раз.",
    beta_success_title: "Готово!",
    beta_success_description: "Ви в списку! Як тільки відкриємо доступ — одразу напишемо.",
    beta_success_subtext: "Дякуємо! Незабаром побачимось у Statch. 🙌",
    beta_understand: "Зрозуміло",
    beta_already_title: "Ви вже в списку!",
    beta_already_desc: "Ваш email вже зареєстровано. Як тільки відкриємо доступ — одразу напишемо. 🚀",
    beta_already_btn: "Зрозуміло 👍",
    beta_invalid_email: "Невірний формат ел. пошти",
    beta_disclaimer: "Натискаючи «Відправити», ви погоджуєтесь з нашими",
    beta_disclaimer_terms: "Умовами використання",
    beta_disclaimer_and: "та",
    beta_disclaimer_privacy: "Політикою конфіденційності",
  },
  en: {
    // Header / Hero
    header_title: "Inventory tracking that stays out of your way 🙌",
    header_description: "A simple app for tracking products, sales, and stock — instead of Excel and notebooks.",

    // Features section
    features_section_title: "Everything you need — in one app",
    features_section_subtitle: "You run the business — Statch takes care of the tracking.",

    // CTA button
    join_beta: "Join the beta test",

    // Small feature cards
    card_easy_start_title: "Easy start",
    card_easy_start_desc: "No instructions needed — sign up and start working in minutes.",
    card_orders_title: "Sales & orders",
    card_orders_desc: "Add products to orders and record sales in just a few clicks.",
    card_stock_title: "Stock & products",
    card_stock_desc: "Names, photos, variants, prices, and stock levels — all organised and at hand.",
    card_notifications_title: "Reminders & notifications",
    card_notifications_desc: "Statch will remind you about stuck orders or products with no sales — you set the interval.",

    // Big feature cards
    big_card_1_title: "📦 Change history — always at hand",
    big_card_1_desc: "Every quantity change, write-off, or transfer is recorded automatically. You always see what changed and when.",
    big_card_1_p1: "Real-time stock levels",
    big_card_1_p2: "Full history for every product",
    big_card_1_p3: "Write-offs and warehouse transfers",
    big_card_1_p4: "No change gets lost",

    big_card_2_title: "💰 Profit calculated automatically",
    big_card_2_desc: "See your margin on every order instantly — no formulas or manual calculations.",
    big_card_2_p1: "Order details on one screen",
    big_card_2_p2: "Discounts, returns, and comments",
    big_card_2_p3: "Margin visible instantly",
    big_card_2_p4: "Statuses and full history",

    // Mid-page banner (FeaturesList)
    banner_title: "Try Statch for free",
    banner_desc: "No complex software — tracking that makes sense from the first click.",

    // CTA section
    cta_title: "Join Statch — This Is Going to Be Big! 🚀",
    cta_description: "Leave your email — we'll send an invitation as soon as we open access.",

    // Footer
    footer_site: "Site",
    footer_app: "App",
    footer_terms_use: "Terms of Service",
    footer_privacy: "Privacy Policy",
    footer_socials: "Socials",
    footer_contacts: "Contacts",
    footer_copyright: "© {year} Statch. All rights reserved.",
    footer_message: "Proudly made in Ukraine 💙💛",

    // Beta modal
    beta_modal_title: "Sign up for the Statch beta ✍️",
    beta_modal_description: "No spam. Just one invitation email — when everything is ready.",
    beta_email_label: "Email",
    beta_send: "Send",
    beta_sending: "Sending...",
    beta_error: "Something went wrong. Please try again.",
    beta_success_title: "Done!",
    beta_success_description: "You're on the list! We'll reach out as soon as we open access.",
    beta_success_subtext: "Thank you! See you in Statch soon. 🙌",
    beta_understand: "Got it",
    beta_already_title: "You're already on the list!",
    beta_already_desc: "Your email is already registered. We'll reach out as soon as we open access. 🚀",
    beta_already_btn: "Got it 👍",
    beta_invalid_email: "Invalid email format",
    beta_disclaimer: "By clicking \"Send\", you agree to our",
    beta_disclaimer_terms: "Terms of Use",
    beta_disclaimer_and: "and",
    beta_disclaimer_privacy: "Privacy Policy",
  },
};
