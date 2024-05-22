import { characterOriginMocks } from '@newhorizons/core/mocks';
import { beforeEach, expect, it, vi } from 'vitest';
import { characterOriginParser } from './character-origin.parser';
import type { CharacterOriginName } from '@newhorizons/core';

beforeEach(() => {
  vi.mock('@/main', () => {
    return {
      characterOrigins: characterOriginMocks,
    };
  });
});

it('should properly extend the given article with data from the corresponding origin', async () => {
  const origin = characterOriginMocks[0];
  const article = 'Some article content.';
  const extendedArticle = await characterOriginParser(article, origin.name);
  expect(extendedArticle).toEqual('foo');
});

it("should return the unmodified article if the origin doesn't exist", async () => {
  const article = 'Some article content.';
  const extendedArticle = await characterOriginParser(article, 'non-existing-origin' as unknown as CharacterOriginName);
  expect(extendedArticle).toEqual(article);
});
