import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import List from './List';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-table/react-table.css";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

const Routing = () => {
    return (
        <Switch>
            <Route path="/" component={App} exact />
            <Route path="/list" component={List} exact />
        </Switch>
    )
}

ReactDOM.render(<Router><Routing /></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
