import _ from 'lodash/fp'
import expect from 'expect'

import { setErrorIf } from '../'

describe('setErrorIf', () => {
  const setup = () => {
    return {
      error: 'error was set',
      obj: {
        a: 10,
        error: null
      }
    }
  }

  it('should set an error if cond(obj) is true', () => {
    const { error, obj } = setup()
    const cond = (o) => o.a === 10

    const actual = setErrorIf(cond, error)(obj)

    expect(actual.error).toEqual(error)
  })

  it('should set an error if cond(obj) is truthy', () => {
    const { error, obj } = setup()
    const cond = (o) => 2

    const actual = setErrorIf(cond, error)(obj)

    expect(actual.error).toEqual(error)
  })

  it('should not set an error if cond(obj) is false', () => {
    const { error, obj } = setup()
    const cond = (o) => o.a !== 10

    const actual = setErrorIf(cond, error)(obj)

    expect(actual.error).toEqual(null)
  })

  it('should not set an error if cond(obj) is falsy', () => {
    const { error, obj } = setup()
    const cond = (o) => 0

    const actual = setErrorIf(cond, error)(obj)

    expect(actual.error).toEqual(null)
  })

  it('should set an error if cond is a truthy non-function value', () => {
    const { error, obj } = setup()
    const cond = 2

    const actual = setErrorIf(cond, error)(obj)

    expect(actual.error).toEqual(error)
  })

  it('should not set an error if cond is a falsy non-function value', () => {
    const { error, obj } = setup()
    const cond = 0

    const actual = setErrorIf(cond, error)(obj)

    expect(actual.error).toEqual(null)
  })
})
