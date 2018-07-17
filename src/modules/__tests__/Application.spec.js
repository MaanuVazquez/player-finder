// @flow
import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import fetchMock from 'fetch-mock'
import Main from '../Main'
import PlayerList from '../PlayerList'
import configure from '../../store/store.dev'
import {getAge} from '../../utils'

const App = Main.components.App
const DEFAULT_SUBMIT = {
  preventDefault: () => {}
}

const ITEMS = [
  {
    contractUntil: '2022-06-30',
    dateOfBirth: '1993-05-13',
    jerseyNumber: 9,
    name: 'Romelu Lukaku',
    nationality: 'Belgium',
    position: 'Centre-Forward'
  },
  {
    contractUntil: '2019-06-30',
    dateOfBirth: '1990-11-07',
    jerseyNumber: 1,
    name: 'David de Gea',
    nationality: 'Spain',
    position: 'Keeper'
  },
  {
    contractUntil: '2021-06-30',
    dateOfBirth: '1987-02-22',
    jerseyNumber: 20,
    name: 'Sergio Romero',
    nationality: 'Argentina',
    position: 'Keeper'
  },
  {
    contractUntil: '2020-06-30',
    dateOfBirth: '1994-04-12',
    jerseyNumber: 3,
    name: 'Eric Bailly',
    nationality: "Cote d'Ivoire",
    position: 'Centre-Back'
  },
  {
    contractUntil: '2019-06-30',
    dateOfBirth: '1989-11-22',
    jerseyNumber: 12,
    name: 'Chris Smalling',
    nationality: 'England',
    position: 'Centre-Back'
  },
  {
    contractUntil: '2019-06-30',
    dateOfBirth: '1990-03-20',
    jerseyNumber: 5,
    name: 'Marcos Rojo',
    nationality: 'Argentina',
    position: 'Centre-Back'
  }
]

describe('Integration test', () => {
  let wrapper
  let store
  beforeEach(() => {
    store = configure()

    fetchMock.getOnce(PlayerList.constants.API_URL, ITEMS)

    wrapper = mount(
      <Provider store={store}>
        <App/>
      </Provider>
    )
  })

  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  describe('rendering', () => {
    it('should render an App component', () => {
      expect(wrapper.exists()).toEqual(true)
    })

    it('should render a PlayerList component', () => {
      expect(wrapper.find('PlayerTable').exists()).toEqual(true)
    })

    it('should render a SearchForm component', () => {
      expect(wrapper.find('SearchForm').exists()).toEqual(true)
    })

    it('should get the items from the api', () => {
      const props = (store.getState(): any)
      expect(props[PlayerList.constants.NAME]).toEqual({...PlayerList.model.initialValue, playerList: ITEMS})
    })

    it('should render every player', () => {
      wrapper.update()
      wrapper
        .find('tbody')
        .find('tr')
        .forEach((node, i) => {
          expect(
            node
              .find('td')
              .first()
              .text()
          ).toEqual(ITEMS[i].name)
        })
    })
  })

  describe('filtering', () => {
    it('should filter correctly by name', () => {
      const searchForm = wrapper.find('SearchForm')
      const instance = searchForm.instance()
      instance.onNameChange('Sergio')
      instance.onFormSubmit(DEFAULT_SUBMIT)
      wrapper.update()
      expect(wrapper.find('tbody').find('tr')).toHaveLength(1)
      expect(
        wrapper
          .find('tbody')
          .find('tr')
          .find('td')
          .first()
          .text()
      ).toEqual('Sergio Romero')

      instance.onNameChange('Charizard')
      instance.onFormSubmit(DEFAULT_SUBMIT)
      wrapper.update()
      expect(wrapper.find('p').text()).toEqual('Nothing found with those filters!')
    })

    it('should filter correctly by age', () => {
      const searchForm = wrapper.find('SearchForm')
      const instance = searchForm.instance()
      instance.onAgeChange(getAge('1993-05-13'))
      instance.onFormSubmit(DEFAULT_SUBMIT)
      wrapper.update()
      expect(wrapper.find('tbody').find('tr')).toHaveLength(1)
      expect(
        wrapper
          .find('tbody')
          .find('tr')
          .find('td')
          .first()
          .text()
      ).toEqual('Romelu Lukaku')

      instance.onAgeChange('40')
      instance.onFormSubmit(DEFAULT_SUBMIT)
      wrapper.update()
      expect(wrapper.find('p').text()).toEqual('Nothing found with those filters!')
    })

    it('should filter correctly by position', () => {
      const searchForm = wrapper.find('SearchForm')
      const instance = searchForm.instance()
      instance.onPositionChange({target: {value: 'Centre-Forward'}})
      instance.onFormSubmit(DEFAULT_SUBMIT)
      wrapper.update()
      expect(wrapper.find('tbody').find('tr')).toHaveLength(1)
      expect(
        wrapper
          .find('tbody')
          .find('tr')
          .find('td')
          .first()
          .text()
      ).toEqual('Romelu Lukaku')

      instance.onPositionChange({target: {value: 'Pokemon'}})
      instance.onFormSubmit(DEFAULT_SUBMIT)
      wrapper.update()
      expect(wrapper.find('p').text()).toEqual('Nothing found with those filters!')
    })

    it('should work when combining filters', () => {
      const searchForm = wrapper.find('SearchForm')
      const instance = searchForm.instance()
      instance.onNameChange('David de Gea')
      instance.onAgeChange(getAge('1990-11-07'))
      instance.onPositionChange({target: {value: 'Keeper'}})
      instance.onFormSubmit(DEFAULT_SUBMIT)
      wrapper.update()
      expect(wrapper.find('tbody').find('tr')).toHaveLength(1)
      expect(
        wrapper
          .find('tbody')
          .find('tr')
          .find('td')
          .first()
          .text()
      ).toEqual('David de Gea')

      instance.onNameChange('Davis do Gea')
      instance.onAgeChange(getAge('1990-11-07'))
      instance.onPositionChange({target: {value: 'Keeper'}})
      instance.onFormSubmit(DEFAULT_SUBMIT)
      wrapper.update()
      expect(wrapper.find('p').text()).toEqual('Nothing found with those filters!')
    })
  })
})
