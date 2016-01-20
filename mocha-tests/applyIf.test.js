import _ from 'lodash/fp'
import expect from 'expect'

import { applyIf } from '../'

describe('applyIf', () => {
  const setup = () => {
    return {
      okToTrue: _.assign({ok: true}),
      okToFalse: _.assign({ok: false}),
      obj: {
        a: 10
      }
    }
  }

  it('should apply fnTrue if cond(obj) is true', () => {
    const { okToTrue, okToFalse, obj } = setup()
    const cond = (o) => o.a === 10

    const actual = applyIf(cond, okToTrue, okToFalse)(obj)

    expect(actual.ok).toEqual(true)
  })

  it('should apply fnTrue if cond(obj) is truthy', () => {
    const { okToTrue, okToFalse, obj } = setup()
    const cond = (o) => 2

    const actual = applyIf(cond, okToTrue, okToFalse)(obj)

    expect(actual.ok).toEqual(true)
  })

  it('should apply fnFalse if cond(obj) is false', () => {
    const { okToTrue, okToFalse, obj } = setup()
    const cond = (o) => o.a !== 10

    const actual = applyIf(cond, okToTrue, okToFalse)(obj)

    expect(actual.ok).toEqual(false)
  })

  it('should apply fnFalse if cond(obj) is falsy', () => {
    const { okToTrue, okToFalse, obj } = setup()
    const cond = (o) => 0

    const actual = applyIf(cond, okToTrue, okToFalse)(obj)

    expect(actual.ok).toEqual(false)
  })

  it('should not update obj if cond(obj) is false and fnFalse is not given', () => {
    const { okToTrue, obj } = setup()
    const cond = (o) => o.a !== 10

    const actual = applyIf(cond, okToTrue)(obj)

    expect(actual.ok).toEqual(undefined)
  })

  it('should apply fnTrue if cond is a truthy non-function value', () => {
    const { okToTrue, okToFalse, obj } = setup()
    const cond = 2

    const actual = applyIf(cond, okToTrue, okToFalse)(obj)

    expect(actual.ok).toEqual(true)
  })

  it('should apply fnFalse if cond is a falsy non-function value', () => {
    const { okToTrue, okToFalse, obj } = setup()
    const cond = 0

    const actual = applyIf(cond, okToTrue, okToFalse)(obj)

    expect(actual.ok).toEqual(false)
  })
})
