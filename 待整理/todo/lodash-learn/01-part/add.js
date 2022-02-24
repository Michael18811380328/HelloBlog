import createMathOperation from './.internal/createMathOperation.js'

/**
 * Adds two numbers.
 *
 * @since 3.4.0
 * @category Math
 * @param {number} augend The first number in an addition.
 * @param {number} addend The second number in an addition.
 * @returns {number} Returns the total.
 * @example
 *
 * add(6, 4)
 * // => 10
 */
const add = createMathOperation((augend, addend) => augend + addend, 0)

export default add

// 2022-02-24 
// Michael An
// 求和函数（学习函数注释规范性）
// createMathOperation(operator, default_value) 这个辅助主要验证参数有效性
// 函数第一个参数是执行的函数，第二个是初始值
/**
 * Adds two numbers.
 * @since 3.4.0
 * @category Math
 * @param {number} augend The first number in an addition.
 * @param {number} addend The second number in an addition.
 * @return {number} Returns the total.
 * @example
 * add(6, 4) // => 10
 */
const add = createMathOperation((augend, addend) => augend + addend, 0);
