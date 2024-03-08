import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationKO from "../locales/ko/translation.json";
import translationEN from "../locales/en/translation.json";

i18n
    .use(initReactI18next)
    .init({
        resources : {
            en : {
                translation : translationEN
            },
            ko : {
                translation : translationKO
            }
        },
        lng : "ko", // 기본 설정
        fallbackLng : "ko", // 파일이 없을경우 기본 설정
        interpolation : {
            escapeValue : false // HTML을 이스케이프하여 XSS(Cross-site Scripting) 공격을 방지
        }
    });

export default i18n;