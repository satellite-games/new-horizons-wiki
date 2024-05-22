import { characterOriginParser } from './character-origin.parser';

/**
 * This is the collection of parsers that can be used to enrich articles provided by
 * `newhorizons-wiki` with in-game information. Each parser is a function that takes
 * takes a Markdown string as input and returns a Markdown string with the parsed information.
 * For more information on the wiki, see: https://github.com/satellite-games/newhorizons-wiki
 */
export const wikiArticleParsers: Record<string, WikiArticleParserFunction> = {
  'character-origin': characterOriginParser,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WikiArticleParserFunction = (article: string, ...args: any[]) => Promise<string>;

/**
 * Parses the given wiki article and returns the parsed article.
 * @param article The article to parse.
 */
export function parseWikiArticle(article: string, parser: keyof typeof wikiArticleParsers) {
  if (!wikiArticleParsers[parser]) return;
  const parsedArticle = wikiArticleParsers[parser](article);
  return parsedArticle;
}
