import { validChars, operators } from "../const/const.js";

/**
* Checks if a character is valid.
* @param {string} char - The character to check.
* @returns {boolean} - True if the character is valid, false otherwise.
*/
function isValidChar(char) {
  return validChars.includes(char);
}

/**
* Checks if a character is dot symbol.
* @param {string} char - The character to check.
*/
function isDot(char) {
  return char === '.';
}

/**
* Checks if a character is operator symbol.
* @param {string} char - The character to check.
*/
function isOperator(char) {
  return operators.includes(char);
}

/**
* Checks if operator in expression.
* @param {string} expression - Current displayed expression.
*/
function isOperatorInExpression(expression) {
  for (var i = 0; i < operators.length; i++) {
    if (expression.indexOf(operators[i]) > -1) {
      return true;
    }
  }
  return false;
}

/**
* Checks if a character is number.
* @param {string} char - The character to check.
*/
function isNumber(char) {
  return char >= '0' && char <= '9';
}

/**
 * Checks if dot allowed to append to number.
 * @param {expression} - current calc expression.
 */
function isDotAllowed(expression) {
  const lastNumber = expression.split(/[\+\-\*\/]/).pop();
  return !lastNumber.includes(".") && !isNaN(lastNumber);
};

export { isValidChar, isDot, isOperator, isNumber, isOperatorInExpression, isDotAllowed }
