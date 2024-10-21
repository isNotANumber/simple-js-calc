import { displayElement } from "../const/elements.js";

/**
 * Writes the expression on the calculator display.
 * @param {string} expression - calc expression.
 */
function writeToDisplay(expression) {
  const expressionToDisplay = expression.replaceAll('neg', '-');
  displayElement.value = expressionToDisplay;
};

export {writeToDisplay}
