import {
  isDot,
  isOperator,
  isNumber,
  isOperatorInExpression,
  replaceInOperands,
} from "../util/util.js";
import { OPERATIONS } from "../operations/operations.js";
import { writeToDisplay } from "../display/display.js";
import { operatorsRegex, negNumberRegex } from "../const/const.js";

export default class Calculator {
  expression = "0";

  /**
   * Parse current expression.
   * @returns operands and operator.
   */
  parseExpression() {
    const operator = this.expression.match(operatorsRegex);
    const operands = this.expression.split(operator);

    if (operator) {
      return [...operands, ...operator];
    } else {
      return [...operands];
    }
  }

  /**
   * Clears the expression.
   */
  clearExpression() {
    this.expression = "0";
    writeToDisplay(this.expression);
  }

  /**
   * Deletes the last character from the expression.
   */
  deleteLastChar() {
    if (negNumberRegex.test(this.expression)) {
      this.expression = this.expression.replace(negNumberRegex, "0");
    } else {
      this.expression = this.expression.slice(0, -1) || "0";
    }
    writeToDisplay(this.expression);
  }

  /**
   * Calculates the result of the expression on the expression.
   */
  calculateResult() {
    let [firstOperand, secondOperand, operator] = this.parseExpression();

    if (secondOperand) {
      [firstOperand, secondOperand] = replaceInOperands(
        "neg",
        "-",
        firstOperand,
        secondOperand
      );
      this.expression = String(
        OPERATIONS[operator](Number(firstOperand), Number(secondOperand))
      ).replaceAll("-", "neg");
    } else {
      this.expression = firstOperand;
    }

    writeToDisplay(this.expression);
  }

  /**
   * Appends a value to the calc expression.
   * @param {string} value - The value to append.
   */
  updateExpression(value) {
    const lastChar = this.expression.slice(-1);

    if (isNumber(value) && this.expression === "0") {
      this.expression = value;
    } else if (isOperator(value) && isOperator(lastChar)) {
      this.expression = this.expression.slice(0, -1) + value;
    } else if (isOperator(value) && isOperatorInExpression(this.expression)) {
      this.calculateResult();
      this.expression += value;
    } else if (isDot(value) && isOperator(lastChar)) {
      this.expression += "0.";
    } else {
      this.expression += value;
    }

    writeToDisplay(this.expression);
  }

  /**
   * Toggles the sign of the current number on the expression.
   */
  toggleSign() {
    let [firstOperand, secondOperand, operator] = this.parseExpression();

    if (firstOperand === "0") {
      return;
    }

    if (!secondOperand) {
      firstOperand = firstOperand.includes("neg")
        ? firstOperand.slice(3)
        : "neg" + firstOperand;
    } else {
      secondOperand = secondOperand.includes("neg")
        ? secondOperand.slice(3)
        : "neg" + secondOperand;
    }

    if (operator) {
      this.expression = firstOperand + operator + secondOperand;
    } else {
      this.expression = firstOperand;
    }

    writeToDisplay(this.expression);
  }
}
