import * as React from 'react'
import { Switch } from 'react-router'
import {Link, Route} from 'react-router-dom'
import Counter from './counter/Container'
import NotFound from './NotFound'
import ImmutableSample from './ImmutableSample'
import ReactDNDSample from './dnd/Container'

export class Routes extends React.Component<{}, {}> {

  render() {
    return (
      <div>
        <h1>React Redux sample</h1>
        <li><Link to='/' >Home</Link></li>
        <li><Link to='/counter' >Counter</Link></li>
        <li><Link to='/counter/papaparam' >Counter with param</Link></li>
        <li><Link to='/immutable' >immutable</Link></li>
        <li><Link to='/dnd' >Drag and Drop</Link></li>
        <Switch>
          <Route exact path='/counter' component={Counter} />
          <Route path='/counter/:myParams' component={Counter} />
          <Route path='/immutable' component={ImmutableSample} />
          <Route path='/dnd' component={ReactDNDSample} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    )
  }
}