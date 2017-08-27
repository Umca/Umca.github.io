import React from 'react';
import store from '../utils/store';
import Filters from './filters';
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
                
                <div className="main-sortings">sortings</div>
                <div className="main-cards">
                    {
                        this.state.repos.map( repo => {
                            return (
                                <div key={repo.id} className="main-card">
                                    <p>Name {repo.name}</p>
                                    <p>Description {repo.description}</p>
                                    <p>Is fork {repo.fork}</p>
                                    <p>Stars {repo.stargazers_count}</p>
                                    <p>Last update {moment(repo.updated_at).format('lll')}</p>
                                    <p>Language {repo.language}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
