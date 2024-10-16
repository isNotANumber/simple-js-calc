import {handleThemeToggle, handleButtonClick, handleKeyDown} from '../handlers/handlers.js';
import { buttonsContainer, themeToggleButton } from '../const/elements.js';

export default function applyListeners() {
  buttonsContainer.addEventListener("click", handleButtonClick);
  window.addEventListener("keydown", handleKeyDown);
  themeToggleButton.addEventListener("click", handleThemeToggle);
}
