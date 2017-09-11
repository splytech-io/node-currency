'use strict';

const numeral = require('./lib/numeral');

/**
 *
 * @type {Currency}
 */
class Currency {
  constructor(code, symbol, prepend, decimal_point_position) {
    this.code = code;
    this.decimal_point_symbol = Object.freeze({
      position: decimal_point_position,
    });

    this.currency_symbol = Object.freeze({
      value: symbol,
      prepend: prepend,
    });

    Object.freeze(this);
  }

  /**
   *
   * @returns {*}
   */
  getCode() {
    return this.code;
  }

  /**
   *
   * @param value {string}
   * @returns {string}
   */
  addCurrencySymbol(value) {
    if (this.currency_symbol.prepend) {
      return this.currency_symbol.value + value;
    }

    return value + this.currency_symbol.value;
  }

  /**
   *
   * @param amount
   * @returns {string}
   */
  format(amount) {
    const absoluteValue = Math.abs(amount / Math.pow(10, this.decimal_point_symbol.position));
    let result = numeral.format(absoluteValue, this.decimal_point_symbol.position);

    result = this.addCurrencySymbol(result);

    if (amount < 0) {
      result = `-${result}`;
    }

    return result;
  }
}

module.exports = Currency;
