import { ServiceMixin, intl } from '@spuxx/browser-utils';
import { marked } from 'marked';
import { sanitize } from 'isomorphic-dompurify';
import yaml from 'js-yaml';
import { Wiki } from '../wiki/wiki.service';
import { parserExtensionRegistry } from './parser-extension.registry';
import type { WikiPath } from '@/main';

export class WikiParser extends ServiceMixin<WikiParser>() {
  frontmatterPattern = /^---\s*([\s\S]*?)\s*---/;
  blueprintNamePattern = /([\w|-]+)\.([\w|-]+)\.([\w|-]+)/g;

  /**
   * Parses the Markdown article and to HTML.
   * @param markdown The Markdown to parse.
   * @param path The path of the article.
   * @returns The parsed HTML.
   */
  public static async parse(article: string, path: WikiPath): Promise<string> {
    const frontmatter = this.extractFrontmatter(article);
    let parsedArticle = this.removeFrontmatter(article);
    parsedArticle = await this.runThroughParserExtensions(parsedArticle, path, frontmatter);
    parsedArticle = this.insertBlueprintLinks(parsedArticle);
    parsedArticle = this.translate(parsedArticle);
    parsedArticle = this.applyGeneralModifications(parsedArticle);
    const html = await marked.parse(parsedArticle);
    const sanitizedHtml = sanitize(html);
    return sanitizedHtml;
  }

  /**
   * Extracts the frontmatter from a markdown string.
   * @param markdown The markdown string.
   * @returns The frontmatter as a JavaScript object.
   */
  public static extractFrontmatter(markdown: string): Record<string, unknown> | undefined {
    const match = markdown.match(new RegExp(this.instance.frontmatterPattern));
    if (!match) return;
    const frontmatter = yaml.load(match[1]);
    return frontmatter as Record<string, unknown>;
  }

  /**
   * Removes the frontmatter from a markdown string.
   * @param markdown The markdown string.
   * @returns The markdown string without the frontmatter.
   */
  private static removeFrontmatter(markdown: string): string {
    return markdown.replace(new RegExp(this.instance.frontmatterPattern), '');
  }

  /**
   * Performs a series of general modifications on the article.
   * @param article The article.
   * @returns The modified article.
   */
  private static applyGeneralModifications(article: string) {
    // Replace partial image urls will full urls
    const imageSrcPattern = /<img.*src=['"](\/books)/gi;
    const imageSrcMatches = article.matchAll(imageSrcPattern);
    for (const match of imageSrcMatches) {
      article = article.replace(match[1], Wiki.config.BASE_URL);
    }
    // Fulfill embedding requirements
    if (Wiki.config.EMBED) {
      // Replace remaining relative urls with the base path used for embedding
      if (Wiki.config.EMBED.BASE_PATH) {
        const linkUrlPattern = /(href="\/books)/gi;
        const linkUrlMatches = article.matchAll(linkUrlPattern);
        for (const match of linkUrlMatches) {
          article = article.replace(match[1], `href="${Wiki.config.EMBED.BASE_PATH}`);
        }
      }
      // Remove filenames from wiki links
      if (Wiki.config.EMBED.REMOVE_FILENAMES) article = article.replace(/\w+\.md/gi, '');
    }
    //
    return article;
  }

  /**
   * Automatically searches for blueprint names in the article
   * and inserts links to the corresponding wiki articles.
   * @param article The article.
   */
  private static insertBlueprintLinks(article: string) {
    const blueprintMatches = article.matchAll(this.instance.blueprintNamePattern);
    for (const match of blueprintMatches) {
      let path = '';
      const { LOCALE } = Wiki.config;
      if (match[0].includes('character')) {
        path = `basic-rules/${match[1]}-${match[2]}/${match[3]}/${LOCALE}.md`;
      }
      if (path) article = article.replace(match[0], `<a href="/books/${path}">${match[0]}</a>`);
    }
    return article;
  }

  /**
   * Looks for blueprint names in the article and translates them.
   * @param article The article.
   */
  private static translate(article: string) {
    const blueprintMatches = article.matchAll(this.instance.blueprintNamePattern);
    for (const match of blueprintMatches) {
      article = article.replace(match[0], intl(match[0]));
    }
    return article;
  }

  /**
   * Runs the article through all corresponding parser extensions.
   * @param article The article.
   * @param frontmatter The frontmatter.
   */
  private static async runThroughParserExtensions(
    article: string,
    path: WikiPath,
    frontmatter?: Record<string, unknown>,
  ) {
    if (!frontmatter) return article;
    const { extensions } = frontmatter as { extensions?: string | string[] };
    if (!extensions) return article;
    const extensionKeys = Array.isArray(extensions) ? extensions : [extensions];
    for (const key of extensionKeys) {
      const parserExtension = parserExtensionRegistry[key];
      if (!parserExtension) continue;
      article = await parserExtension(article, path);
    }
    return article;
  }
}
