// @flow
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../rootReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore() {
  const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)))

  // $FlowIssue
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../rootReducer.js', () => {
      store.replaceReducer(reducers)
    })
  }

  return store
}
