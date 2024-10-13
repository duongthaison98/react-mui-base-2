import i18next, { i18n as I18nInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

let i18nInstance: I18nInstance;

const NS = ['products', 'auth', 'sidebar', 'common', 'customers'  ];

const initI18n = (): I18nInstance => {
  if (i18nInstance) {
    return i18nInstance;
  }

  const userCache = localStorage.getItem('i18nConfig');
  const langCode = userCache ? JSON.parse(userCache).selectedLang : 'vi';

  i18nInstance = i18next.createInstance();
  i18nInstance
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      lng: langCode,
      fallbackLng: 'en',
      ns: NS, // Declare namespaces here
      defaultNS: 'common',
      backend: {
        loadPath: '/src/i18n/locales/{{lng}}/{{ns}}.json',
      },
    });

  return i18nInstance;
};

const i18n = initI18n();

export default i18n;
