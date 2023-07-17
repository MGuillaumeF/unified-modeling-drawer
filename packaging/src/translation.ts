import { I18n } from "i18n";

const i18n = new I18n({
  locales: ['en', 'fr'],
  directory: pathJoin(__dirname, './locales'),
  register: global,
  api: {
    __: 't',
    __n: 'tn'
  },
  defaultLocale: 'fr'
})
/**
 * @param key The key to translate
 */
export function t(key:string) : string {
  return __(key);
}
