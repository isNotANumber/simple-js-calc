import { display } from "../const/elements.js";
import { validChars } from "../const/const.js";

/**
* Checks if a dot is allowed in the current number.
* @returns {boolean} - True if a dot is allowed, false otherwise.
*/
function isDotAllowed() {
  const lastNumber = display.value.split(/[\+\−\×\÷]/).pop();
  return !lastNumber.includes('.') && !isNaN(lastNumber);
}

/**
* Checks if a character is valid.
* @param {string} char - The character to check.
* @returns {boolean} - True if the character is valid, false otherwise.
*/
function isValidChar(char) {
  return validChars.includes(char);
}

export {isDotAllowed, isValidChar}
