import * as React from 'react'
import {RouteComponentProps} from 'react-router'
import {List} from 'immutable'

export default class ImmutableSample extends React.Component<RouteComponentProps<any>, {}> {

  render() {
    const list = List.of(1,2,3,4,5,6)
    const filtered = list.filter(i => (i % 2) === 0)
    console.log(filtered.toArray())
    return (
      <div>
        Not Found
      </div>
    )
  }
}