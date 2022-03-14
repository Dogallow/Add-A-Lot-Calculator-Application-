class Calculator  {
    constructor(prevNumber, currentNumber){
        this.prev= prevNumber
        this.current= currentNumber
        this.clear()
    }
    
    clear(){
        // These variables are the lifeblood of being able to get the operations to the DOM
        this.currentOperand= ''
        this.previousOperand= ''
        this.operation=undefined
    }
    
    appendNumber(number){
            if(this.operation === null){ 
                this.currentOperand = ''
                this.operation= undefined
            }
            if(number == '.' && this.currentOperand.includes('.')) return
            this.currentOperand = this.currentOperand.toString() + number.toString()
    }


    setOperation(operator){
         this.operation = operator
         this.previousOperand = this.currentOperand
         this.currentOperand = ''
    }
    
    

    delete(){
        this.currentOperand = this.currentOperand.slice(0, -1)
    }

    compute(){
        if (this.operation === null) return
        let computation
        let currentFloat = parseFloat(this.current.innerText)
        let previousFloat = parseFloat(this.previousOperand)
        if(isNaN(currentFloat) || isNaN(previousFloat)) return
        switch(this.operation.innerText){
            case ('+'):
                computation = currentFloat + previousFloat;
                break;
            case('-'):
                computation = previousFloat - currentFloat;
                break;
            case('/'):
                computation = previousFloat / currentFloat;
                break;
            case('*'):
                computation = previousFloat * currentFloat;
                break;
        }
        
        this.currentOperand = computation.toString()
        this.previousOperand=''
        this.operation = null
        
    }


    updateDisplay(){
        this.current.innerText = this.currentOperand
        this.prev.innerText = this.previousOperand
    }
}


const numbers = document.querySelectorAll('[data-number]')
const operators = document.querySelectorAll('[data-operation-value]')
const clear = document.querySelector('[data-allClear]')
const deleteButton = document.querySelector('[data-delete]')
const equalButton = document.querySelector('[data-equal]')
let prevNumber = document.querySelector('[data-prev-value]')
let currentNumber = document.querySelector('[data-current-value]')


let calculator = new Calculator(prevNumber, currentNumber)

numbers.forEach((button)=>{
    button.addEventListener('click', function(){
        calculator.appendNumber(button.textContent)
        calculator.updateDisplay()
    })
})

operators.forEach((operator)=>{
    operator.addEventListener('click', function(){
        calculator.setOperation(operator)
        calculator.updateDisplay()
    })
})

deleteButton.addEventListener('click', function(){
    calculator.delete()
    calculator.updateDisplay()
})

equalButton.addEventListener('click', function(){
    calculator.compute()
    calculator.updateDisplay()
})

clear.addEventListener('click', function(){
    calculator.clear()
    calculator.updateDisplay()
})
