import * as calcFns from "./calculator.js";

function startCalculator() {
  calcFns.buildNumberButtons();
  calcFns.setActionEvents();
  calcFns.refreshDisplay();
}

export { startCalculator };
