import Calculator from "../calculator/calculator.js";

const calculator = new Calculator();

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
      calculator.calculateResult();
      break;
    case "Delete":
    case "Escape":
      calculator.clearExpression();
      break;
    case "Backspace":
      calculator.deleteLastChar();
      break;
    default:
      calculator.updateExpression(value);
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
      calculator.clearExpression();
      break;
    case "⌫":
      calculator.deleteLastChar();
      break;
    case "=":
      calculator.calculateResult();
      break;
    case "+/-":
      calculator.toggleSign();
      break;
    default:
      calculator.updateExpression(value);
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
