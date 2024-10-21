/**
 * Allowed operators regular expression.
 */
const operatorsRegExp = /[\+\-\*\%\/]/;

/**
 * Allowed chars to input from keyboard regular expression.
 */
const validCharsRegexp = new RegExp(/^[\d]/.source + "|" + operatorsRegExp.source);

export { operatorsRegExp, validCharsRegexp}
