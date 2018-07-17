// @flow
import {getAge, includes} from '../'

describe('Utils', () => {
  describe('getAge', () => {
    it('should return currentYear - birthYear if the date already passed', () => {
      const age = getAge('1970-1-1')
      expect(age).toEqual('48')
    })

    it('should return currentYear - birthYear + 1 if the person did not turn years', () => {
      const date = new Date()
      date.setFullYear(date.getFullYear() - 10)
      date.setTime(date.getTime() + 1000)
      const age = getAge(date.toISOString())
      expect(age).toEqual('9')
    })
  })

  describe('includes', () => {
    it('should return true if the first word contains the second one', () => {
      expect(includes('Hi', 'h')).toEqual(true)
    })

    it('should return false if the first word does not include the second one', () => {
      expect(includes('Bye', 'Goodbye')).toEqual(false)
    })

    it('should return true if the first word includes the second one but it is in other case', () => {
      expect(includes('HODOR', 'ho')).toEqual(true)
    })
  })
})
