import { STORAGE_KEYS } from '../storageKeys';

describe('STORAGE_KEYS', () => {
  it('exports a STORAGE_KEYS object', () => {
    expect(STORAGE_KEYS).toBeDefined();
  });

  it('has a non-empty string for onboardingCompleted', () => {
    expect(typeof STORAGE_KEYS.onboardingCompleted).toBe('string');
    expect(STORAGE_KEYS.onboardingCompleted.length).toBeGreaterThan(0);
  });

  it('has a non-empty string for basicAuthUsername', () => {
    expect(typeof STORAGE_KEYS.basicAuthUsername).toBe('string');
    expect(STORAGE_KEYS.basicAuthUsername.length).toBeGreaterThan(0);
  });

  it('has a non-empty string for basicAuthPassword', () => {
    expect(typeof STORAGE_KEYS.basicAuthPassword).toBe('string');
    expect(STORAGE_KEYS.basicAuthPassword.length).toBeGreaterThan(0);
  });

  it('all keys are unique', () => {
    const values = Object.values(STORAGE_KEYS);
    const uniqueValues = new Set(values);
    expect(uniqueValues.size).toBe(values.length);
  });
});
