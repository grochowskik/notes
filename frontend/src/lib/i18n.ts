import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pl',
    supportedLngs: ['pl', 'en', 'de'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'chosenUserLanguage',
      caches: ['localStorage'],
    },
    backend: {
      loadPath: '/locales/{{lng}}.json',
    },
  });

export default i18next;
