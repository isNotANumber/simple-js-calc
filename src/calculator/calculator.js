import {
  isDot,
  isOperator,
  isNumber,
  isDotAllowed,
  isValidChar,
  needsDot
} from "../util/util.js";
import { OPERATIONS } from "../operations/operations.js";
import { writeToDisplay, writeDotToDisplay } from "../display/display.js";

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

      lastExpressionItem.value = updatedValue === "-" || updatedValue === '.' ? 0 : parseFloat(updatedValue);
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
  if (!isValidChar(value)) {
    return;
  }

  const currentOperand = getCurrentOperand();

  if (isNumber(value)) {
    handleNumber(value);
  } else if (isDot(value)) {
    handleDot(currentOperand);
  } else if (isOperator(value)) {
    handleOperator(value);
  }
}

/**
 * Handles the case when a number is input.
 * Updates the operand and refreshes the display.
 * @param {string|number} value - The number to update the current operand with.
 */
function handleNumber(value) {
  const currentOperand = calcStore.operator !== null ? calcStore.so : calcStore.fo;

  if (currentOperand.value === null) {
    currentOperand.value = parseInt(value);
    writeToDisplay(calcStore);
    return;
  }

  const currentValueStr = String(currentOperand.value);

  if (currentOperand.hasDot) {
    currentOperand.value = parseFloat(currentValueStr + (needsDot(currentOperand) ? "." + value : value));
  } else {
    currentOperand.value = parseInt(currentValueStr + value);
  }

  writeToDisplay(calcStore);
}

/**
 * Handles the case when a dot is input.
 * Updates the current operand to allow a decimal point if valid.
 * @param {Object} currentOperand - The current operand being updated.
 */
function handleDot(currentOperand) {
  const isSoValueZero = calcStore.operator !== null && calcStore.so.value === 0;

  if (isDotAllowed(currentOperand) && !isSoValueZero) {
    currentOperand.hasDot = true;
    writeDotToDisplay();
  }
}

/**
 * Handles the case when an operator is input.
 * Calculates the result if the second operand is set, and updates the operator.
 * @param {string} operator - The operator to set in the calculation store.
 */
function handleOperator(operator) {
  if (calcStore.so.value !== null) {
    calculateResult();
  }

  calcStore.operator = operator;
  writeToDisplay(calcStore);
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
