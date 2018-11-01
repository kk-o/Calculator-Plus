import Big from 'big.js'; // allows for arbitrary-precision decimal arithmetic

export default function evaluate(firstNum, secondNum, operation) {
  const first = Big(firstNum || '0'); // first input number
  const second = Big(secondNum || '0'); // second input number 

  // handles calculator functions
  switch (operation) {
    case '+':
        return first.plus(second).toString();
    case '-':
        return first.minus(second).toString();
    case 'x':
        return first.times(second).toString();
    case '÷':
        return first.div(second).toString();    
    default: 
        throw Error(`Sorry, but: ${operation} failed`);
    }
}