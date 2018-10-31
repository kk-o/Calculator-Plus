/** Calculate -- Method
 *   + Takes in a calculator object
 *   + Returns updated calculator object
 * 
 *  Calculator -- Structure
 *    + total: string    |   the running total
 *    + next: string    |   the next number to include in the total
 *    + operation: string    |   +, -, /, etc...
 * 
 */

import Big from 'big.js'; // allows for arbitrary-precision decimal arithmetic

import evaluate from './evaluate'; // performs operations on the input
import isNumber from './isNumber'; // checks if input item is a number


export default function calculate(obj, buttonName) {
  if (buttonName === 'AC') { // if input was AC, reset the calculator  
    return {
      total: null,
      next: null,
      operation: null,
    };
  }

  // --- handle numbers --- // 
  if (isNumber(buttonName)) { // if input button was a number, then...
    if (buttonName === "0" && obj.next === "0") {
      return {};
    }

    if (obj.operation) { // if there's an operation, update next
      if (obj.next) {
        return { next: obj.next + buttonName };
      }
      return { next: buttonName };
    }

    if (obj.next) { // if there's no operation, update next && clear value
      return {
        next: obj.next + buttonName,
        total: null,
      };
    }

    return {
      next: buttonName,
      total: null,
    };
  }

  // --- handle operations --- // 
  if (buttonName === '%') { // if input was division, then...
    if (obj.operation && obj.next) {
      const result = evaluate(obj.total, obj.next, obj.operation);
        return {
          total: Big(result)
                .div(Big('100'))
                .toString(),
              next: null,
              operation: null,
          };
        }
      if (obj.next) {
        return {
          next: Big(obj.next)
            .div(Big('100'))
            .toString(),
        };
      }
      return {};
    }

    if (buttonName === ".") { // if input was decimal, then...
      if (obj.next) {
        if (obj.next.includes(".")) { // check if input already has decimal 
          return {};
        }
        return { next: obj.next + "." };
      }
      return { next: "0." };
    }
  
    if (buttonName === "=") { // if input was '=', then...
      if (obj.next && obj.operation) {
        return {
          total: evaluate(obj.total, obj.next, obj.operation),
          next: null,
          operation: null,
        };
      } else {
        return {}; // if input was '=' with no operation, just do nothing
      }
    }
  
    if (buttonName === "+/-") { // if input was plus or minus, then... 
      if (obj.next) {
        return { next: (-1 * parseFloat(obj.next)).toString() };
      }
      if (obj.total) {
        return { total: (-1 * parseFloat(obj.total)).toString() };
      }
      return {};
    }
  
    if (obj.operation) { // if there's already an existing operation, then... 
      return {
        total: evaluate(obj.total, obj.next, obj.operation),
        next: null,
        operation: buttonName,
      };
    }
    
    // if there's no existing operation, check if there's a number input
    if (!obj.next) { // if there's no input number yet, just save the operation 
      return { operation: buttonName };
    }
  
    return { // saves the operation and shifts 'next' into 'total'
      total: obj.next,
      next: null,
      operation: buttonName,
    };
}