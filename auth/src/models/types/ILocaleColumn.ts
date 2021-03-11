/**
 * interface for columns that have translation
 * to different languages
 */
interface ILocaleColumn {
  lang: string;
  value: string;
}

export { ILocaleColumn };
