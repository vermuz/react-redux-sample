import * as React from "react";
import {CounterState, DispatchActions} from "./Models";
var Button = require('react-bootstrap').Button;
var Panel = require('react-bootstrap').Panel;

interface Props {
    value: CounterState;
    actions: DispatchActions;
}

export default class BootSample extends React.Component<Props, {}> {

    render() {
        return (
            <Panel>
                <p>score: {this.props.value.num}</p>
                <Button onClick={() => this.props.actions.increment(3)}>Increment 3</Button>
                <Button onClick={() => this.props.actions.decrement(2)}>Decrement 2</Button>
                <Button
                    onClick={() => this.props.actions.fetchAmount()}
                    bsStyle="primary"
                    bsSize="large"
                    children="async bonus 100"
                />
            </Panel>
        )
    }
}