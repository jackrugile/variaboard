'use strict';

/**
 * Calculation functions and helpers
 */

class Calc {

  /**
  * Get a random float within a range. If only one argument is passed, it is used as the max and the min becomes zero.
  *
  * @param {number} min - Minimum range value
  * @param {number} max - Maximum range value
  *
  * @example
  * // two arguments
  * Calc.rand(2, 18);
  * // -> random float between 2 and 18
  *
  * // single argument
  * Calc.rand(42.5);
  * // -> random float between 0 and 42.5
  *
  * @returns {number} Random float within the range
  */
  static rand(min, max) {
    if(max === undefined) {
      max = min;
      min = 0;
    }
    return Math.random() * (max - min) + min;
  }

  /**
  * Clamp a value to a range
  *
  * @param {number} val - Input value
  * @param {number} min - Minimum range value
  * @param {number} max - Maximum range value
  *
  * @example
  * Calc.clamp(3, 10, 150);
  * // -> 10
  *
  * Calc.clamp(400, 10, 150);
  * // -> 150
  *
  * Calc.clamp(75, 10, 100);
  * // -> 75
  *
  * @returns {number} Clamped value within range
  */

  static clamp(val, min, max) {
    return Math.max(Math.min(val, max), min);
  }

  static map(val, inMin, inMax, outMin, outMax) {
    return ((outMax - outMin) * ((val - inMin) / (inMax - inMin))) + outMin;
  }

  static roundToNearestInterval(value, interval) {
    return Math.round(value / interval) * interval;
  }

}

module.exports = Calc;
