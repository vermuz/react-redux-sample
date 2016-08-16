import * as React from "react";
import {CounterState, DispatchActions} from "./Models";
import firebase = require('firebase');

interface Props {
    state: CounterState;
    actions: DispatchActions;
}

export default class Counter extends React.Component<Props, {}> {

    componentDidMount(){
        var config = {
            apiKey: "",
            authDomain: "",
            databaseURL: "",
            storageBucket: "",
        };
        const app = firebase.initializeApp(config);
    }

    firebaseLogin(){

        // firebase.auth().createUserWithEmailAndPassword("jitabatata@gmail.com", "mypassword")
        //     .done().catch((error:any) => {
        //     // Handle Errors here.
        //     console.log(error.code);
        //     console.log(error.message);
        // });

        firebase.auth().signInWithEmailAndPassword("jitabatata@gmail.com", "mypassword")
            .catch((error:any) => {
            // Handle Errors here.
            console.log(error.code);
            console.log(error.message);
        });
    }

    getCurrentUser(){
        firebase.auth().onAuthStateChanged((user:any) => {
            if (user) {
                console.log(user);
            } else {
                console.log("No user is signed in.");
            }
        });
    }

    render() {
        const loading = (this.props.state.loadingCount === 0) ? <p></p> : <p>loading</p>;
        return (
            <div>
                {loading}
                <p>score: {this.props.state.num}</p>
                <button onClick={() => this.props.actions.increment(3)}>Increment 3</button>
                <button onClick={() => this.props.actions.decrement(2)}>Decrement 2</button>
                <button onClick={() => this.props.actions.fetchAmount()}>async bonus 100</button>
                <button onClick={() => this.firebaseLogin.bind(this)()}>firebase login</button>
                <button onClick={() => this.getCurrentUser.bind(this)()}>firebase getUser</button>
            </div>
        )
    }
}
