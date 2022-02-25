import baseToNumber from './baseToNumber.js'
import baseToString from './baseToString.js'

/**
 * Creates a function that performs a mathematical operation on two values.
 *
 * @private
 * @param {Function} operator The function to perform the operation.
 * @param {number} [defaultValue] The value used for `undefined` arguments.
 * @returns {Function} Returns the new mathematical operation function.
 */
function createMathOperation(operator, defaultValue) {
  return (value, other) => {
    if (value === undefined && other === undefined) {
      return defaultValue
    }
    if (value !== undefined && other === undefined) {
      return value
    }
    if (other !== undefined && value === undefined) {
      return other
    }
    if (typeof value === 'string' || typeof other === 'string') {
      value = baseToString(value)
      other = baseToString(other)
    }
    else {
      value = baseToNumber(value)
      other = baseToNumber(other)
    }
    return operator(value, other)
  }
}

function createMathOperation(operator, defaultValue) {
  return (a, b) => {
    // 如果函数的两个参数都是 undefined，返回默认值
    if (a === undefined && b === undefined) {
      return defaultValue;
    }
    // 如果
    if (a !== undefined && b === undefined) {
      return a;
    }
    if (a === undefined && b !== undefined) {
      return b;
    }
  }
}

export default createMathOperation
