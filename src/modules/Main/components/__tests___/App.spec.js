// @flow
import React from 'react'
import {App} from '../App'
import {shallow} from 'enzyme'

describe('App', () => {
  let wrapper
  const playerListFetch = jest.fn()
  beforeEach(() => {
    wrapper = shallow(<App playerListFetch={playerListFetch}/>)
  })

  afterEach(() => {
    playerListFetch.mockClear()
  })

  describe('rendering', () => {
    it('should render an App component', () => {
      expect(wrapper.exists()).toEqual(true)
    })
  })

  describe('callbacks', () => {
    it('should call playerListFetch on componentDidMount', () => {
      expect(playerListFetch).toBeCalled()
    })
  })
})
