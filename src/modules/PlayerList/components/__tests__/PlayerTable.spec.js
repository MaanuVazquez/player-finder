// @flow
import React from 'react'
import {shallow, mount} from 'enzyme'
import ConnectedPlayerTable, {PlayerTable} from '../PlayerTable'
import configureMockStore from 'redux-mock-store'
import {NAME} from '../../constants'
import SearchFilter from '../../../SearchFilter'

const mockStore = configureMockStore()

describe('PlayerTable', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PlayerTable playerList={[]} loading={false} error={false} errorMessage=''/>)
  })

  describe('rendering', () => {
    it('should render a PlayerTable component', () => {
      expect(wrapper.exists()).toEqual(true)
    })

    it('should render an Icon with a paragraph indicating that is loading the players', () => {
      wrapper.setProps({loading: true})
      expect(
        wrapper
          .find('div')
          .find('FontAwesomeIcon')
          .exists()
      ).toEqual(true)
      expect(wrapper.find('p').text()).toEqual('Loading players...')
    })

    it('should render an Icon with a paragrath indicating that nothing was found', () => {
      expect(
        wrapper
          .find('div')
          .find('FontAwesomeIcon')
          .exists()
      ).toEqual(true)
      expect(wrapper.find('p').text()).toEqual('Nothing found with those filters!')
    })

    it('should render an Icon with a paragrath indicating that there was an error', () => {
      wrapper.setProps({error: true, errorMessage: 't3st3rr0r'})
      expect(
        wrapper
          .find('div')
          .find('FontAwesomeIcon')
          .exists()
      ).toEqual(true)
      expect(
        wrapper
          .find('p')
          .text()
          .includes('t3st3rr0r')
      ).toEqual(true)
    })

    it('should render a table when there are players on the playerList prop', () => {
      wrapper.setProps({
        playerList: [
          {
            contractUntil: '2019-06-30',
            dateOfBirth: '1990-03-20',
            jerseyNumber: 5,
            name: 'Marcos Rojo',
            nationality: 'Argentina',
            position: 'Centre-Back'
          }
        ]
      })
      expect(wrapper.find('Table').exists()).toEqual(true)
      expect(
        wrapper
          .find('td')
          .first()
          .text()
      ).toEqual('Marcos Rojo')
    })
  })

  describe('mapStateToProps', () => {
    it('should render a player from the store', () => {
      const store = mockStore({
        [NAME]: {
          playerList: [
            {
              contractUntil: '2022-06-30',
              dateOfBirth: '1993-05-13',
              jerseyNumber: 9,
              name: 'Romelu Lukaku',
              nationality: 'Belgium',
              position: 'Centre-Forward'
            }
          ],
          loading: false,
          error: false,
          errorMessage: ''
        },
        [SearchFilter.constants.NAME]: {
          age: '',
          position: '',
          name: ''
        }
      })

      const connectedWrapper = mount(<ConnectedPlayerTable store={store}/>)
      expect(store.getState().playerTable.playerList).toEqual(connectedWrapper.find('PlayerTable').props().playerList)
      expect(connectedWrapper.find('Table').exists()).toEqual(true)
      expect(
        connectedWrapper
          .find('td')
          .first()
          .text()
      ).toEqual('Romelu Lukaku')
    })
  })
})
