import type { WikiPath } from './public-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ParserFunction = (article: string, path: WikiPath) => Promise<string>;
