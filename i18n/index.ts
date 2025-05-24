import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          // Add English translations here
          "welcome": "Welcome to DuckWorld!",
          "score": "Score: {{score}}",
          // etc.
        }
      }
      // Add other languages here
    },
    lng: "en", // default language
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;