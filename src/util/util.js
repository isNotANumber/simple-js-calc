import { operatorsRegex, validCharsRegex } from "../const/const.js";

/**
 * Checks if a character is valid.
 * @param {string} char - The character to check.
 * @returns {boolean} - True if the character is valid, false otherwise.
 */
function isValidChar(char) {
  return validCharsRegex.test(char);
}

/**
 * Checks if a character is dot symbol.
 * @param {string} char - The character to check.
 */
function isDot(char) {
  return char === ".";
}

/**
 * Checks if a character is operator symbol.
 * @param {string} char - The character to check.
 */
function isOperator(char) {
  return operatorsRegex.test(char);
}

/**
 * Checks if a character is number.
 * @param {string} char - The character to check.
 */
function isNumber(char) {
  return char >= "0" && char <= "9";
}

/**
 * Checks if dot allowed to append to number.
 * @param {expression} - current calc expression.
 */
function isDotAllowed(operand) {
  return !operand.hasDot;
}

/**
 * Checks if the number object should have a dot but its value does not have one.
 * @param {Object} numberObj - The object containing the number and its properties.
 * @param {number} numberObj.value - The numeric value.
 * @param {boolean} numberObj.hasDot - Indicates if the number should have a dot.
 * @returns {boolean} - Returns true if it should have a dot but doesn't, otherwise false.
 */
function needsDot(numberObj) {
  return numberObj.hasDot === true && Number.isInteger(numberObj.value);
}

export { isValidChar, isDot, isOperator, isNumber, isDotAllowed, needsDot };
