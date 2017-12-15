'use strict';

import { should } from 'chai';
import { format } from './../lib/numeral';

should();

describe('numeral', function () {
  it('should format number', function () {
    format(1234567.89).should.equals('1,234,567.89');

    format(1).should.equals('1.00');
    format(10).should.equals('10.00');
    format(10.01).should.equals('10.01');
    format(100.01).should.equals('100.01');
    format(1000.01).should.equals('1,000.01');
    format(10000.01).should.equals('10,000.01');
    format(100000.01).should.equals('100,000.01');
    format(1000000.01).should.equals('1,000,000.01');
  });
  it('should use decimal place', function () {
    format(10.01, 1).should.equals('10.0');
    format(10.123, 3).should.equals('10.123');
    format(10.123, 4).should.equals('10.1230');
  });
});
