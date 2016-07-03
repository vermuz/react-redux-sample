import React = require('react');
import {DispatchActions, ChatState} from "./Models";
import MessageList from "./MessageList";
import TextBox from "./TextBox";

interface Props {
    state: ChatState;
    actions: DispatchActions;
}

export default class ChatRoot extends React.Component<Props, {}> {

    componentDidMount(){
        this.props.actions.createWS("myName");
    }

    componentWillUnmount(){
        this.props.actions.closeWS(this.props.state.ws);
    }

    render() {
        const textBox = this.props.state.ws ? <TextBox actions={this.props.actions} ws={this.props.state.ws} /> : <p>WS connecting</p>
        return (
            <div>
                <h2>Chat</h2>
                {textBox}
                <MessageList messages={this.props.state.messages} />
            </div>
        )
    }
}