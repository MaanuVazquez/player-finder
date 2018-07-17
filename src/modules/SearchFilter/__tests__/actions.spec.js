// @flow
import * as actions from '../actions'
import * as types from '../actionTypes'

describe('SearchFilter actions', () => {
  it('should create an action to change the search filters', () => {
    const payload = {
      age: '30',
      position: 'Centre-Back',
      name: 'George'
    }
    const expectedAction = {
      type: types.SUBMIT_FILTER,
      payload
    }
    expect(actions.submitFilter('30', 'Centre-Back', 'George')).toEqual(expectedAction)
  })
})
