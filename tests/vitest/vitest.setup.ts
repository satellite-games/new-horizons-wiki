import { Intl } from '@spuxx/browser-utils';
import { afterEach, beforeAll, vi } from 'vitest';
import { de as deBlueprints } from '@newhorizons/core/locales';
import { de as deWiki } from '@/locales';

beforeAll(() => {
  const de = { deBlueprints, deWiki };
  vi.stubGlobal('navigator', { language: 'de-DE' });
  Intl.setup({
    fallbackLocale: 'de',
    dictionaries: [
      {
        locale: 'de',
        values: de,
      },
    ],
  });
});

afterEach(() => {
  vi.resetAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
