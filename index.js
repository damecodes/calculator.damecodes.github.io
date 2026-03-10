class Calculator {
    constructor() {
        this.displayElement = document.querySelector('.display');
        this.display = "0";
        this.firstOperand = null;
        this.secondOperand = null;
        this.operator = null;
        this.isDecimalUsed = false;
        this.init();
    }

    init() {
        // Attach event listeners to all buttons
        document.querySelectorAll('.num-btn').forEach(button => {
            button.addEventListener('click', () => this.handleNumberInput(button.textContent));
        });

        document.querySelectorAll('.op-btn').forEach(button => {
            button.addEventListener('click', () => this.handleOperator(button.textContent));
        });

        document.querySelectorAll('.func-btn').forEach(button => {
            button.addEventListener('click', () => this.handleFunction(button.textContent));
        });
    }

    set display(value) {
        this._display = value;
        this.displayElement.textContent = value;
    }

    get display() {
        return this._display;
    }

    handleNumberInput(num) {
        // If starting a new number, reset display
        if (this.display === "0" && num !== ".") {
            this.display = num;
        } else if (num === ".") {
            // Only allow one decimal point
            if (!this.display.includes(".")) {
                this.display += num;
                this.isDecimalUsed = true;
            }
        } else {
            this.display += num;
        }
    }

    handleOperator(op) {
        if (op === "=") {
            this.calculate();
        } else {
            const currentValue = parseFloat(this.display);

            // If we already have an operator and first operand, calculate first
            if (this.operator !== null && this.firstOperand !== null) {
                this.calculate();
            } else {
                this.firstOperand = currentValue;
            }

            this.operator = op;
            this.display = "0";
            this.isDecimalUsed = false;
        }
    }

    handleFunction(func) {
        switch (func) {
            case "AC":
                this.clear();
                break;
            case "Back":
                this.backspace();
                break;
            case "+/-":
                this.toggleSign();
                break;
        }
    }

    calculate() {
        if (this.operator === null || this.firstOperand === null) {
            return;
        }

        const secondValue = parseFloat(this.display);
        let result;

        switch (this.operator) {
            case "+":
                result = this.firstOperand + secondValue;
                break;
            case "-":
                result = this.firstOperand - secondValue;
                break;
            case "*":
                result = this.firstOperand * secondValue;
                break;
            case "/":
                result = secondValue !== 0 ? this.firstOperand / secondValue : 0;
                break;
            default:
                return;
        }

        this.display = result.toString();
        this.firstOperand = null;
        this.operator = null;
        this.isDecimalUsed = false;
    }

    clear() {
        this.display = "0";
        this.firstOperand = null;
        this.secondOperand = null;
        this.operator = null;
        this.isDecimalUsed = false;
    }

    backspace() {
        if (this.display.length > 1) {
            this.display = this.display.slice(0, -1);
            if (this.display.endsWith(".")) {
                this.isDecimalUsed = false;
            }
        } else {
            this.display = "0";
            this.isDecimalUsed = false;
        }
    }

    toggleSign() {
        const currentValue = parseFloat(this.display);
        this.display = (currentValue * -1).toString();
    }
}

// Initialize calculator when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});

