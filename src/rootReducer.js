// @flow
import {combineReducers} from 'redux'
import PlayerList from './modules/PlayerList'
import SearchFilter from './modules/SearchFilter'

const rootReducer = combineReducers({
  [PlayerList.constants.NAME]: PlayerList.reducer,
  [SearchFilter.constants.NAME]: SearchFilter.reducer
})

export default rootReducer
