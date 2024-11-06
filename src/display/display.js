import { calcDisplay } from "../const/elements.js";

/**
 * Updates the display value based on the current state of the calculator store.
 *
 * @param {Object} calcStore - The calculator store object.
 * @returns {void} This function does not return a value; it updates the display directly.
 */
function writeToDisplay(calcStore) {
  const items = [calcStore.fo.value, calcStore.operator, calcStore.so.value];

  const result = items.filter((item) => item !== null).join("");

  if (result !== calcDisplay.value) {
    calcDisplay.value = result;
  }
}

function writeDotToDisplay() {
  calcDisplay.value += ".";
}

export { writeToDisplay, writeDotToDisplay };
