import { afterEach, vi } from 'vitest';

afterEach(() => {
  vi.resetAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
