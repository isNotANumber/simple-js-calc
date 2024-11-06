import { calcDisplay } from "../const/elements.js";

/**
 * Writes the expression on the calculator display.
 * @param {string} expression - calc expression.
 */
function writeToDisplay(expression) {
  const expressionToDisplay = expression.replaceAll("neg", "-");
  calcDisplay.value = expressionToDisplay;
}

export { writeToDisplay };
