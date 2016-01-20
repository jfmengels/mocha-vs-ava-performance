import _ from 'lodash/fp'

/**
 * Returns a function that will tell whether a piece is at the given position on the board.
 * Will only return true if the piece is not at in the destination locations.
 * @param {int} position Position on the board to look at to look at
 * @param {object} piece Object containing the position of the piece and whether it's in the destination locations.
 * @return {boolean} true if piece is at the given position but not in the destination locations, false otherwise.
 */
export const isAtPos = _.curry((position, {pos, isAtDestination}) =>
  pos === position && !isAtDestination
)

/**
 * Applies a function to the data targetted by selector inside obj (using lodash's _.get),
 * and updates obj with the new value at the same location.
 * Example: update('a.b', (n) => n + 1, { a: { b: 2 } }) --> { a: { b: 3 } }
 * @param  {string} selector Data selector used by lodash's _.set and _.get
 * @return {function} fn     Function to apply to the value
 * @return {object} obj      Object to apply changes to.
 */
export const update = _.curry((selector, fn, obj) => {
  const value = fn(_.get(selector, obj))
  return _.set(value, selector, obj)
})

/**
 * Same as Lodash's _.flow, but stops applying fns as soon as state.error is truthy
 * @param  {function[]} ...fns Functions to apply
 * @return {function} function that takes a state and applies fns to it
 */
export const flowSkipOnError = (...fns) => (state) => {
  return _.reduce(
    (currState, fn) => currState.error ? currState : fn(currState),
    state,
    fns
  )
}

/**
 * Returns a function, that when given an value val, gets applied either `fnTrue` or `fnFalse`,
 * based on the result of `cond(val)` if it is a function, or its truthyness otherwise.
 * @param  {function|Any} cond Function that determines whether to call fnTrue or fnFalse.
 *                             If not a function, then which function is called is based on
 *                             the truthyness of its value
 * @param  {function} fnTrue   Function to apply if condition is truthy
 * @param  {function} fnFalse  (default=_.identity) Function to apply if condition is falsy
 * @return {function}
 */
export const applyIf = (cond, fnTrue, fnFalse=_.identity) => (val) => {
  const condition = _.isFunction(cond) ? cond(val) : cond
  return condition ? fnTrue(val) : fnFalse(val)
}

/**
 * Returns a function that when passed an value val, sets the error field to `error`
 * if cond(state), or cond if cond is not a function, is truthy.
 * @param  {Function} cond    Function returning a truthy/falsy value, or any value
 * @param  {string}   error   Error to assign
 * @return {function} function that takes an object and may assign an error field to it
 */
export const setErrorIf = (cond, error) => applyIf(cond, _.assign({error}))
