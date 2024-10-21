import {
  handleThemeToggle,
  handleCalcKeyboardEvent,
} from "../handlers/handlers.js";
import { buttonsContainer, themeToggleButton } from "../const/elements.js";

export default function applyListeners() {
  buttonsContainer.addEventListener("click", handleCalcKeyboardEvent);
  window.addEventListener("keydown", handleCalcKeyboardEvent);
  themeToggleButton.addEventListener("click", handleThemeToggle);
}
