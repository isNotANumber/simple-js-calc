import { displayElement } from "../const/elements";
import { isDot, isOperator, isNumber, isOperatorInExpression } from "../util/util.js";

const Calc = {
  display: displayElement,

  /**
   * Clears the display.
   */
  clearDisplay() {
    this.display.value = "0";
  },

  /**
   * Deletes the last character from the display.
   */
  deleteLastChar() {
    this.display.value = this.display.value.slice(0, -1) || "0";
  },

  /**
   * Calculates the result of the expression on the display.
   */
  calculateResult() {
    try {
      this.display.value = eval(this.display.value);
    } catch {
      this.display.value = "Error";
    }
  },

  /**
   * Appends a value to the display.
   * @param {string} value - The value to append.
   */
  appendToDisplay(value) {
    const lastChar = this.display.value.slice(-1);

    if (isNumber(value) && this.display.value === "0") {
      this.display.value = value;
    } else if (isOperator(value) && isOperator(lastChar)) {
      this.display.value = this.display.value.slice(0, -1) + value;
    } else if (
      isOperator(value) &&
      isOperatorInExpression(this.display.value)
    ) {
      this.calculateResult();
      this.display.value += value;
    } else if (isDot(value) && isOperator(lastChar)) {
      this.display.value += "0.";
    } else {
      this.display.value += value;
    }
  },

  /**
   * Toggles the sign of the current number on the display.
   */
  toggleSign() {
    if (this.display.value !== "0" && this.display.value !== "Error") {
      if (this.display.value.startsWith("-")) {
        this.display.value = this.display.value.slice(1);
      } else {
        this.display.value = "-" + this.display.value;
      }
    }
  },

  isDotAllowed() {
    const lastNumber = this.display.value.split(/[\+\-\*\/]/).pop();
    return !lastNumber.includes(".") && !isNaN(lastNumber);
  },
};

export {Calc}
