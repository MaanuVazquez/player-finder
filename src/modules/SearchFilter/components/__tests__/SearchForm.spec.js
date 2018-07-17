// @flow
import React from 'react'
import {shallow, mount} from 'enzyme'
import ConnectedSearchForm, {SearchForm} from '../SearchForm'
import * as types from '../../actionTypes'
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore()

const SUBMIT_EVENT = {
  preventDefault: () => {}
}

describe('SearchForm', () => {
  let wrapper
  let submitFilter
  beforeEach(() => {
    submitFilter = jest.fn()
    wrapper = shallow(<SearchForm submitFilter={submitFilter}/>)
  })

  describe('rendering', () => {
    it('should render a SearchForm component', () => {
      expect(wrapper.exists()).toEqual(true)
    })

    it('should render an AgeInput component', () => {
      expect(wrapper.find('AgeInput').exists()).toEqual(true)
    })

    it('should render a NameInput component', () => {
      expect(wrapper.find('NameInput').exists()).toEqual(true)
    })
  })

  describe('callbacks', () => {
    it('should call the submitFilter callback when submiting the form', () => {
      wrapper.simulate('submit', SUBMIT_EVENT)
      expect(submitFilter).toBeCalled()
    })

    it('should call the submitFilter callback with the correct args', () => {
      wrapper.find('AgeInput').simulate('change', '19')
      wrapper.find('NameInput').simulate('change', 'Raul')
      wrapper.find('FormControl').simulate('change', {target: {value: 'Centre-Back'}})
      wrapper.simulate('submit', SUBMIT_EVENT)
      expect(submitFilter).toBeCalledWith('19', 'Centre-Back', 'Raul')
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call submitFilter', () => {
      const store = mockStore({})

      const connectedWrapper = mount(<ConnectedSearchForm store={store}/>)
      connectedWrapper.find('form').simulate('submit', SUBMIT_EVENT)
      expect(store.getActions()[0].type === types.SUBMIT_FILTER).toEqual(true)
    })
  })
})
