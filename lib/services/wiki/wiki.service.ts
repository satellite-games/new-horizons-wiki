import { wikiConfig, type WikiConfig } from '@/config';
import { ServiceMixin } from '@spuxx/browser-utils';
import yaml from 'js-yaml';
import { WikiParser } from '../parser';
import type { WikiBookHeader, WikiBookToc } from './types';

/**
 * Provides functionalities to interact with the wiki.
 */
export class WikiService extends ServiceMixin<WikiService>() {
  private _config: WikiConfig = wikiConfig;

  static get config() {
    return this.instance._config;
  }

  /**
   * Updates the configuration of the wiki. Will merge the given
   * configuration wih the packages default configuration.
   * @param config The new configuration.
   */
  static setConfig(config: Partial<WikiConfig>) {
    this.instance._config = { ...wikiConfig, ...config };
  }

  /**
   * Attempts to fetch an article and return it.
   * @param book The book id.
   * @param chapter The chapter id.
   * @param article The article id.
   * @returns The article.
   */
  public static async fetchArticle(book: string, chapter: string, article: string) {
    const url = `${this.config.BASE_URL}/${book}/${chapter}/${article}/${this.config.LOCALE}.md`;
    try {
      const response = await fetch(url, { headers: this.config.HTTP_HEADERS });
      const text = await response.text();
      const html = await WikiParser.parse(text);
      return html;
    } catch (error) {
      throw new Error(`Unable to retrieve article from '${url}'.`);
    }
  }

  /**
   * Attempts to fetch the list of all available books.
   * @returns The list of books.
   */
  public static async fetchBooks(): Promise<WikiBookHeader[]> {
    const url = `${this.config.BASE_URL}/books.yaml`;
    try {
      const response = await fetch(url);
      const text = await response.text();
      const books = yaml.load(text) as WikiBookHeader[];
      return books;
    } catch (error) {
      throw new Error(`Unable to retrieve list of books.`);
    }
  }

  /**
   * Attempts to fetch the table of contents for the Stellarpedia.
   * @param book The book id.
   * @returns The table of contents.
   */
  public static async fetchToc(book: string): Promise<WikiBookToc> {
    const url = `${this.config.BASE_URL}/${book}/toc.yaml`;
    try {
      const response = await fetch(url);
      const text = await response.text();
      const toc = yaml.load(text) as WikiBookToc;
      return toc;
    } catch (error) {
      throw new Error(`Unable to retrieve table of contents for book '${book}'.`);
    }
  }
}
