import { displayElement } from "../const/elements.js";
import { isDot, isOperator, isNumber, isOperatorInExpression } from "../util/util.js";

export default class Calculator {
  expression = '0';
  display = displayElement;

  /**
   * Displays the expression on the calculator display.
   */
  drawExpression() {
    this.display.value = this.expression;
  };

  /**
   * Clears the display.
   */
  clearExpression() {
    this.expression = "0";
    this.drawExpression();
  };

  /**
   * Deletes the last character from the display.
   */
  deleteLastChar() {
    this.expression= this.expression.slice(0, -1) || "0";
    this.drawExpression();
  };

  /**
   * Calculates the result of the expression on the display.
   */
  calculateResult() {
    try {
      this.expression = String(eval(this.expression));
    } catch {
      this.expression = "Error";
    }

    this.drawExpression();
  };

  /**
   * Appends a value to the calc expression.
   * @param {string} value - The value to append.
   */
  appendToExpression(value) {
    const lastChar = this.expression.slice(-1);

    if (isNumber(value) && this.expression === "0") {
      this.expression = value;
    } else if (isOperator(value) && isOperator(lastChar)) {
      this.expression = this.expression.slice(0, -1) + value;
    } else if (
      isOperator(value) &&
      isOperatorInExpression(this.expression)
    ) {
      this.calculateResult();
      this.expression += value;
    } else if (isDot(value) && isOperator(lastChar)) {
      this.expression += "0.";
    } else {
      this.expression += value;
    }

    this.drawExpression();
  };

  /**
   * Toggles the sign of the current number on the display.
   */
  toggleSign() {
    if (this.expression !== "0" && this.expression !== "Error") {
      if (this.expression.startsWith("-")) {
        this.expression = this.expression.slice(1);
      } else {
        this.expression = "-" + this.expression;
      }
    }

    this.drawExpression();
  };

  isDotAllowed() {
    const lastNumber = this.expression.split(/[\+\-\*\/]/).pop();
    return !lastNumber.includes(".") && !isNaN(lastNumber);
  };
};
