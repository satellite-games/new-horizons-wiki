import { characterOriginMocks } from '@newhorizons/core/mocks';
import { beforeEach, expect, it, vi } from 'vitest';
import { characterOriginParser } from './character-origin.pex';

beforeEach(() => {
  vi.mock('@newhorizons/core', () => {
    return {
      characterOrigins: characterOriginMocks,
    };
  });
});

const article = 'Some article content.';
const expected = `Some article content.
| | |
| --- | --- |
| **Attributbonus:** | **Klugheit +1** |
| **Passende Merkmale:** | Akademische Ausbildung, Arroganz |
| **Fähigkeitsboni (fix):** | Computer +2, Allgemeinwissen +3, Sozialkompetenz -1 |
| **Fähigkeitsboni (wählbar):** | Raumschiffe oder Flugzeuge +1; Astronomie, Biologie und Medizin oder Chemie -1 |\n`;

it('should properly extend the given article with data from the corresponding origin', async () => {
  const extendedArticle = await characterOriginParser(article, {
    book: 'basic-rules',
    chapter: 'character-origin',
    article: 'earth-urban',
  });
  expect(extendedArticle).toEqual(expected);
});

it("should return the unmodified article if the origin doesn't exist", async () => {
  const article = 'Some article content.';
  const extendedArticle = await characterOriginParser(article, {
    book: 'basic-rules',
    chapter: 'character-origin',
    article: 'non-existing-origin',
  });
  expect(extendedArticle).toEqual(article);
});
