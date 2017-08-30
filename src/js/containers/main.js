import React from 'react';
import store from '../utils/store';
import Filters from './filters';
import Sortings from './sortings';
import Cards from './cards';
import moment from 'moment';
import ee from '../utils/ee';
import filter from '../utils/filter';
import sorting from '../utils/sort';

window.moment = moment;

export default class Main extends React.Component{
    constructor(){
        super();
        this.repos = JSON.parse(localStorage.getItem('store')) ? JSON.parse(localStorage.getItem('store')) .repos : []
        this.state = {
            filtered: this.repos
        }
        this.types = {
            name: 'string',
            stargazers_count: 'number',
            open_issues_count: 'number',
            updated_at: 'date'
        }
        this.addEeListener();
    }
    componentWillMount(){
        if(localStorage.getItem('store')){
            this.setState({
                repos: JSON.parse(localStorage.getItem('store')).repos
            })
        }
    }
    addEeListener() {
        ee.on('apply_filters', (obj)=>{
            filter.configureFilterFns(obj);
            let filtered = filter.filter(this.repos, obj);
            this.setState({
                filtered
            })
        })

        ee.on('apply_sorting', obj => {
            let { sort_type, order } = obj;
            let sorted = sorting.sort(this.state.filtered, sort_type, this.types[sort_type], order);
            this.setState({
                filtered: sorted
            })
        })
    }
    render(){
        let locale = moment.locale();

        return(
            <div className='main-container'>
                <Filters repos = {this.state.repos}/>
                <Sortings />
                <Cards repos={this.state.filtered} />
            </div>
        )
    }
}
