import * as React from "react";
import {CounterState, DispatchActions} from "./Models";

interface Props {
    state: CounterState;
    actions: DispatchActions;
}

export default class Counter extends React.Component<Props, {}> {

    render() {
        const loading = (this.props.state.loadingCount === 0) ? <p></p> : <p>loading</p>;
        return (
            <div>
                {loading}
                <p>score: {this.props.state.num}</p>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={() => this.props.actions.increment(3)}>Increment 3</button>
                <button className="mdl-button mdl-js-button" onClick={() => this.props.actions.decrement(2)}>Decrement 2</button>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={() => this.props.actions.fetchAmount()}>async bonus 100</button>
            </div>
        )
    }
}