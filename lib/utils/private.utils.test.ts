import { describe, expect, it } from 'vitest';
import { objectToArray, readableOptions } from './private.utils';

describe('objectToArray', () => {
  it('should transform an object to an array of key-value-pairs', () => {
    const obj = { key1: 'value1', key2: 'value2' };
    const arr = objectToArray(obj);
    expect(arr).toEqual([
      { key: 'key1', value: 'value1' },
      { key: 'key2', value: 'value2' },
    ]);
  });
});

describe('readableOptions', () => {
  it('should parse a list of options to a readable format', () => {
    const options = ['option1', 'option2', 'option3'];
    const readable = readableOptions(options);
    expect(readable).toEqual('option1, option2 oder option3');
  });
});
