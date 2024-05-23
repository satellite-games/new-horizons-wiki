import type { ParserFunction } from '@/types/private-types';
import { characterOriginParser } from './parser-extensions/character-origin.pex';

export const parserRegistry: Record<string, ParserFunction> = {
  'character-origin': characterOriginParser,
};
