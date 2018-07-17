// @flow
import * as actions from '../actions'
import * as types from '../actionTypes'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import {API_URL} from '../constants'

describe('SearchFilter actions', () => {
  let store
  beforeEach(() => {
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    store = mockStore({playerList: [], error: false, loading: false, errorMessage: ''})
  })

  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('should create an action to tell the reducer the api call is loading', () => {
    const expectedAction = {
      type: types.PLAYER_LIST_LOAD
    }
    expect(actions.playerListLoad()).toEqual(expectedAction)
  })

  it('should create an action to tell the reducer the api call failed', () => {
    const expectedAction = {
      type: types.PLAYER_LIST_ERROR,
      message: 'error'
    }
    expect(actions.playerListError('error')).toEqual(expectedAction)
  })

  it('should create an action to tell the reducer the api call succeed', () => {
    const items = [
      {
        contractUntil: '2019-06-30',
        dateOfBirth: '1989-08-14',
        jerseyNumber: 21,
        name: 'Ander Herrera',
        nationality: 'Spain',
        position: 'Central Midfield'
      }
    ]

    const expectedAction = {
      type: types.PLAYER_LIST_SUCCESS,
      items
    }

    expect(actions.playerListSuccess(items)).toEqual(expectedAction)
  })

  it('should create PLAYER_LIST_SUCCESS when fetching playerlist has been done', () => {
    const items = [
      {
        contractUntil: '2019-06-30',
        dateOfBirth: '1989-08-14',
        jerseyNumber: 21,
        name: 'Ander Herrera',
        nationality: 'Spain',
        position: 'Central Midfield'
      }
    ]

    fetchMock.getOnce(API_URL, items)

    const expectedActions = [{type: types.PLAYER_LIST_LOAD}, {type: types.PLAYER_LIST_SUCCESS, items}]

    return store.dispatch(actions.playerListFetch()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create PLAYER_LIST_ERROR when failing fetching playerList', () => {
    fetchMock.getOnce(API_URL, 404)

    const expectedActions = [{type: types.PLAYER_LIST_LOAD}, {type: types.PLAYER_LIST_ERROR, message: 'Not Found'}]

    return store.dispatch(actions.playerListFetch()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
