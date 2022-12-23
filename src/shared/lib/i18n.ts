/* eslint-disable import/no-named-as-default-member */
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en";
import ru from "../locales/ru";

export const LANGUAGES = {
	EN: {
		value: "EN",
		label: "language.EN",
	},
	RU: {
		value: "RU",
		label: "language.RU",
	},
};

const resources = {
	[LANGUAGES.EN.value]: en,
	[LANGUAGES.RU.value]: ru,
};

i18next.use(initReactI18next).init({
	resources,
	compatibilityJSON: "v3",
	lng: LANGUAGES.EN.value,
	interpolation: {
		escapeValue: false,
	},
});

export default i18next;
