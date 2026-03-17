import { formatCurrency, formatBalance } from '../formatters';

describe('formatCurrency', () => {
  it('formats positive NGN amount with +N prefix', () => {
    const result = formatCurrency(20983, 'NGN');
    expect(result).toMatch(/^\+N/);
    expect(result).toContain('20');
  });

  it('formats negative NGN amount with -N prefix', () => {
    const result = formatCurrency(-983, 'NGN');
    expect(result).toMatch(/^-N/);
    expect(result).toContain('983');
  });

  it('formats zero NGN amount with no sign prefix', () => {
    const result = formatCurrency(0, 'NGN');
    expect(result).not.toMatch(/^[+-]/);
    expect(result).toContain('N');
  });

  it('formats large positive amounts correctly', () => {
    const result = formatCurrency(1000000, 'NGN');
    expect(result).toMatch(/^\+N/);
    expect(result).toContain('1');
  });

  it('handles non-NGN currency without N prefix', () => {
    const result = formatCurrency(100, 'USD');
    expect(result).not.toContain('N');
    expect(result).toMatch(/^\+/);
  });
});

describe('formatBalance', () => {
  it('formats NGN balance with N prefix and 2 decimal places', () => {
    const result = formatBalance(12000, 'NGN');
    expect(result).toMatch(/^N/);
    expect(result).toContain('.00');
  });

  it('formats non-NGN balance without N prefix', () => {
    const result = formatBalance(500, 'USD');
    expect(result).not.toMatch(/^N/);
  });

  it('formats zero balance correctly', () => {
    const result = formatBalance(0, 'NGN');
    expect(result).toMatch(/^N/);
    expect(result).toContain('0.00');
  });

  it('includes two decimal places for fractional amounts', () => {
    const result = formatBalance(100.5, 'NGN');
    expect(result).toContain('100');
    expect(result).toMatch(/\.5[0-9]/);
  });
});
