import 'core-js'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import Counter from './counter/Root'
import store from './Store'

ReactDOM.render(
  (
    <Provider store={store}>
      <Counter />
    </Provider>
  ),
  document.getElementById('app')
)
