'use strict';

import { expect } from 'chai';
import Currency from './currency';

describe('currency', function () {
  it('should prepend currency symbol', function () {
    const currency = new Currency('GBP', '£', true, 2);

    expect(currency.format(1)).to.equals('£0.01');
  });
  it('should append currency symbol', function () {
    const currency = new Currency('GBP', '£', false, 2);

    expect(currency.format(1)).to.equals('0.01£');
  });
  it('should use 1 decimal point position', function () {
    const currency = new Currency('GBP', '£', false, 1);

    expect(currency.format(1)).to.equals('0.1£');
  });
  it('should use 1 decimal point position', function () {
    const currency = new Currency('GBP', '£', false, 0);

    expect(currency.format(1)).to.equals('1£');
  });
  it('should format negative amount', function () {
    const currency = new Currency('GBP', '£', true, 2);

    expect(currency.format(-123)).to.equals('-£1.23');
  });
  it('should format negative amount 2', function () {
    const currency = new Currency('GBP', '£', false, 2);

    expect(currency.format(-123)).to.equals('-1.23£');
  });
  it('should format negative amount 2', function () {
    const currency = Currency.EUR;

    expect(currency.format(-123)).to.equals('-€1.23');
  });
  it('should find currency by its code', () => {
    expect(Currency.getCurrency('GBP')).to.equals(Currency.GBP);
  });
  it('should fail to find currency by its code', () => {
    expect(() => {
      Currency.getCurrency('INVALID');
    }).to.throw();
  });
  it('should return an array of currency object keys', () => {
    const expectedCodes = [
      'NGN', 'EUR', 'GBP', 'INR', 'AED', 'USD', 'ARS',
      'BRL', 'CLP', 'COP', 'DOP', 'MXN', 'PAB', 'PEN',
      'UYU', 'SAR', 'EGP', 'PKR', 'JOD', 'BHD', 'QAR',
      'LBP', 'CNY', 'MYR', 'TRY', 'KWD', 'MAD', 'SGD',
      'IDR', 'THB', 'VND', 'PHP', 'MMK', 'KHR', 'IQD'
    ]
    expect(Currency.getCurrencyCodes()).to.deep.equal(expectedCodes);
  });
  it('should remove decimal point from currency with 2 decimal position', () => {
    const currency = new Currency('TEST', '$', false, 2);
    expect(currency.toCents(100213.59)).to.equal(10021359);
  });
  it('should add 2 zeroes to amount with no decimal for currency with 2 decimal position', () => {
    const currency = new Currency('TEST', '$', false, 2);
    expect(currency.toCents(1234)).to.equal(123400);
  });
  it('should return same amount for currency with 0 decimal position', () => {
    const currency = new Currency('TEST', '$', false, 0);
    expect(currency.toCents(100213.59)).to.equal(100213.59);
  });
});
