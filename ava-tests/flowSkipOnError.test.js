import test from 'ava'

import _ from 'lodash/fp'

import { flowSkipOnError, update } from '../'

const setup = () => {
  const error = 'error was set'
  return {
    error,
    incrementVal: update('val', (n) => n + 1),
    setError: _.assign({error: error}),
    obj: {
      val: 0,
      error: null
    }
  }
}

test('should apply all functions when error is never set', (t) => {
  t.plan(2)
  const { incrementVal, obj } = setup()

  const actual = flowSkipOnError(
    incrementVal,
    incrementVal,
    incrementVal
  )(obj)

  t.same(actual.val, 3)
  t.same(actual.error, null)
})

test('should apply all functions until error is set', (t) => {
  t.plan(2)
  const { incrementVal, setError, obj, error } = setup()

  const actual = flowSkipOnError(
    incrementVal,
    setError,
    incrementVal,
    incrementVal
  )(obj)

  t.same(actual.val, 1)
  t.same(actual.error, error)
})
