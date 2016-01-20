import _ from 'lodash/fp'
import expect from 'expect'

import { update } from '../'

describe('update', () => {
  const setup = () => {
    return {
      selector: 'a.b.c[0].d',
      fn: (n) => n + 1,
      obj: { a: { b: { c: [{ d: 56 }] } } }
    }
  }

  it('should update a deeply nested value', () => {
    const { fn, obj } = setup()
    const selector = 'a.b.c[0].d'

    const actual = update(selector, fn, obj)

    expect(actual.a.b.c[0].d).toEqual(57)
  })

  it('should work with an array notation', () => {
    const { fn, obj } = setup()
    const selector = ['a', 'b', 'c', 0, 'd']

    const actual = update(selector, fn, obj)

    expect(actual.a.b.c[0].d).toEqual(57)
  })

  it('should be curried', () => {
    const { fn, obj } = setup()
    const selector = 'a.b.c[0].d'

    const actual = update(selector)(fn)(obj)

    expect(actual.a.b.c[0].d).toEqual(57)
  })
})
