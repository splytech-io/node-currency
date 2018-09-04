'use strict';

import { expect } from 'chai';
import Currency from './currency';

describe('currency', () => {
  it('should prepend currency symbol', () => {
    const currency = new Currency('GBP', '£', true, 2);

    expect(currency.format(1)).to.equals('£0.01');
  });
  it('should append currency symbol', () => {
    const currency = new Currency('GBP', '£', false, 2);

    expect(currency.format(1)).to.equals('0.01£');
  });
  it('should use 1 decimal point position', () => {
    const currency = new Currency('GBP', '£', false, 1);

    expect(currency.format(1)).to.equals('0.1£');
  });
  it('should use 1 decimal point position', () => {
    const currency = new Currency('GBP', '£', false, 0);

    expect(currency.format(1)).to.equals('1£');
  });
  it('should format negative amount', () => {
    const currency = new Currency('GBP', '£', true, 2);

    expect(currency.format(-123)).to.equals('-£1.23');
  });
  it('should format negative amount 2', () => {
    const currency = new Currency('GBP', '£', false, 2);

    expect(currency.format(-123)).to.equals('-1.23£');
  });
  it('should format negative amount 2', () => {
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
      'IDR', 'THB', 'VND', 'PHP', 'MMK', 'KHR', 'IQD',
      'ILS',
    ];
    expect(Currency.getCurrencyCodes()).to.deep.equal(expectedCodes);
  });
  it('should convert amount to major unit', () => {
    const currency = new Currency('TEST', '$', false, 2);
    expect(currency.toMajorUnit(10021359)).to.equal(100213.59);
  });
  it('should return same amount if 0', () => {
    const currency = new Currency('TEST', '$', false, 2);
    expect(currency.toMajorUnit(0)).to.equal(0);
  });
  it('should convert amount to major unit if amount is negative', () => {
    const currency = new Currency('TEST', '$', false, 2);
    expect(currency.toMajorUnit(-1523)).to.equal(-15.23);
  });
  it('should remove decimal point from currency with 2 decimal position', () => {
    const currency = new Currency('TEST', '$', false, 2);
    expect(currency.toMinorUnit(100213.59)).to.equal(10021359);
  });
  it('should add 2 zeroes to amount with no decimal for currency with 2 decimal position', () => {
    const currency = new Currency('TEST', '$', false, 2);
    expect(currency.toMinorUnit(1234)).to.equal(123400);
  });
  it('should return same amount for currency with 0 decimal position', () => {
    const currency = new Currency('TEST', '$', false, 0);
    expect(currency.toMinorUnit(100213.59)).to.equal(100214);
  });
  it('should return 0 if amount is 0', () => {
    const currency = new Currency('TEST', '$', false, 2);
    expect(currency.toMinorUnit(0)).to.equal(0);
  });
  it('should convert amount if negative', () => {
    const currency = new Currency('TEST', '$', false, 2);
    expect(currency.toMinorUnit(-123.54)).to.equal(-12354);
  });
  it('should convert amount it decimal point is not correct', () => {
    const currency = new Currency('TEST', 'USD', false, 2);
    expect(currency.toMinorUnit(12.1111123123123123123123)).to.equal(1211);
  });
  it('should convert currencies', () => {
    expect(Currency.convert(100, Currency.EUR, Currency.GBP)).to.equals(100);
    expect(Currency.convert(100, Currency.EUR, Currency.CLP, 1)).to.equals(1);
    expect(Currency.convert(100, Currency.CLP, Currency.EUR, 1)).to.equals(100 * 100);

    expect(Currency.convert(20909, Currency.CLP, Currency.BRL, 0.00570675959826459)).to.equals(11932);
  });
});
