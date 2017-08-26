import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import  InitialComponent  from './initial';

const  App = () => (
    <Router>
        <Route path='/' component={InitialComponent} />    
    </Router>
);

export default App;