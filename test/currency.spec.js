'use strict';

require('chai').should();
const Currency = require('./..');

describe('currency', function () {
  it('should prepend currency symbol', function () {
    const currency = new Currency('GBP', '£', true, 2);

    currency.format(1).should.equals('£0.01');
  });
  it('should append currency symbol', function () {
    const currency = new Currency('GBP', '£', false, 2);

    currency.format(1).should.equals('0.01£');
  });
  it('should use 1 decimal point position', function () {
    const currency = new Currency('GBP', '£', false, 1);

    currency.format(1).should.equals('0.1£');
  });
  it('should use 1 decimal point position', function () {
    const currency = new Currency('GBP', '£', false, 0);

    currency.format(1).should.equals('1£');
  });
  it('should format negative amount', function () {
    const currency = new Currency('GBP', '£', true, 2);

    currency.format(-123).should.equals('-£1.23');
  });
  it('should format negative amount 2', function () {
    const currency = new Currency('GBP', '£', false, 2);

    currency.format(-123).should.equals('-1.23£');
  });
});
