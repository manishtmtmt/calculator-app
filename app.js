const links = document.querySelectorAll('link');
const toggleBtn = document.querySelectorAll('input');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');
const deleteBtn = document.querySelector("[data-delete]");
const resultBtn = document.querySelector("[data-output]");
const resetBtn = document.querySelector("[data-reset]");
const operands = document.querySelectorAll("[data-num]");
const operatorBtn = document.querySelectorAll("[data-operator]");
let prevOperand = previousOperandText.innerText;
let currentOperand = currentOperandText.innerText;
let operation;

function changeTheme(i) {
  if (i === '0') {
    links[2].setAttribute('href', '');
  } else {
    links[2].setAttribute('href', `styles/theme${i}.css`)
  }
}

function reset() {
  prevOperand = "";
  currentOperand = "";
  operation = undefined;
}

function deleteOperand() {
    currentOperand = currentOperand.toString().slice(0, -1);
}

function addNumber(number) {
    if(number === "." && currentOperand.includes(".")) return;
    currentOperand = currentOperand.toString() + number.toString();
}

function operationSelection(operate) {
  if (currentOperandText === "") return;
  if (previousOperandText !== "") {
    calculatorOperation();
  }
  operation = operate;
  prevOperand = currentOperand;
  currentOperand = "";
}

function calculatorOperation() {
  let result;
  let prev = parseFloat(prevOperand);
  let current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  switch(operation) {
    case "+":
      result = prev + current;
      break;
    
    case "-":
      result = prev - current;
      break;

    case "x":
      result = prev * current;
      break;

    case "/":
      result = prev / current;
      break;

    default:
      return;
  }
  currentOperand = result;
  operation = undefined;
  prevOperand = '';
  previousOperandText.innerText = '';
}

function displayNum() {
  currentOperandText.innerText = currentOperand.toLocaleString('en');
  if (operation !== undefined) {
    previousOperandText.innerText = `${prevOperand} ${operation.toString('en')}`
  } else {
    previousOperandText.innerText = prevOperand;
  }
}

toggleBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    changeTheme(btn.value)
  })
})

resetBtn.addEventListener('click', () => {
  reset();
  displayNum();
})

deleteBtn.addEventListener('click', () => {
  deleteOperand();
  displayNum();
})

operands.forEach(operand => {
  operand.addEventListener('click', () => {
    addNumber(operand.innerText);
    displayNum();
  })
})

operatorBtn.forEach(operator => {
  operator.addEventListener('click', () => {
    operationSelection(operator.innerText);
    displayNum();
  })
})

resultBtn.addEventListener('click', () => {
  calculatorOperation();
  displayNum();
})