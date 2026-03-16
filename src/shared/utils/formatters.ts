export const formatCurrency = (amount: number, currency: string): string => {
  const prefix = currency === 'NGN' ? 'N' : '';
  const formatted = Math.abs(amount).toLocaleString('en-NG');
  const sign = amount > 0 ? '+' : amount < 0 ? '-' : '';
  return `${sign}${prefix}${formatted}`;
};

export const formatBalance = (amount: number, currency: string): string => {
  const prefix = currency === 'NGN' ? 'N' : '';
  return `${prefix}${amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`;
};

