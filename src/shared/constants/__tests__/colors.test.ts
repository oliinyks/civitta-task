import { COLORS } from '../colors';

const EXPECTED_COLOR_KEYS = [
  'primary',
  'background',
  'text',
  'subtext',
  'card',
  'border',
  'notification',
  'success',
  'error',
  'disabled',
  'placeholder',
] as const;

describe('COLORS', () => {
  it('exports a COLORS object', () => {
    expect(COLORS).toBeDefined();
    expect(typeof COLORS).toBe('object');
  });

  EXPECTED_COLOR_KEYS.forEach((key) => {
    it(`has a non-empty string value for "${key}"`, () => {
      expect(typeof COLORS[key]).toBe('string');
      expect(COLORS[key].length).toBeGreaterThan(0);
    });

    it(`"${key}" is a valid hex color`, () => {
      expect(COLORS[key]).toMatch(/^#[0-9a-fA-F]{3,8}$/);
    });
  });

  it('contains all expected color keys', () => {
    EXPECTED_COLOR_KEYS.forEach((key) => {
      expect(COLORS).toHaveProperty(key);
    });
  });
});
