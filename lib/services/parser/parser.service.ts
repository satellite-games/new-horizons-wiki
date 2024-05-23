import { ServiceMixin } from '@spuxx/browser-utils';
import { marked } from 'marked';
import { sanitize } from 'isomorphic-dompurify';
import yaml from 'js-yaml';
import { WikiService } from '../wiki/wiki.service';

export class WikiParser extends ServiceMixin<WikiParser>() {
  frontmatterPattern = /^---\s*([\s\S]*?)\s*---/;

  /**
   * Parses the Markdown article and to HTML.
   * @param markdown The Markdown to parse.
   * @returns The parsed HTML.
   */
  public static async parse(article: string): Promise<string> {
    // const frontmatter = this.extractFrontmatter(article);
    let parsedArticle = this.removeFrontmatter(article);
    parsedArticle = this.doSimpleReplacements(parsedArticle);
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

  private static doSimpleReplacements(article: string) {
    let parsedArticle = article;
    // Replace partial image urls will full urls
    const imageSrcPattern = /<img.*src=['"](\/books)/gi;
    const imageSrcMatches = parsedArticle.matchAll(imageSrcPattern);
    for (const match of imageSrcMatches) {
      parsedArticle = parsedArticle.replace(match[1], WikiService.config.BASE_URL);
    }
    return parsedArticle;
  }
}
