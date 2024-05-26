import { intl } from '@spuxx/browser-utils';

/**
 * Transforms an object to an array of key-value-pairs.
 * @param obj The object to transform.
 * @returns The array of key-value-pairs.
 */
export const objectToArray = (obj: object) => {
  return Object.entries(obj).map(([key, value]) => ({ key, value }));
};

/**
 * Parses a list of options to a readable format.
 * @param options The list of options.
 * @returns The readable list of options.
 */
export const readableOptions = (options: string[]) => {
  return options
    .map((option, index) => {
      if (index === options.length - 1) {
        return ` ${intl('wiki.or')} ${option}`;
      } else if (index === 0) {
        return option;
      } else {
        return `, ${option}`;
      }
    })
    .join('');
};
