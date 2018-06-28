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
  static CLP = new Currency('CLP', '$', true, 0);
  static COP = new Currency('COP', '$', true, 2);
  static DOP = new Currency('DOP', 'RD$', true, 2);
  static MXN = new Currency('MXN', '$', true, 2);
  static PAB = new Currency('PAB', '$', true, 2);
  static PEN = new Currency('PEN', 'PEN', true, 2);
  static UYU = new Currency('UYU', '$', true, 2);
  static SAR = new Currency('SAR', 'SAR', true, 2);
  static EGP = new Currency('EGP', 'EG£', true, 2);
  static PKR = new Currency('PKR', '₨', true, 2);
  static JOD = new Currency('JOD', 'JOD', true, 3);
  static BHD = new Currency('BHD', 'BD', true, 3);
  static QAR = new Currency('QAR', '﷼', true, 2);
  static LBP = new Currency('LBP', 'ل.ل', true, 2);
  static CNY = new Currency('CNY', '¥', true, 2);
  static MYR = new Currency('MYR', 'RM', true, 2);
  static TRY = new Currency('TRY', '₺', true, 2);
  static KWD = new Currency('KWD', 'د.ك', true, 2);
  static MAD = new Currency('MAD', 'MAD', true, 2);
  static SGD = new Currency('SGD', 'S$', true, 2);
  static IDR = new Currency('IDR', 'Rp', true, 2);
  static THB = new Currency('THB', '฿', true, 2);
  static VND = new Currency('VND', '₫', true, 1);
  static PHP = new Currency('PHP', '₱', true, 2);
  static MMK = new Currency('MMK', 'K', true, 2);
  static KHR = new Currency('KHR', '៛', true, 1);
  static IQD = new Currency('IQD', 'ع.د', true, 3);
  static ILS = new Currency('ILS', '₪', true, 2);
  static JPY = new Currency('JPY', '¥', true, 0);  

  code: string;
  /* tslint:disable:variable-name */
  decimal_point_symbol: {
    position: number;
  };
  currency_symbol: {
    value: string;
    prepend: boolean;
  };

  constructor(
    code: string,
    symbol: string,
    prepend: boolean,
    decimalPointPosition: number,
  ) {
    this.code = code;
    this.decimal_point_symbol = Object.freeze({
      position: decimalPointPosition,
    });

    this.currency_symbol = Object.freeze({
      value: symbol,
      prepend: prepend,
    });

    Object.freeze(this);
  }

  /**
   *
   * @param {string} code
   * @returns {Currency}
   */
  static getCurrency(code: string): Currency {
    const currency = (<any>Currency)[code];

    if (!currency) {
      throw new Error(`currency code is not supported: ${code}`);
    }

    return currency;
  }

  /**
   *
   * @returns {string[]} Array of valid currency codes
   */
  static getCurrencyCodes(): string[] {
    return Object.keys(this);
  }

  /**
   *
   * @param {number} amount
   * @param {Currency} from
   * @param {Currency} to
   * @param {number} rate
   * @returns {number}
   */
  static convert(amount: number, from: Currency, to: Currency, rate: number = 1): number {
    const normalized = to.toMinorUnit(from.toMajorUnit(amount));

    return Math.round(normalized * rate);
  }

  /**
   *
   * @param {string} value
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
   * @param {number} amount
   * @returns {string}
   */
  format(amount: number) {
    const absoluteValue = Math.abs(this.toMajorUnit(amount));
    const formattedResult = format(absoluteValue, this.decimal_point_symbol.position);
    const resultWithCurrency = this.addCurrencySymbol(formattedResult);

    return `${amount < 0 ? '-' : ''}${resultWithCurrency}`;
  }

  /**
   *
   * @param {number} amount
   * @returns {number}
   */
  toMajorUnit(amount: number) {
    return amount / Math.pow(10, this.decimal_point_symbol.position);
  }

  /**
   *
   * @param {double} double (double - with decimal point)
   * @returns {number} (integer - without decimal point)
   */
  toMinorUnit(double: number) {
    return Math.round(double * Math.pow(10, this.decimal_point_symbol.position));
  }
}
