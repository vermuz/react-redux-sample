import * as React from "react";
import {CounterState, DispatchActions} from "./Models";
const firebase = require('firebase');

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

    firebaseCreateUser(){
        firebase.auth().createUserWithEmailAndPassword("jitabatata@gmail.com", "mypassword")
            .done().catch((error:any) => {
            // Handle Errors here.
            console.log(error.code);
            console.log(error.message);
        });
    }

    firebaseLogin(){

        firebase.auth().signInWithEmailAndPassword("jitabatata@gmail.com", "mypassword")
            .catch((error:any) => {
            // Handle Errors here.
            console.log(error.code);
            console.log(error.message);
        });
    }

    firebaseGoogleLogin(){
        var provider = new firebase.auth.GoogleAuthProvider();
        // provider.addScope('https://www.googleapis.com/auth/plus.login');

        firebase.auth().signInWithPopup(provider).then((result: any) => {
            console.log(result.user);
            console.log(result.credential.accessToken);
        }).catch((error:any) =>  {
            console.log(error.code);
            console.log(error.message);
            console.log(error.email);
            console.log(error.credential);
        });
    }

    firebaseFacebookLogin(){
        var provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(provider).then((result:any) => {
            console.log(result.user);
            console.log(result.credential.accessToken);
        }).catch((error:any) => {
            console.log(error);
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

    logout(){
        firebase.auth().signOut().then(() => {
            console.log("done");
        }, (error: any) => {
            console.log(error);
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
                <button onClick={() => this.firebaseCreateUser.bind(this)()}>firebase createUser</button>
                <button onClick={() => this.firebaseLogin.bind(this)()}>firebase login</button>
                <button onClick={() => this.firebaseGoogleLogin.bind(this)()}>firebase login G+</button>
                <button onClick={() => this.firebaseFacebookLogin.bind(this)()}>firebase login Facebook</button>
                <button onClick={() => this.getCurrentUser.bind(this)()}>firebase getUser</button>
                <button onClick={() => this.logout.bind(this)()}>logout</button>
            </div>
        )
    }
}
