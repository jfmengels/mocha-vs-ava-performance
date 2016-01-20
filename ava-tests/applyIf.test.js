import test from 'ava'
import _ from 'lodash/fp'

import { applyIf } from '../'

const setup = () => {
  return {
    okToTrue: _.assign({ok: true}),
    okToFalse: _.assign({ok: false}),
    obj: {
      a: 10
    }
  }
}

test('should apply fnTrue if cond(obj) is true', (t) => {
  t.plan(1)
  const { okToTrue, okToFalse, obj } = setup()
  const cond = (o) => o.a === 10

  const actual = applyIf(cond, okToTrue, okToFalse)(obj)

  t.same(actual.ok, true)
})

test('should apply fnTrue if cond(obj) is truthy', (t) => {
  t.plan(1)
  const { okToTrue, okToFalse, obj } = setup()
  const cond = (o) => 2

  const actual = applyIf(cond, okToTrue, okToFalse)(obj)

  t.same(actual.ok, true)
})

test('should apply fnFalse if cond(obj) is false', (t) => {
  t.plan(1)
  const { okToTrue, okToFalse, obj } = setup()
  const cond = (o) => o.a !== 10

  const actual = applyIf(cond, okToTrue, okToFalse)(obj)

  t.same(actual.ok, false)
})

test('should apply fnFalse if cond(obj) is falsy', (t) => {
  t.plan(1)
  const { okToTrue, okToFalse, obj } = setup()
  const cond = (o) => 0

  const actual = applyIf(cond, okToTrue, okToFalse)(obj)

  t.same(actual.ok, false)
})

test('should not update obj if cond(obj) is false and fnFalse is not given', (t) => {
  t.plan(1)
  const { okToTrue, obj } = setup()
  const cond = (o) => o.a !== 10

  const actual = applyIf(cond, okToTrue)(obj)

  t.same(actual.ok, undefined)
})

test('should apply fnTrue if cond is a truthy non-function value', (t) => {
  t.plan(1)
  const { okToTrue, okToFalse, obj } = setup()
  const cond = 2

  const actual = applyIf(cond, okToTrue, okToFalse)(obj)

  t.same(actual.ok, true)
})

test('should apply fnFalse if cond is a falsy non-function value', (t) => {
  t.plan(1)
  const { okToTrue, okToFalse, obj } = setup()
  const cond = 0

  const actual = applyIf(cond, okToTrue, okToFalse)(obj)

  t.same(actual.ok, false)
})
