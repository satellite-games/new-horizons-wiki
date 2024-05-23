export const WikiLocale = {
  de: 'de',
} as const;
export type WikiLocale = (typeof WikiLocale)[keyof typeof WikiLocale];

export interface WikiConfig {
  /**
   * The base URL of the wiki.
   */
  BASE_URL: string;
  /**
   * The locale of the wiki.
   */
  LOCALE: WikiLocale;
  /**
   * The headers to use for outgoing HTTP requests.
   */
  HTTP_HEADERS?: Record<string, string>;
}
