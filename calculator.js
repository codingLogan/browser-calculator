// App initialization
let applicationState = {
  debug: true,
  result: null,
  storedOperand: null, // saved number
  editableOperand: null, // the number being built by the user
  selectedOperation: null, // +-x/
};

function resetState() {
  applicationState.result = null;
  applicationState.storedOperand = null;
  applicationState.editableOperand = null;
  applicationState.selectedOperation = null;
}

function setOperation(operation) {
  applicationState.selectedOperation = operation;
}

function refreshDisplay() {
  debugLog(applicationState);
  // Show the most recent values for operation
  const pending = document.getElementById("pending");
  if (
    applicationState.storedOperand ||
    applicationState.selectedOperation ||
    applicationState.editableOperand
  ) {
    pending.innerText = `${applicationState.storedOperand ?? ""} ${
      applicationState.selectedOperation ?? ""
    } ${applicationState.editableOperand ?? ""} ${
      applicationState.result !== null ? "=" : ""
    }`;
  } else {
    pending.innerText = "0";
  }

  const display = document.getElementById("results");
  display.innerText = applicationState.result ?? "";
}

function buildNumberButtons() {
  const buttonContainer = document.getElementById("number-buttons");

  const buildButton = (val) => {
    const numberButton = document.createElement("button");
    numberButton.value = val;
    numberButton.textContent = val.toString();
    numberButton.classList.add("number-button");
    numberButton.addEventListener("click", onNumberClick);

    buttonContainer.appendChild(numberButton);
  };

  for (let i = 1; i < 10; i++) {
    buildButton(i);
  }
  buildButton(0);
}

function storeOperand() {
  if (applicationState.result !== null) {
    applicationState.storedOperand = applicationState.result;
    applicationState.result = null;
  } else {
    applicationState.storedOperand = applicationState.editableOperand;
  }

  applicationState.editableOperand = null;
}

function setActionEvents() {
  const onOperationClick = (event) => {
    storeOperand();
    setOperation(event.target.innerText);
    refreshDisplay();
  };

  const actions = document.getElementById("actions");
  actions.querySelectorAll(".operation").forEach((element) => {
    element.addEventListener("click", onOperationClick);
  });

  document.getElementById("equals").addEventListener("click", (event) => {
    if (applicationState.result !== null) {
      applicationState.storedOperand = applicationState.result;
    }

    const result = performOperation(
      applicationState.storedOperand,
      applicationState.editableOperand,
      applicationState.selectedOperation
    );
    applicationState.result = result;
    refreshDisplay();
  });

  document.getElementById("clear").addEventListener("click", (event) => {
    resetState();
    refreshDisplay();
  });
}

function getUserNumber() {
  const currentResult = document.getElementById("results").innerText;

  // Return blank string if "null-ish"
  return currentResult ?? "";
}

function onNumberClick(event) {
  const value = event.target.value;
  if (applicationState.result !== null) {
    resetState();
  }

  if (applicationState.editableOperand === null) {
    applicationState.editableOperand = value;
  } else {
    applicationState.editableOperand += value;
  }
  refreshDisplay();
}

function performOperation(operand1, operand2, operation) {
  const op1 = Number.parseInt(operand1);
  const op2 = Number.parseInt(operand2);
  switch (operation) {
    case "+":
      return op1 + op2;
    case "-":
      return op1 - op2;
    case "x":
      return op1 * op2;
    case "/":
      return op1 / op2;
    default:
      "Err Invalid Operation";
  }
}

function debugLog(mixed) {
  if (applicationState.debug) {
    console.log(mixed);
  }
}

export {
  buildNumberButtons,
  refreshDisplay,
  storeOperand,
  setActionEvents,
  getUserNumber,
  onNumberClick,
  performOperation,
  debugLog,
};
