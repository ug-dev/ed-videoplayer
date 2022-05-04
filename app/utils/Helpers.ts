import i18n from "i18n-js";

export function setAppLocale(locale: string) {
    i18n.locale = locale;
}

export function getString(key: string) {
    return i18n.t(key, {
        defaultValue: key,
    });
}
