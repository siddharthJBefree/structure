export const FixDecimal = (value: number, decimal: number, defaultValue?: any): string => {
  if (!value || isNaN(value)) {
    return defaultValue;
  }

  const divisor = +`1${'0'.repeat(decimal)}`;
  const roundedNumber = Math.round(value * divisor) / divisor;

  return roundedNumber.toFixed(decimal) || defaultValue;
};
