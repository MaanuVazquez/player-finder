// @flow
import {createSelector} from 'reselect'
import SearchFilter from '../SearchFilter'
import {NAME} from './constants'
import {includes, getAge} from '../../utils'

const ageSelector = state => state[SearchFilter.constants.NAME].age
const positionSelector = state => state[SearchFilter.constants.NAME].position
const nameSelector = state => state[SearchFilter.constants.NAME].name
const playersSelector = state => state[NAME].playerList

export const playerSelector = createSelector(
  ageSelector,
  positionSelector,
  nameSelector,
  playersSelector,
  (age, position, name, players) =>
    players.filter(
      player =>
        includes(player.name, name) &&
        (!position || player.position === position) &&
        (!age || age === getAge(player.dateOfBirth))
    )
)
