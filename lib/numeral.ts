
/**
 *
 * @param {number} number
 * @param {number} decimal_places
 * @returns {string}
 */
export function format(number: number, decimal_places = 2): string {
  const [integer, decimal] = number.toFixed(decimal_places).split('.');
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
