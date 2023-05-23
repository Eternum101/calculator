// Declaring variables
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const backSpaceButton = document.querySelector('[data-backspace]');
const allClearButton = document.querySelector('[data-all-clear]');
const clearButton = document.querySelector('[data-clear]'); 
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Defines a Calculator class with a contructor that initializes instance variables
// and calls the clear method
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    // Resets the currentOperand, previousOperand and operation instance variables
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // Removes the last character of the currentOperand instance variable
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // Appends the given number to the calculators current operand, taking into
    // account the presence of a decimal place
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    // Sets the operation instance variable and updates previousOperand and
    // currentOperand instance variables
    chooseOperation(operation) {
        if (this.currentOperand === '') {
            return;
        }
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    // Computes the result of the current operation between the previous and current
    // operands and updates the calculators values accordingly
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) {
            return; 
        }
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break
            case '-':
                computation = prev - current;
                break
            case 'x':
                computation = prev * current;
                break
            case '÷':
                if (current === 0) {
                    this.currentOperandTextElement.innerText = "Math ERROR";
                } else {
                    computation = prev / current;
                }
                break
            default: 
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    // Takes in a number and returns a string representation of the number with proper
    // formatting for integer and decimal digits 
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            }); 
        } if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    // Updates the text of the current and previous operand elements on the calculator
    // display based on the current values and operation
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

// Creates a new instance of the Calculator class and passes in the previous and
// current operand text elements as arguments
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Adds event listeners to the calculators buttons to perform various actions such as
// appending numbers, choosing operations, computing results and clearing values when
// clicked
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay(); 
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay(); 
});

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay(); 
});

backSpaceButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay(); 
});

// Keyboard support
window.addEventListener('keydown', event => {
    if (event.key >= 0 && event.key <= 9 || event.key === '.') {
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    } else if (event.key === '+' || event.key === '-') {
        calculator.chooseOperation(event.key);
        calculator.updateDisplay();
    } else if (event.key === '*') {
        calculator.chooseOperation('x');2
        calculator.updateDisplay();
    } else if (event.key === '/') {
        calculator.chooseOperation('÷');
        calculator.updateDisplay();
    } else if (event.key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    } else if (event.key === 'Enter' || event.key === "=") {
        calculator.compute();
        calculator.updateDisplay();
    } else if (event.key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
    }
});

