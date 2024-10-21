import { isValidChar, isDotAllowed } from "../util/util.js";
import Calculator from "../calculator/calculator.js";

const calculator = new Calculator();

/**
 * Toggles the theme between light and dark.
 */
function handleThemeToggle() {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
}

/**
 * Handles keydown events.
 * @param {KeyboardEvent} e - The keydown event.
 */
function handleKeyDown(e) {
  switch (e.key) {
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
    case ".":
      if (isDotAllowed(calculator.expression)) {
        calculator.appendToExpression(e.key);
      }
      break;
    default:
      if (isValidChar(e.key)) {
        calculator.appendToExpression(e.key);
      }
      break;
  }
}

/**
 * Handles button click events.
 * @param {PointerEvent} e - The click event.
 */
function handleButtonClick(e) {
  const value = e.target.textContent;

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
    case ".":
      if (calculator.isDotAllowed()) {
        calculator.appendToExpression(value);
      }
      break;
    case "+/-":
      calculator.toggleSign();
      break;
    default:
      if (isValidChar(e.key)) {
        calculator.appendToExpression(value);
      }
      break;
  }
}

/**
 * General calc keyboard handler for click and keydown events.
 * @param {PointerEvent|KeyboardEvent} e
 */
function handleKeyboardEvent(e) {
  if (e instanceof PointerEvent) {
    handleButtonClick(e);
  } else {
    handleKeyDown(e);
  }
}

export { handleThemeToggle, handleKeyboardEvent };
