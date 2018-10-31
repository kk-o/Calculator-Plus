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

    // todo: handle decimal

    // todo: handle equals

    // todo: handle plus or minus

    // todo: hanlde operations 

    // todo: handle edge cases

}