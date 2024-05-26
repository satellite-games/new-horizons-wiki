import { Intl } from '@spuxx/browser-utils';
import { de as deBlueprints } from '@newhorizons/core/locales';
import { de as deWiki } from '@/locales';

const de = { deBlueprints, deWiki };
Intl.setup({
  fallbackLocale: 'de',
  dictionaries: [
    {
      locale: 'de',
      values: de,
    },
  ],
});
