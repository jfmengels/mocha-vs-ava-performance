import _ from 'lodash/fp'
import expect from 'expect'

import { isAtPos } from '../'

describe('isAtPos', () => {
  const toPiece = (pos, isAtDestination) => ({pos, isAtDestination})

  it('should return true if piece is at the given position and not at destination', () => {
    const position = 12
    const piece = toPiece(12, false)

    const actual = isAtPos(position, piece)

    expect(actual).toEqual(true)
  })

  it('should return false if piece is not at the given position and not at destination', () => {
    const position = 12
    const piece = toPiece(11, false)

    const actual = isAtPos(position, piece)

    expect(actual).toEqual(false)
  })

  it('should return false if piece is at the given position but at destination', () => {
    const position = 2
    const piece = toPiece(2, true)

    const actual = isAtPos(position, piece)

    expect(actual).toEqual(false)
  })

  it('should return false if piece is not at the given position and at destination', () => {
    const position = 12
    const piece = toPiece(2, true)

    const actual = isAtPos(position, piece)

    expect(actual).toEqual(false)
  })

  it('should be curried', () => {
    const position = 12
    const piece = toPiece(12, false)
    const expected = isAtPos(position, piece)

    const actual = isAtPos(position)(piece)

    expect(actual).toEqual(expected)
  })
})
