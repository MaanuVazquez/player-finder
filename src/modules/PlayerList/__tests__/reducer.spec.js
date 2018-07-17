// @flow
import reducer from '../reducer'
import * as types from '../actionTypes'
import {initialValue} from '../model'

describe('PlayerList reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialValue)
  })

  it('should handle PLAYER_LIST_LOAD', () => {
    expect(
      reducer(initialValue, {
        type: types.PLAYER_LIST_LOAD
      })
    ).toEqual({...initialValue, loading: true})
  })

  it('should handle PLAYER_LIST_ERROR', () => {
    expect(reducer(initialValue, {type: types.PLAYER_LIST_ERROR, message: 'error'})).toEqual({
      ...initialValue,
      error: true,
      errorMessage: 'error'
    })
    expect(reducer({...initialValue, loading: true}, {type: types.PLAYER_LIST_ERROR, message: 'error'})).toEqual({
      ...initialValue,
      error: true,
      errorMessage: 'error'
    })
  })

  it('should handle PLAYER_LIST_SUCCESS', () => {
    const items = [
      {
        contractUntil: '2022-06-30',
        dateOfBirth: '1993-05-13',
        jerseyNumber: 9,
        name: 'Romelu Lukaku',
        nationality: 'Belgium',
        position: 'Centre-Forward'
      },
      {
        contractUntil: '2019-06-30',
        dateOfBirth: '1990-11-07',
        jerseyNumber: 1,
        name: 'David de Gea',
        nationality: 'Spain',
        position: 'Keeper'
      }
    ]
    expect(reducer(initialValue, {type: types.PLAYER_LIST_SUCCESS, items})).toEqual({
      ...initialValue,
      loading: false,
      playerList: items
    })
  })
})
