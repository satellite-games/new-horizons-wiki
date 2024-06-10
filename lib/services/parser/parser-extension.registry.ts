import type { ParserFunction } from '@/types/private-types';
import { characterOriginParser } from './extensions/character-origin.pex';

export const parserExtensionRegistry: Record<string, ParserFunction> = {
  'character-origin': characterOriginParser,
};
