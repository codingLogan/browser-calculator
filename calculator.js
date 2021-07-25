// App initialization
let applicationState = {
  debug: true,
  result: "",
  storedOperand: "", // saved number
  editableOperand: "0", // the number being built by the user
  selectedOperation: "", // +-x/
};

function resetState() {
  applicationState.result = "";
  applicationState.storedOperand = "";
  applicationState.editableOperand = "0";
  applicationState.selectedOperation = "";
}

function setOperation(operation) {
  applicationState.selectedOperation = operation;
}

function refreshDisplay() {
  debugLog(applicationState);
  // Show the most recent values for operation
  const pending = document.getElementById("pending");
  pending.innerText = `${applicationState.storedOperand} ${applicationState.selectedOperation} ${applicationState.editableOperand}`;

  const display = document.getElementById("results");
  if (applicationState.result) {
    display.innerText = applicationState.result;
  } else {
    display.innerText = "";
  }
}

function buildNumberButtons() {
  const buttonContainer = document.getElementById("number-buttons");

  for (let i = 0; i < 10; i++) {
    const numberButton = document.createElement("button");
    numberButton.value = i;
    numberButton.textContent = i.toString();
    numberButton.classList.add("number-button");
    numberButton.addEventListener("click", onNumberClick);

    buttonContainer.appendChild(numberButton);
  }
}

function storeOperand() {
  if (applicationState.result) {
    applicationState.storedOperand = applicationState.result;
    applicationState.result = "";
  } else {
    applicationState.storedOperand = applicationState.editableOperand;
  }

  applicationState.editableOperand = "0";
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
    if (applicationState.result !== "") {
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

  // Return blank string if "empty"
  if (currentResult == "0" || !currentResult) {
    return "";
  }

  return currentResult;
}

function onNumberClick(event) {
  const value = event.target.value;
  if (applicationState.result !== "") {
    resetState();
  }

  if (applicationState.editableOperand == "0") {
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
