// @flow
import reducer from '../reducer'
import * as types from '../actionTypes'
import {initialValue} from '../model'

describe('SearchFilter reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialValue)
  })

  it('should handle SUBMIT_FILTER', () => {
    expect(
      reducer(
        {},
        {
          type: types.SUBMIT_FILTER,
          payload: {age: '31', name: 'Sergio', position: 'Keeper'}
        }
      )
    ).toEqual({age: '31', name: 'Sergio', position: 'Keeper'})

    expect(
      reducer(
        {age: '31', name: 'Sergio', position: 'Keeper'},
        {
          type: types.SUBMIT_FILTER,
          payload: {age: '19', name: 'Kylian', position: 'Attacking Midfield'}
        }
      )
    ).toEqual({age: '19', name: 'Kylian', position: 'Attacking Midfield'})
  })
})
