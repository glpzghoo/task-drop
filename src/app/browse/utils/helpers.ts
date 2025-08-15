export const formatCurrency = (amount?: number | null) => {
  if (amount == null) return '—';
  try {
    return new Intl.NumberFormat('mn-MN', {
      style: 'currency',
      currency: 'MNT',
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount}`;
  }
};

export const clamp = (text?: string | null, max = 150) => {
  if (!text) return '';
  return text.length > max ? text.slice(0, max - 1) + '…' : text;
};
