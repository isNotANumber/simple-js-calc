import {
  calculateResult,
  clearExpression,
  deleteLastChar,
  updateExpression,
  toggleSign,
} from "../calculator/calculator.js";

/**
 * Toggles the theme between light and dark.
 */
function handleCalcThemeToggle() {
  document.body.classList.toggle("light-theme");
}

/**
 * Handles keydown events.
 * @param {KeyboardEvent} e - The keydown event.
 */
function handleKeyDown(e) {
  const value = e.key;

  switch (value) {
    case "Enter":
      calculateResult();
      break;
    case "Delete":
    case "Escape":
      clearExpression();
      break;
    case "Backspace":
      deleteLastChar();
      break;
    default:
      updateExpression(value);
      break;
  }
}

/**
 * Handles button click events.
 * @param {PointerEvent} e - The click event.
 */
function handleButtonClick(e) {
  const value = e.target.dataset.keyValue;

  switch (value) {
    case "AC":
      clearExpression();
      break;
    case "⌫":
      deleteLastChar();
      break;
    case "=":
      calculateResult();
      break;
    case "+/-":
      toggleSign();
      break;
    default:
      updateExpression(value);
      break;
  }
}

/**
 * General calc keyboard handler for click and keydown events.
 * @param {PointerEvent|KeyboardEvent} e
 */
function handleCalcKeyboardEvent(e) {
  e instanceof PointerEvent ? handleButtonClick(e) : handleKeyDown(e);
}

export { handleCalcThemeToggle, handleCalcKeyboardEvent };
