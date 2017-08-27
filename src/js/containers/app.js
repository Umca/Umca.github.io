import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  InitialComponent  from './initial';
import Main from './main';

const  App = () => (
    <Router>
        <Switch>
        <Route exact path='/' component={InitialComponent} />
        <Route path='/:user' component={Main} /> 
        </Switch>   
    </Router>
);

export default App;