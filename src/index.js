import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import App from './components/App';
import Infos from './components/Infos';
import Code from './components/Code';




ReactDOM.render(
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={ Home } />

        <Route exact path="/infos" component={ Infos} />
        <Route exact path="/routes/:city/:punkt" component={ App } />
        <Route exact path="/code" component={ Code } />


    </Switch>
    </BrowserRouter>
, document.getElementById('root'));










