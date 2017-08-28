import React from 'react';
import store from '../utils/store';
import Filters from './filters';
import Sortings from './sortings';
import Cards from './cards';
import moment from 'moment';

window.moment = moment;

export default class Main extends React.Component{
    constructor(){
        super();
        this.state = {
            repos : store.data.repos ? store.data.repos : []
        }
    }
    componentWillMount(){
        if(localStorage.getItem('store')){
            this.setState({
                repos: JSON.parse(localStorage.getItem('store')).repos
            })
        }
    }
    render(){
        let locale = moment.locale();

        return(
            <div className='main-container'>
                <Filters repos = {this.state.repos}/>
                <Sortings />
                <Cards repos = {this.state.repos}/>   
            </div>
        )
    }
}
