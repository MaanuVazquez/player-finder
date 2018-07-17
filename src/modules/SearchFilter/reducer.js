// @flow
import {initialValue, type State} from './model'
import {SUBMIT_FILTER} from './actionTypes'

export default function searchFilterReducer(state: State = initialValue, action: any) {
  switch (action.type) {
    case SUBMIT_FILTER:
      return action.payload
    default:
      return state
  }
}
