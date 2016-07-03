import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, browserHistory} from "react-router";
import Root from "./Root";
import NotFound from "./NotFound";
import chatRoot from "./chat/Root";
import todoRoot from "./todo/Root";
import counterRoot from "./counter/Root";
import {Provider} from "react-redux";
import store from "./Store";
import {Paths} from "./Models";

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={Root} >
                <Route path={Paths.TODO} component={todoRoot} />
                <Route path={Paths.CHAT} component={chatRoot} />
                <Route path={Paths.COUNTER} component={counterRoot} />
                <Route path="*" component={NotFound} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
