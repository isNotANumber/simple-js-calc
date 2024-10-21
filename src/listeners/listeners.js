import {
  handleThemeToggle,
  handleKeyboardEvent,
} from "../handlers/handlers.js";
import { buttonsContainer, themeToggleButton } from "../const/elements.js";

export default function applyListeners() {
  buttonsContainer.addEventListener("click", handleKeyboardEvent);
  window.addEventListener("keydown", handleKeyboardEvent);
  themeToggleButton.addEventListener("click", handleThemeToggle);
}
