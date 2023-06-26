import { createI18nContext } from "@solid-primitives/i18n";
import en from "./en";
import es from "./es";

export const dictionary = {
  en,
  es,
};
export const navigator_language = navigator.language.split("-")[0];
export const default_language = navigator_language in dictionary ? navigator_language : "en";
export const context = createI18nContext(dictionary, default_language);