// @flow
import PlayerList from '../PlayerList'

export type State = {
  age: string,
  name: string,
  position: PlayerList.model.Position
}

export const initialValue: State = {
  name: '',
  position: '',
  age: ''
}
