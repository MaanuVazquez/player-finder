// @flow
// $FlowIssue
import React, {StrictMode} from 'react'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom'
import App from './modules/Main/components/App'

const mountDevRoot = () => {
  const Redbox = require('redbox-react').default
  // $FlowIssue
  const AppContainer = require('react-hot-loader').AppContainer
  const HotRoot = require('./modules/Main/components/App').default
  const store = require('./store/store.dev.js').default()
  ReactDOM.render(
    <AppContainer errorReporter={Redbox}>
      <Provider store={store}>
        <HotRoot/>
      </Provider>
    </AppContainer>,
    window.document.getElementById('root')
  )
}

if (process.env.NODE_ENV === 'production') {
  const store = require('./store/store.prod.js').default()
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    window.document.getElementById('root')
  )
} else {
  mountDevRoot()
}

// $FlowIssue
if (module.hot) {
  module.hot.accept('./modules/Main/components/App', mountDevRoot)
}
