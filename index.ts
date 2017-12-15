'use strict';

import { format } from './lib/numeral';

export type CURRENCY_CODES = 'NGN' | 'EUR' | 'GBP' |
                      'INR' | 'AED' | 'USD' |
                      'ARS' | 'BRL' | 'CLP' |
                      'COP' | 'DOP' | 'MXN' |
                      'PAB' | 'PEN' | 'UYU' |
                      'SAR' | 'EGP' | 'PKR' |
                      'JOD' | 'BHD' | 'QAR' |
                      'LBP' | 'CNY' | 'MYR';

/**
 *
 * @type {Currency}
 */
export class Currency {
  decimal_point_symbol: {
    position: number;
  };
  currency_symbol: {
    value: string;
    prepend: boolean;
  };

  constructor(
    private code: CURRENCY_CODES,
    symbol: string,
    prepend: boolean,
    decimal_point_position: number
  ) {
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
    let result = format(absoluteValue, this.decimal_point_symbol.position);

    result = this.addCurrencySymbol(result);

    if (amount < 0) {
      result = `-${result}`;
    }

    return result;
  }
}

export default Object.assign(Currency, {
  NGN: new Currency('NGN', '₦', true, 2),
  EUR: new Currency('EUR', '€', true, 2),
  GBP: new Currency('GBP', '£', true, 2),
  INR: new Currency('INR', '₹', true, 0),
  AED: new Currency('AED', 'د.إ', true, 2),
  USD: new Currency('USD', '$', true, 2),
  ARS: new Currency('ARS', '$', true, 2),
  BRL: new Currency('BRL', 'R$', true, 2),
  CLP: new Currency('CLP', '$', true, 2),
  COP: new Currency('COP', '$', true, 0),
  DOP: new Currency('DOP', 'RD$', true, 2),
  MXN: new Currency('MXN', '$', true, 2),
  PAB: new Currency('PAB', '$', true, 2),
  PEN: new Currency('PEN', 'PEN', true, 2),
  UYU: new Currency('UYU', '$', true, 2),
  SAR: new Currency('SAR', 'SAR', true, 2),
  EGP: new Currency('EGP', 'EG£', true, 2),
  PKR: new Currency('PKR', '₨', true, 2),
  JOD: new Currency('JOD', 'JOD', true, 2),
  BHD: new Currency('BHD', 'BD', true, 3),
  QAR: new Currency('QAR', '﷼', true, 2),
  LBP: new Currency('LBP', 'ل.ل', true, 2),
  CNY: new Currency('CNY', '¥', true, 2),
  MYR: new Currency('MYR', 'RM', true, 2),
});
