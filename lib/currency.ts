'use strict';

import { format } from './numeral';

/**
 *
 * @type {Currency}
 */
export default class Currency {
  static NGN = new Currency('NGN', '₦', true, 2);
  static EUR = new Currency('EUR', '€', true, 2);
  static GBP = new Currency('GBP', '£', true, 2);
  static INR = new Currency('INR', '₹', true, 0);
  static AED = new Currency('AED', 'د.إ', true, 2);
  static USD = new Currency('USD', '$', true, 2);
  static ARS = new Currency('ARS', '$', true, 2);
  static BRL = new Currency('BRL', 'R$', true, 2);
  static CLP = new Currency('CLP', '$', true, 2);
  static COP = new Currency('COP', '$', true, 0);
  static DOP = new Currency('DOP', 'RD$', true, 2);
  static MXN = new Currency('MXN', '$', true, 2);
  static PAB = new Currency('PAB', '$', true, 2);
  static PEN = new Currency('PEN', 'PEN', true, 2);
  static UYU = new Currency('UYU', '$', true, 2);
  static SAR = new Currency('SAR', 'SAR', true, 2);
  static EGP = new Currency('EGP', 'EG£', true, 2);
  static PKR = new Currency('PKR', '₨', true, 2);
  static JOD = new Currency('JOD', 'JOD', true, 2);
  static BHD = new Currency('BHD', 'BD', true, 3);
  static QAR = new Currency('QAR', '﷼', true, 2);
  static LBP = new Currency('LBP', 'ل.ل', true, 2);
  static CNY = new Currency('CNY', '¥', true, 2);
  static MYR = new Currency('MYR', 'RM', true, 2);

  code: string;
  decimal_point_symbol: {
    position: number;
  };
  currency_symbol: {
    value: string;
    prepend: boolean;
  };

  constructor(code: string,
              symbol: string,
              prepend: boolean,
              decimal_point_position: number) {
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
   * @param value {string}
   * @returns {string}
   */
  addCurrencySymbol(value: string) {
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
  format(amount: number) {
    const absoluteValue = Math.abs(amount / Math.pow(10, this.decimal_point_symbol.position));
    const formattedResult = format(absoluteValue, this.decimal_point_symbol.position);
    const resultWithCurrency = this.addCurrencySymbol(formattedResult);

    return `${amount < 0 ? '-' : ''}${resultWithCurrency}`;
  }
}
