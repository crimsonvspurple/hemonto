/**
 * The goal of this class is to represent a currency in a quick and easy way.
 * If we are to support many more currencies, instead of enum, we could use a library like https://www.npmjs.com/package/currency-codes
 */
export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  INR = 'INR',
  CAD = 'CAD',
  SGD = 'SGD',
  BDT = 'BDT',
}
