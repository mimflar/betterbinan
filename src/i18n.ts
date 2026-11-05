import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import common from '../public/locales/en/common.json';

// Only advertise and load languages with complete service-guide support.
i18n.use(initReactI18next).init({
  resources: { en: { common } },
  lng: 'en',
  supportedLngs: ['en'],
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});
export default i18n;
