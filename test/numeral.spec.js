'use strict';

require('chai').should();

const numeral = require('./../lib/numeral');

describe('numeral', function () {
  it('should format number', function () {
    numeral.format(1234567.89).should.equals('1,234,567.89');

    numeral.format(1).should.equals('1.00');
    numeral.format(10).should.equals('10.00');
    numeral.format(10.01).should.equals('10.01');
    numeral.format(100.01).should.equals('100.01');
    numeral.format(1000.01).should.equals('1,000.01');
    numeral.format(10000.01).should.equals('10,000.01');
    numeral.format(100000.01).should.equals('100,000.01');
    numeral.format(1000000.01).should.equals('1,000,000.01');
  });
  it('should use decimal place', function () {
    numeral.format(10.01, 1).should.equals('10.0');
    numeral.format(10.123, 3).should.equals('10.123');
    numeral.format(10.123, 4).should.equals('10.1230');
  });
});
