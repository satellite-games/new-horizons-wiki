import { describe, expect, it } from 'vitest';
import { Wiki } from './wiki.service';
import { characterOriginMocks } from '@newhorizons/core/mocks';

describe('getArticlePath', () => {
  it('should return the corect path for a blueprint', () => {
    const origin = characterOriginMocks.simple;
    const path = Wiki.getArticlePath(origin.name);
    expect(path).toEqual({ book: 'basic-rules', chapter: 'character-origin', article: 'earth-urban' });
  });
});
