
/**
 *
 * @param {number} value
 * @param {number} decimalPlaces
 * @returns {string}
 */
export function format(value: number, decimalPlaces = 2): string {
  const [integer, decimal] = value.toFixed(decimalPlaces).split('.');
  const remainder = integer.length % 3;
  const integerParts = [];

  for (let i = integer.length - 3; i >= 0; i -= 3) {
    integerParts.unshift(integer.substr(i, 3));
  }

  if (remainder) {
    integerParts.unshift(integer.substr(0, remainder));
  }

  if (decimal) {
    return `${integerParts.join(',')}.${decimal}`;
  }

  return integerParts.join(',');
}
