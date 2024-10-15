import { isDotAllowed } from "../util/util.js";
import { display } from "../const/elements.js";
import { operators } from "../const/const.js";

/**
 * Clears the display.
 */
function clearDisplay() {
  display.value = "0";
}

/**
 * Deletes the last character from the display.
 */
function deleteLastChar() {
  display.value = display.value.slice(0, -1) || "0";
}

/**
 * Calculates the result of the expression on the display.
 */
function calculateResult() {
  try {
    let expression = display.value;
    const lastChar = expression.slice(-1);
    if (operators.includes(lastChar)) {
      expression = expression.slice(0, -1);
    }
    display.value = eval(
      expression.replace("×", "*").replace("÷", "/").replace("−", "-")
    ).toString();
  } catch {
    display.value = "Error";
  }
}

/**
 * Appends a value to the display.
 * @param {string} value - The value to append.
 */
function appendToDisplay(value) {
  if (display.value === "0" && value !== ".") {
    display.value = value;
  } else if (display.value === "Error") {
    display.value = value;
  } else {
    const lastChar = display.value.slice(-1);
    if (operators.includes(lastChar) && operators.includes(value)) {
      display.value = display.value.slice(0, -1) + value;
    } else if (value === "." && !isDotAllowed()) {
      return;
    } else if (operators.includes(lastChar) && value === ".") {
      display.value += "0.";
    } else {
      display.value += value;
    }
  }
}

/**
 * Toggles the sign of the current number on the display.
 */
function toggleSign() {
  if (display.value !== "0" && display.value !== "Error") {
    if (display.value.startsWith("-")) {
      display.value = display.value.slice(1);
    } else {
      display.value = "-" + display.value;
    }
  }
}

export {
  clearDisplay,
  deleteLastChar,
  calculateResult,
  appendToDisplay,
  toggleSign,
};
