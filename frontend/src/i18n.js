import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "nav_home": "Home",
      "nav_products": "Products",
      "nav_about": "About Us",
      "nav_login": "Login / Register",
      "nav_logout": "Logout",
      "nav_admin": "Admin",
      
      // Landing Page
      "hero_title": "The future of your plants is here.",
      "hero_subtitle": "Aqua-Sense Pro monitors, analyzes, and waters automatically. You just enjoy.",
      "buy_now": "Buy now",
      "see_demo": "See Live Demo",
      "video_title": "Experience Aqua-Sense",
      "box_title": "What's in the box?",
      "box_feature_1": "Main sensor module (Moisture & Light)",
      "box_feature_2": "Micro-pump with 1.5m silicone hose",
      "box_feature_3": "Power adapter and USB-C cable",
      "box_feature_4": "Free access to the Cloud platform",
      "reviews_title": "What our customers say",
      "review_1_text": "Ever since I got Aqua-Sense, my orchids finally bloomed! I forget to water them, but the system doesn't.",
      "review_1_author": "Maria I.",
      "review_2_text": "Unique product. The phone integration via Wi-Fi works flawlessly. Highly recommend!",
      "review_2_author": "Dimitar K.",
      
      "next_gen": "Next-Gen Smart Watering",
      
      // Products
      "loading_products": "Loading products...",
      "details": "Details",
      "add_to_cart": "Add",
      
      // Dashboard
      "dash_title": "Smart Dashboard",
      "dash_subtitle": "Real-time monitoring for your Aqua-Sense Pro",
      "moisture": "Moisture",
      "light": "Light Level",
      "status": "Status",
      "standby": "STANDBY",
      "watering": "WATERING",
      "water_now": "Water Now",
      "pump_active": "Pump Active..."
    }
  },
  bg: {
    translation: {
      "nav_home": "Начало",
      "nav_products": "Продукти",
      "nav_about": "За нас",
      "nav_login": "Вход / Регистрация",
      "nav_logout": "Изход",
      "nav_admin": "Админ",
      
      // Landing Page
      "hero_title": "Бъдещето на вашите растения е тук.",
      "hero_subtitle": "Aqua-Sense Pro следи, анализира и полива автоматично. Вие просто се наслаждавате.",
      "buy_now": "Купи сега",
      "see_demo": "Виж Live Demo",
      "video_title": "Изживейте Aqua-Sense",
      "box_title": "Какво получавате в комплекта?",
      "box_feature_1": "Основен сензорен модул (Влага и Светлина)",
      "box_feature_2": "Микро-помпа с 1.5м силиконов маркуч",
      "box_feature_3": "Захранващ адаптер и USB-C кабел",
      "box_feature_4": "Безплатен достъп до Cloud платформата",
      "reviews_title": "Какво казват нашите клиенти",
      "review_1_text": "Откакто имам Aqua-Sense, орхидеите ми най-накрая цъфнаха! Забравям да поливам, но системата не забравя.",
      "review_1_author": "Мария И.",
      "review_2_text": "Уникален продукт. Интеграцията с телефона през Wi-Fi работи безотказно. Препоръчвам!",
      "review_2_author": "Димитър К.",
      
      "next_gen": "Следващо поколение умно поливане",
      
      // Products
      "loading_products": "Зареждане на продукти...",
      "details": "Детайли",
      "add_to_cart": "Добави",
      
      // Dashboard
      "dash_title": "Умно Табло",
      "dash_subtitle": "Мониторинг в реално време за вашия Aqua-Sense Pro",
      "moisture": "Влажност",
      "light": "Светлина",
      "status": "Статус",
      "standby": "В ГОТОВНОСТ",
      "watering": "ПОЛИВА",
      "water_now": "Полей сега",
      "pump_active": "Помпата е активна..."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "bg", 
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;