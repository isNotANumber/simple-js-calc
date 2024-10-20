// import {
//   clearDisplay,
//   deleteLastChar,
//   calculateResult,
//   appendToDisplay,
//   toggleSign,
// } from "../operations/operations.js";
import { isValidChar } from "../util/util.js";
import { Calc } from "../calc/calc.js";

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
      Calc.calculateResult();
      break;
    case "Delete":
    case "Escape":
      Calc.clearDisplay();
      break;
    case "Backspace":
      Calc.deleteLastChar();
      break;
    case ".":
      if (Calc.isDotAllowed()) {
        Calc.appendToDisplay(e.key);
      }
      break;
    default:
      if (isValidChar(e.key)) {
        Calc.appendToDisplay(e.key);
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
      Calc.clearDisplay();
      break;
    case "⌫":
      Calc.deleteLastChar();
      break;
    case "=":
      Calc.calculateResult();
      break;
    case ".":
      if (Calc.isDotAllowed()) {
        Calc.appendToDisplay(value);
      }
      break;
    case "+/-":
      Calc.toggleSign();
      break;
    default:
      Calc.appendToDisplay(value);
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
