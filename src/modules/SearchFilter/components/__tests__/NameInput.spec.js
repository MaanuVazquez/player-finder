// @flow
import React from 'react'
import {shallow} from 'enzyme'
import NameInput from '../NameInput'

describe('NameInput', () => {
  let wrapper
  let onChange

  beforeEach(() => {
    onChange = jest.fn()
    wrapper = shallow(<NameInput value='' onChange={onChange}/>)
  })

  describe('rendering', () => {
    it('should render a NameInput component', () => {
      expect(wrapper.exists()).toEqual(true)
    })
  })

  describe('callbacks', () => {
    it('should call the onChange callback when typing letters', () => {
      wrapper.simulate('change', {target: {value: 'Elliot'}})
      expect(onChange).toHaveBeenCalledWith('Elliot')
    })

    it('should not call the onChange callback when typing invalid characters', () => {
      wrapper.simulate('change', {target: {value: '1354@@@(*$%*&&#*'}})
      expect(onChange.called).not.toHaveBeenCalled
    })
  })
})
