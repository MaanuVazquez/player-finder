// @flow

export type Position =
  | 'Attacking Midfield'
  | 'Central Midfield'
  | 'Centre-Back'
  | 'Centre-Forward'
  | 'Defensive Midfield'
  | 'Keeper'
  | 'Left Midfield'
  | 'Left Wing'
  | 'Left-Back'
  | 'Right-Back'
  | ''

export type Player = {
  contractUntil: string,
  dateOfBirth: string,
  jerseyNumber: number,
  name: string,
  nationality: string,
  position: Position
}

export type State = {
  error: boolean,
  errorMessage: string,
  loading: boolean,
  playerList: Player[]
}

export const initialValue = {
  loading: false,
  error: false,
  playerList: [],
  errorMessage: ''
}
