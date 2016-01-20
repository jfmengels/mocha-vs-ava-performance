import test from 'ava'

import { setErrorIf } from '../'

const setup = () => {
  return {
    error: 'error was set',
    obj: {
      a: 10,
      error: null
    }
  }
}

test('should set an error if cond(obj) is true', (t) => {
  t.plan(1)
  const { error, obj } = setup()
  const cond = (o) => o.a === 10

  const actual = setErrorIf(cond, error)(obj)

  t.same(actual.error, error)
})

test('should set an error if cond(obj) is truthy', (t) => {
  t.plan(1)
  const { error, obj } = setup()
  const cond = (o) => 2

  const actual = setErrorIf(cond, error)(obj)

  t.same(actual.error, error)
})

test('should not set an error if cond(obj) is false', (t) => {
  t.plan(1)
  const { error, obj } = setup()
  const cond = (o) => o.a !== 10

  const actual = setErrorIf(cond, error)(obj)

  t.same(actual.error, null)
})

test('should not set an error if cond(obj) is falsy', (t) => {
  t.plan(1)
  const { error, obj } = setup()
  const cond = (o) => 0

  const actual = setErrorIf(cond, error)(obj)

  t.same(actual.error, null)
})

test('should set an error if cond is a truthy non-function value', (t) => {
  t.plan(1)
  const { error, obj } = setup()
  const cond = 2

  const actual = setErrorIf(cond, error)(obj)

  t.same(actual.error, error)
})

test('should not set an error if cond is a falsy non-function value', (t) => {
  t.plan(1)
  const { error, obj } = setup()
  const cond = 0

  const actual = setErrorIf(cond, error)(obj)

  t.same(actual.error, null)
})
