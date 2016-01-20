import test from 'ava'

import { update } from '../'

const setup = () => {
  return {
    selector: 'a.b.c[0].d',
    fn: (n) => n + 1,
    obj: { a: { b: { c: [{ d: 56 }] } } }
  }
}

test('should update a deeply nested value', (t) => {
  t.plan(1)
  const { fn, obj } = setup()
  const selector = 'a.b.c[0].d'

  const actual = update(selector, fn, obj)

  t.same(actual.a.b.c[0].d, 57)
})

test('should work with an array notation', (t) => {
  t.plan(1)
  const { fn, obj } = setup()
  const selector = ['a', 'b', 'c', 0, 'd']

  const actual = update(selector, fn, obj)

  t.same(actual.a.b.c[0].d, 57)
})

test('should be curried', (t) => {
  t.plan(1)
  const { fn, obj } = setup()
  const selector = 'a.b.c[0].d'

  const actual = update(selector)(fn)(obj)

  t.same(actual.a.b.c[0].d, 57)
})
