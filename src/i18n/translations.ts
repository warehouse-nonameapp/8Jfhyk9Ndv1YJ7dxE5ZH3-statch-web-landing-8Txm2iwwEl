export type Locale = 'uk' | 'en';

export const translations: Record<Locale, Record<string, string>> = {
  uk: {
    // Header / Hero
    header_title: "Облік товарів, який не заважає бізнесу 🙌",
    header_description: "Додавайте товари, фіксуйте продажі, стежте за залишками — Statch сам порахує прибуток.",

    // Features section
    features_section_title: "Усе для обліку — в одному застосунку",
    features_section_subtitle: "Ви займаєтесь бізнесом — Statch веде облік.",

    // CTA button
    join_beta: "Приєднатись до бета-тесту",

    // Small feature cards
    card_easy_start_title: "Легкий старт",
    card_easy_start_desc: "Почати можна за кілька хвилин — без навчання і довгих інструкцій.",
    card_orders_title: "Продажі і замовлення",
    card_orders_desc: "Додавайте товари в замовлення і фіксуйте продажі в кілька натискань.",
    card_stock_title: "Залишки і товари",
    card_stock_desc: "Товари, варіанти, фото, ціни і залишки — все в одному місці.",
    card_notifications_title: "Нагадування і сповіщення",
    card_notifications_desc: "Statch нагадає, якщо товар закінчується або давно не було продажів.",

    // Big feature cards
    big_card_1_title: "Всі товари і залишки під контролем",
    big_card_1_desc: "Додавайте товари, змінюйте кількість, списуйте або переміщуйте між складами — вся історія зберігається.",
    big_card_1_p1: "Видно, що є в наявності",
    big_card_1_p2: "Вся історія змін зберігається",
    big_card_1_p3: "Списання і переміщення товарів",
    big_card_1_p4: "Нічого не загубиться",

    big_card_2_title: "Всі замовлення в одному місці",
    big_card_2_desc: "Створюйте замовлення, додавайте товари, застосовуйте знижки і змінюйте статус — все в одному екрані.",
    big_card_2_p1: "Додавання товарів в замовлення",
    big_card_2_p2: "Знижки і повернення",
    big_card_2_p3: "Статуси замовлень",
    big_card_2_p4: "Історія всіх замовлень",

    // Mid-page banner (FeaturesList)
    banner_title: "Спробуйте Statch — це безкоштовно",
    banner_desc: "Забудьте про Excel і складні програми — Statch простіший.",

    // CTA section
    cta_title: "Приєднуйтесь до Statch раніше за всіх! 🚀",
    cta_description: "Залиште email — надішлемо запрошення і допоможемо налаштувати все з нуля.",

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
    header_description: "Add products, record sales, track stock levels — Statch calculates your profit automatically.",

    // Features section
    features_section_title: "Everything you need — in one app",
    features_section_subtitle: "You run the business — Statch handles the tracking.",

    // CTA button
    join_beta: "Join the beta test",

    // Small feature cards
    card_easy_start_title: "Easy start",
    card_easy_start_desc: "Get started in minutes — no training or lengthy instructions needed.",
    card_orders_title: "Sales & orders",
    card_orders_desc: "Add products to orders and record sales in just a few taps.",
    card_stock_title: "Stock & products",
    card_stock_desc: "Products, variants, photos, prices, and stock levels — all in one place.",
    card_notifications_title: "Reminders & notifications",
    card_notifications_desc: "Statch will remind you when stock is running low or sales have been slow.",

    // Big feature cards
    big_card_1_title: "All products and stock under control",
    big_card_1_desc: "Add products, update quantities, write off or transfer between warehouses — the full history is always saved.",
    big_card_1_p1: "See exactly what's in stock",
    big_card_1_p2: "Full change history is saved",
    big_card_1_p3: "Write-offs and stock transfers",
    big_card_1_p4: "Nothing gets lost",

    big_card_2_title: "All orders in one place",
    big_card_2_desc: "Create orders, add products, apply discounts, and update statuses — all on one screen.",
    big_card_2_p1: "Add products to orders",
    big_card_2_p2: "Discounts and returns",
    big_card_2_p3: "Order statuses",
    big_card_2_p4: "Full order history",

    // Mid-page banner (FeaturesList)
    banner_title: "Try Statch — It's Free",
    banner_desc: "Forget Excel and complex software — Statch is simpler.",

    // CTA section
    cta_title: "Join Statch — This Is Going to Be Big! 🚀",
    cta_description: "Leave your email — we'll send you an invitation and help you get set up from scratch.",

    // Footer
    footer_site: "Site",
    footer_app: "App",
    footer_terms_use: "Terms of Use",
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
