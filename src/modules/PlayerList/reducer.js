// @flow
import {PLAYER_LIST_LOAD, PLAYER_LIST_ERROR, PLAYER_LIST_SUCCESS} from './actionTypes'
import {initialValue, type State} from './model'

export default function playerReducer(state: State = initialValue, action: any) {
  switch (action.type) {
    case PLAYER_LIST_LOAD:
      return {...state, loading: true}
    case PLAYER_LIST_ERROR:
      return {...state, loading: false, error: true, errorMessage: action.message}
    case PLAYER_LIST_SUCCESS:
      return {...state, loading: false, playerList: action.items}
    default:
      return state
  }
}
