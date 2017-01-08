import * as React from 'react'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {Counter} from './Counter'
import {ActionDispatcher} from './module'

export default connect(
  (store: any) => ({value: store.counter}),
  (dispatch: Dispatch<any>) => ({actions: new ActionDispatcher(dispatch)})
)(Counter)
