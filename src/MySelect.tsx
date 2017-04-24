import * as React from 'react';

export interface Props {
  content: string;
}

export interface State {
  selectedValue: string;
  domID: string;
}

export default class MySelect extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      selectedValue: '',
      domID: Math.random().toString(36).slice(-8)
    }
  }

  componentDidUpdate(){
    console.log('componentDidUpdate')
    $('#' + this.state.domID).select2();
  }

  componentDidMount(){
    console.log('componentDidMount')
    $('#' + this.state.domID).select2();
  }

  render() {
    console.log('render')
    return (
      <select id={this.state.domID}>
        <option value="AL">Alabama</option>
        <option value="WY">Wyoming</option>
      </select>
    )
  }
}