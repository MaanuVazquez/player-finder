// @flow
import {SUBMIT_FILTER} from './actionTypes'
import PlayerList from '../PlayerList'

export const submitFilter = (age: string, position: PlayerList.model.Position, name: string) => ({
  type: SUBMIT_FILTER,
  payload: {age, position, name}
})
