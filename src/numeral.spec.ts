'use strict';

import { expect } from 'chai';
import { format } from './numeral';

describe('numeral', () => {
  it('should format number', () => {
    expect(format(1234567.89)).to.equals('1,234,567.89');

    expect(format(1)).to.equals('1.00');
    expect(format(10)).to.equals('10.00');
    expect(format(10.01)).to.equals('10.01');
    expect(format(100.01)).to.equals('100.01');
    expect(format(1000.01)).to.equals('1,000.01');
    expect(format(10000.01)).to.equals('10,000.01');
    expect(format(100000.01)).to.equals('100,000.01');
    expect(format(1000000.01)).to.equals('1,000,000.01');
  });
  it('should use decimal place', () => {
    expect(format(10.01, 1)).to.equals('10.0');
    expect(format(10.123, 3)).to.equals('10.123');
    expect(format(10.123, 4)).to.equals('10.1230');
  });
});
