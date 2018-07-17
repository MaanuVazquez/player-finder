// @flow
import {playerSelector} from '../selectors'
import {getAge} from '../../../utils'
import SearchFilter from '../../SearchFilter'
import {NAME} from '../constants'

const PLAYER_LIST = [
  {
    contractUntil: '2019-06-30',
    dateOfBirth: '1990-03-20',
    jerseyNumber: 5,
    name: 'Marcos Rojo',
    nationality: 'Argentina',
    position: 'Centre-Back'
  },
  {
    contractUntil: '2019-06-30',
    dateOfBirth: '1992-02-21',
    jerseyNumber: 4,
    name: 'Phil Jones',
    nationality: 'England',
    position: 'Centre-Back'
  },
  {
    contractUntil: '2019-06-30',
    dateOfBirth: '1990-03-09',
    jerseyNumber: 17,
    name: 'Daley Blind',
    nationality: 'Netherlands',
    position: 'Left-Back'
  }
]

describe('PlayerList selectors', () => {
  it('should not be recomputed when called 2 times', () => {
    const state = {
      [SearchFilter.constants.NAME]: {
        age: getAge('1990-03-20'),
        position: 'Centre-Back',
        name: 'Marcos'
      },
      [NAME]: {
        playerList: PLAYER_LIST
      }
    }

    const expectedResult = [
      {
        contractUntil: '2019-06-30',
        dateOfBirth: '1990-03-20',
        jerseyNumber: 5,
        name: 'Marcos Rojo',
        nationality: 'Argentina',
        position: 'Centre-Back'
      }
    ]

    expect(playerSelector(state)).toEqual(expectedResult)
    expect(playerSelector(state)).toEqual(expectedResult)
    expect(playerSelector(state)).toEqual(expectedResult)
    expect(playerSelector.recomputations()).toEqual(1)
  })
})
