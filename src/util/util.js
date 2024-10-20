// import { displayElement } from "../const/elements.js";
import { validChars, operators } from "../const/const.js";

/**
* Checks if a dot is allowed in the current number.
* @returns {boolean} - True if a dot is allowed, false otherwise.
*/
// function isDotAllowed() {
//   const lastNumber = displayElement.value.split(/[\+\-\*\/]/).pop();
//   return !lastNumber.includes('.') && !isNaN(lastNumber);
// }

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

export { isValidChar, isDot, isOperator, isNumber, isOperatorInExpression }
