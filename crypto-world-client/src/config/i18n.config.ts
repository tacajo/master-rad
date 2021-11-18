import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import constants from "../constants";

// Translation files
import TRANSLATE_EN from "../assets/translations/en.json";
import TRANSLATE_FR from "../assets/translations/no.json";
import TRANSLATE_SR from "../assets/translations/sr.json";

i18n.use(initReactI18next).init({
  fallbackLng: constants.FALLBACK_LANGUAGE,
  debug: false,

  lng: constants.DEAFULT_LANGUAGE,
  resources: {
    en: {
      translation: TRANSLATE_EN,
    },
    no: {
      translation: TRANSLATE_FR,
    },
    sr: {
      translation: TRANSLATE_SR,
    },
  },
});

export default i18n;
