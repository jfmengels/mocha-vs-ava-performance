import _ from 'lodash/fp'
import expect from 'expect'

import { flowSkipOnError, update } from '../'

describe('flowSkipOnError', () => {
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

  it('should apply all functions when error is never set', () => {
    const { incrementVal, obj } = setup()

    const actual = flowSkipOnError(
      incrementVal,
      incrementVal,
      incrementVal
    )(obj)

    expect(actual.val).toEqual(3)
    expect(actual.error).toEqual(null)
  })

  it('should apply all functions until error is set', () => {
    const { incrementVal, setError, obj, error } = setup()

    const actual = flowSkipOnError(
      incrementVal,
      setError,
      incrementVal,
      incrementVal
    )(obj)

    expect(actual.val).toEqual(1)
    expect(actual.error).toEqual(error)
  })
})
