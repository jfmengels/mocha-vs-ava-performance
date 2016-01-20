import test from 'ava'

import { isAtPos } from '../'

const toPiece = (pos, isAtDestination) => ({pos, isAtDestination})

test('isAtPos should return true if piece is at the given position and not at destination', (t) => {
  t.plan(1)
  const position = 12
  const piece = toPiece(12, false)

  const actual = isAtPos(position, piece)

  t.same(actual, true)
})

test('isAtPos should return false if piece is not at the given position and not at destination', (t) => {
  const position = 12
  const piece = toPiece(11, false)

  const actual = isAtPos(position, piece)

  t.same(actual, false)
})

test('isAtPos should return false if piece is at the given position but at destination', (t) => {
  const position = 2
  const piece = toPiece(2, true)

  const actual = isAtPos(position, piece)

  t.same(actual, false)
})

test('isAtPos should return false if piece is not at the given position and at destination', (t) => {
  const position = 12
  const piece = toPiece(2, true)

  const actual = isAtPos(position, piece)

  t.same(actual, false)
})

test('isAtPos should be curried', (t) => {
  const position = 12
  const piece = toPiece(12, false)
  const expected = isAtPos(position, piece)

  const actual = isAtPos(position)(piece)

  t.same(actual, expected)
})
