import {
  isDot,
  isOperator,
  isNumber,
  isDotAllowed,
  isValidChar,
  isInt,
} from "../util/util.js";
import { OPERATIONS } from "../operations/operations.js";
import { writeToDisplay } from "../display/display.js";

/**
 * @typedef {Object} Operand
 * @property {number} value - The numerical value of the operand.
 * @property {boolean} hasDot - Indicates if the operand has a decimal point.
 */

/**
 * @typedef {Object} CalcStore
 * @property {Operand} fo - The first operand.
 * @property {Operand} so - The second operand.
 * @property {string|null} operator - The current operator.
 */

/**
 * @type {CalcStore}
 */
const calcStore = {
  fo: {
    value: 0,
    hasDot: false,
  },
  so: {
    value: null,
    hasDot: false,
  },
  operator: null,
};

/**
 * Calculates the result based on the current operands and operator,
 * updates the first operand with the result, and resets the second operand and operator.
 * Displays the result on the screen.
 */
function calculateResult() {
  if (isStoreReadyToCalculate()) {
    const result = OPERATIONS[calcStore.operator](
      calcStore.fo.value,
      calcStore.so.value
    );

    resetCalcStore();
    calcStore.fo.value = result;

    writeToDisplay(calcStore);
  }
}

/**
 * Checks if the calculation store is ready to perform a calculation.
 * @returns {boolean} True if both operands and the operator are set, otherwise false.
 */
function isStoreReadyToCalculate() {
  return calcStore.so.value !== null && calcStore.operator !== null;
}

/**
 * Toggles the sign of the current operand (changes from positive to negative or vice versa).
 * Updates the display after the change.
 */
function toggleCurrentOperandSign() {
  const currentOperand = getCurrentOperand();

  currentOperand.value *= -1;

  writeToDisplay(calcStore);
}

/**
 * Deletes the last character of the current operand or operator.
 * Updates the display after the deletion.
 */
function deleteLastChar() {
  const lastExpressionItem = getLastExpressionItem();

  if (isOperator(lastExpressionItem)) {
    calcStore.operator = null;
  } else {
    const currentValue = lastExpressionItem.value;

    if (currentValue === 0 && calcStore.fo.value !== 0) {
      lastExpressionItem.value = null;
    } else {
      const updatedValue = String(currentValue).slice(0, -1) || "0";

      lastExpressionItem.value = updatedValue === "-" ? 0 : parseFloat(updatedValue);
    }
  }

  writeToDisplay(calcStore);
}

/**
 * Retrieves the current operand based on whether the second operand is set.
 * @returns {Operand} The current operand (first or second).
 */
function getCurrentOperand() {
  return calcStore.so.value !== null ? calcStore.so : calcStore.fo;
}

/**
 * Retrieves the last expression item (either the second operand or operator).
 * @returns {Operand|string} The last expression item.
 */
function getLastExpressionItem() {
  return calcStore.so.value !== null
    ? calcStore.so
    : calcStore.operator !== null
      ? calcStore.operator
      : calcStore.fo;
}

/**
 * Updates the calculation store based on the input value.
 * Handles numbers, dots, and operators accordingly.
 * @param {string|number} value - The value to update the calculation store with.
 */
function updateCalcStore(value) {
  const currentOperand = getCurrentOperand();

  if (isNumber(value)) {
    updateOperand(value);
  } else if (isDot(value) && isDotAllowed(currentOperand)) {
    currentOperand.hasDot = true;
    console.log(calcStore)
  } else if (isOperator(value)) {
    if (calcStore.so.value !== null) {
      calculateResult();
    }

    calcStore.operator = value;
  }

  // if (isValidChar(value)) {
    writeToDisplay(calcStore);
  // }
}

/**
 * Updates the current operand with the given value.
 * Handles the case of decimal numbers and integer concatenation.
 * @param {string|number} value - The value to update the current operand with.
 */
function updateOperand(value) {
  const currentOperand = calcStore.operator !== null ? calcStore.so : calcStore.fo;

  if (currentOperand.value === null) {
    currentOperand.value = parseInt(value);
    return;
  }

  const currentValueStr = String(currentOperand.value);

  if (currentOperand.hasDot) {
    currentOperand.value = parseFloat(currentValueStr + (isInt(currentOperand.value) ? "." + value : value)).toFixed(1);
  } else {
    currentOperand.value = parseInt(currentValueStr + value);
  }
}

/**
 * Resets the calculation store to its default state.
 * After resetting, it updates the display to reflect the changes.
 */
function resetCalcStore() {
  calcStore.fo = { value: 0, hasDot: false };
  calcStore.so = { value: null, hasDot: false };
  calcStore.operator = null;

  writeToDisplay(calcStore);
}

export {
  updateCalcStore,
  calculateResult,
  resetCalcStore,
  toggleCurrentOperandSign,
  deleteLastChar,
};
