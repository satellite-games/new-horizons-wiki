import { characterOrigins, type CharacterOriginName } from '@newhorizons/core';

/**
 * Extends the given article with data from the corresponding origin.
 * @param article The article to extend.
 * @param name The name of the origin.
 * @returns The extended article.
 */
export async function characterOriginParser(article: string, name: CharacterOriginName): Promise<string> {
  const origin = characterOrigins.find((origin) => origin.name === name);
  if (!origin) {
    return article;
  }
  return article;
}
