let currentOperationText=document.querySelector('[data-current-operand]')
let previousOperationText=document.querySelector('[data-previous-operand]')
let equalButton=document.querySelector('[data-equals]')
let numberButton=document.querySelectorAll('[data-number]')
let operationButton=document.querySelectorAll('[data-operation]')
let clearButton=document.querySelector('[data-all-clear]');
let deleteButton=document.querySelector('[data-delete]');
console.log(equalButton)

class Calculator{
  constructor(currentOperationText,previousOperationText)
  {
    this.currentOperationText=currentOperationText;
    this.previousOperationText=previousOperationText;
    this.clear();
  }
  clear(){
    this.currentOperand='';
    this.previouOperand='';
    this.operation=undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  updateDisplay()
  {
    currentOperationText.innerText=this.currentOperand;
    previousOperationText.innerText=this.previouOperand;
  }
  chooseOperation(button)
  {
    if(this.currentOperand =='') return;
    if(this.previouOperand!==''){
      this.compute();
      
    }
    this.operation =button
    this.previouOperand=this.currentOperand;
    this.currentOperand=''

  }
  append(button)
  {
    if(button === '.'&&this.currentOperand.includes('.')) return
    this.currentOperand=this.currentOperand.toString() + button.toString()
  }
  compute()
  {
    let computation
    let curr=parseFloat(this.currentOperand)
    let prev=parseFloat(this.previouOperand);
    if(isNaN(curr)||isNaN(prev)) return;
    switch(this.operation){
      case '+':
        computation=curr+prev;
        break
      case '-':
        computation=prev-curr;
        break
      case '*':
        computation=curr*prev;
        break
      case '÷':
        computation=prev/curr;
        break
      default:
        return
        
    }
    this.currentOperand=computation;
    this.previouOperand='';
    this.operation=undefined;
  }

}
let calculator=new Calculator(currentOperationText,previousOperationText);
numberButton.forEach(button => {
  button.addEventListener('click', () => {
    calculator.append(button.innerText)
    calculator.updateDisplay()
  })
})
clearButton.onclick=()=>{
  calculator.clear();
  calculator.updateDisplay();
}
deleteButton.onclick=()=>{
  calculator.delete();
  calculator.updateDisplay();
}
operationButton.forEach(e=>{
  e.onclick=()=>{
    calculator.chooseOperation(e.innerText);
    calculator.updateDisplay();
  }
})
equalButton.onclick=()=>
{
  calculator.compute();
  calculator.updateDisplay();
}