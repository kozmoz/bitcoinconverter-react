export function roundFilter(value: number, decimals: number, locale: string): string {
  if ((value !== 0 && !value) || !value.toFixed) {
    return '';
  }

  const result = value.toFixed(decimals || 2);
  if (locale === 'nl') {
    return result.replace('.', ',');
  }
  return result;
}
