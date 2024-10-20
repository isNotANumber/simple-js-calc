import {
  clearDisplay,
  deleteLastChar,
  calculateResult,
  appendToDisplay,
  toggleSign,
} from "../operations/operations.js";
import { isDotAllowed, isValidChar } from "../util/util.js";

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
      calculateResult();
      break;
    case "Delete":
    case "Escape":
      clearDisplay();
      break;
    case "Backspace":
      deleteLastChar();
      break;
    case ".":
      if (isDotAllowed()) {
        appendToDisplay(e.key);
      }
      break;
    default:
      if (isValidChar(e.key)) {
        appendToDisplay(e.key);
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
      clearDisplay();
      break;
    case "⌫":
      deleteLastChar();
      break;
    case "=":
      calculateResult();
      break;
    case ".":
      if (isDotAllowed()) {
        appendToDisplay(value);
      }
      break;
    case "+/-":
      toggleSign();
      break;
    default:
      appendToDisplay(value);
      break;
  }
}

/**
 * General calc handler for mouse and keyboard events.
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
