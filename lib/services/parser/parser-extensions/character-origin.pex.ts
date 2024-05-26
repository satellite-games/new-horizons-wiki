import type { WikiPath } from '@/main';
import { objectToArray, readableOptions } from '@/utils/private.utils';
import { characterOrigins } from '@newhorizons/core';
import { intl } from '@spuxx/browser-utils';

/**
 * Extends the given article with data from the corresponding origin.
 * @param article The article to extend.
 * @param name The name of the origin.
 * @returns The extended article.
 */
export async function characterOriginParser(article: string, path: WikiPath): Promise<string> {
  const origin = characterOrigins.find((origin) => origin.name === `character.origin.${path.article}`);
  if (!origin) {
    return article;
  }
  article += '<table>';
  const bonusAttribute = objectToArray(origin.primaryAttributeBonuses)[0];
  article += `<tr><th>${intl('wiki.character.origin.bonus-attribute')}:</th><td>${bonusAttribute.key} +${bonusAttribute.value}</td></tr>\n`;
  article += `<tr><th>${intl('wiki.character.origin.suitable-traits')}:</th><td>${origin.suitableTraits.map((trait) => intl(trait)).join(', ')}</td></tr>\n`;
  article += `<tr><th>${intl('wiki.character.origin.fixed-skill-bonuses')}:</th><td>${objectToArray(
    origin.fixedSkillBonuses,
  )
    .map((bonus) => `${bonus.key} ${bonus.value > 0 ? '+' : ''}${bonus.value}`)
    .join(', ')}</td></tr>\n`;
  article += `<tr><th>${intl('wiki.character.origin.selectable-skill-bonuses')}:</th><td>${origin.selectableSkillBonuses.map((group) => `${readableOptions(group.skills.map((skill) => skill))} ${group.value > 0 ? '+' : ''}${group.value}`).join('; ')}</td></tr>`;
  article += '</table>';
  return article;
}
