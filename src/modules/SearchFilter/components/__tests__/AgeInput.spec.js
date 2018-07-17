// @flow
import React from 'react'
import {shallow} from 'enzyme'
import AgeInput from '../AgeInput'

describe('AgeInput', () => {
  let wrapper
  let onChange
  const MIN_AGE = '18'
  const MAX_AGE = '34'

  beforeEach(() => {
    onChange = jest.fn()
    wrapper = shallow(<AgeInput value='' minAge={MIN_AGE} maxAge={MAX_AGE} onChange={onChange}/>)
  })

  describe('rendering', () => {
    it('should render an AgeInput component', () => {
      expect(wrapper.exists()).toEqual(true)
    })
  })

  describe('callbacks', () => {
    it('should call the onChange callback when typing a number', () => {
      wrapper.simulate('change', {target: {value: '3'}})
      expect(onChange).toHaveBeenCalledWith('3')
    })

    it('should not call the onChange callback when not typing a number', () => {
      wrapper.simulate('change', {target: {value: 'aaaaa'}})
      expect(onChange).not.toHaveBeenCalled
    })

    it('should set to max when it has been exceeded', () => {
      wrapper.setProps({value: '50'})
      wrapper.simulate('blur')
      expect(onChange).toHaveBeenCalledWith(MAX_AGE)
    })

    it('should set to min when the age typed is lower than the min age', () => {
      wrapper.setProps({value: '1'})
      wrapper.simulate('blur')
      expect(onChange).toHaveBeenCalledWith(MIN_AGE)
    })

    it('should stay empty when blurring the input empty', () => {
      wrapper.setProps({value: ''})
      wrapper.simulate('blur')
      expect(onChange).not.toHaveBeenCalled
    })
  })
})
