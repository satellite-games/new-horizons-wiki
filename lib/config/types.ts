export interface WikiConfig {
  /**
   * The base URL of the wiki.
   */
  BASE_URL: string;
  /**
   * The configuration for embedding the wiki.
   */
  EMBED?: {
    /**
     *  The base path to embed the wiki in. All wiki links will be prefixed with this path.
     */
    BASE_PATH?: string;
    /**
     * When enabled, will remove the filenames from any wiki links
     */
    REMOVE_FILENAMES?: boolean;
  };
  /**
   * The locale of the wiki.
   */
  LOCALE: string;
  /**
   * The headers to use for outgoing HTTP requests.
   */
  HTTP_HEADERS?: Record<string, string>;
}
