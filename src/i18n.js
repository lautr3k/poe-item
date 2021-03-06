import template from "./helpers/template";
import dotProp from "dot-prop";

export default class I18n {
  constructor() {
    this.locales = {};
    this.locale = null;
  }

  getLocale() {
    return this.locale;
  }

  getLocales() {
    return Object.keys(this.locales);
  }

  setLocale(locale) {
    this.locale = locale;
  }

  get(path, defaultValue = null) {
    return dotProp.get(this.locales, path, defaultValue);
  }

  set(path, value) {
    dotProp.set(this.locales, path, value);
  }

  has(path) {
    return dotProp.has(this.locales, path);
  }

  delete(path) {
    dotProp.delete(this.locales, path);
  }

  localeKey(path, locale = null) {
    return `${locale || this.locale}.${path}`;
  }

  __(path, args = {}) {
    const localKey = this.localeKey(path);
    return template(this.get(localKey, path), args);
  }
}

const i18n = new I18n();
const __ = (...args) => i18n.__(...args);

export { I18n, i18n, __ };
