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
});
