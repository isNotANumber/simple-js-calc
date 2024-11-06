import {
  handleCalcThemeToggle,
  handleCalcKeyboardEvent,
} from "../handlers/handlers.js";
import { calcButtons, calcButtonTheme } from "../const/elements.js";

export default function applyListeners() {
  calcButtons.addEventListener("click", handleCalcKeyboardEvent);
  calcButtonTheme.addEventListener("click", handleCalcThemeToggle);

  window.addEventListener("keydown", handleCalcKeyboardEvent);
}
