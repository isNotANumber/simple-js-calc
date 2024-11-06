/**
 * Allowed operators regular expression.
 */
const operatorsRegex = /[\+\-\*\%\/]/;

/**
 * Allowed chars to input from keyboard regular expression.
 */
const validCharsRegex = new RegExp(
  /^[\d]/.source + "|" + operatorsRegex.source
);

export { operatorsRegex, validCharsRegex };
