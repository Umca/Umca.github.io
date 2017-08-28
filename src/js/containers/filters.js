import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {withRouter} from 'react-router-dom';


class Filters extends React.Component{
    constructor(props){
        super(props);
        this.state = {
                open_issues_count: false,
                topics: false,
                stars: "",
                updated_at: moment(),
                type: 'all',
                language:"",
        };
        this.cleanState = {
            open_issues_count: false,
            topics: false,
            stars: "",
            updated_at: moment(),
            type: 'all',
            language:"",
        };
        this.languages = [];
        this.fns= [];
        this.condition = {};
        this.repos = this.props.repos
        
    }
    componentWillMount(){
        this.getLanguages();
        this.configureFilterFns();
    }
    //get fn to  apply them on every repo when filtering
    configureFilterFns(){
        for (let key in this.state){
            if(key == 'language'){
                this.fns.push(
                    {
                        name: key,
                        fn: function(repo){
                            return repo[key] == this.state[key]
                        }
                    }
                )
            } else {
                if (key === 'stars'){
                    this.fns.push(
                        {
                            name: key,
                            fn: function(repo){
                                return repo.stargazers_count >= this.state.stars 
                            }
                        }
                    )
                } else if(key == 'open_issues_count'){
                    this.fns.push({
                        name: key,
                        fn: function (repo){
                            return repo.open_issues_count > 0
                        }
                    })
                } 
                else if(key == 'topics'){
                    this.fns.push({
                        name: key,
                        fn: function (repo){
                            return repo.topics.length > 0
                        }
                    })
                } else if(key == 'type'){
                    this.fns.push({
                        name: key,
                        fn: function (repo){
                            if(this.state.type == 'All'){
                                return true;
                            } else {
                                return repo[this.state.type]
                            }
                        }
                    })
                }else{
                    this.fns.push(
                        {
                            name: key,
                            fn: function(repo){
                                return moment(repo.updated_at) > this.state.updated_at 
                            }
                        }
                    )
                    
                }
            }
        }
    }

    // receive langauges for <select>
    getLanguages(){
 
        function getUniqueValues(arr){
            var obj = {};
            
              for (let i = 0; i < arr.length; i++) {
                let str = arr[i];
                obj[str] = true; 
              }
            
              return Object.keys(obj); 
        }

        this.languages = getUniqueValues(this.props.repos.map(repo => repo.language)).filter( lang => lang !== "null")
        this.languages.unshift(null)
        store.add(this.languages, 'languages');
    }

    // handle change event on datepicker
    handleDateChange(date) {
        this.setState({
            updated_at: date,
        });
        
    }

    // handle change event on other filter inputs
    handleChange (field, e) {
        var nextState = {}
        // nextState[field] = e.target.value
        // console.log(nextState)
        // this.setState(nextState)
        console.log(e.target, field)

            if(e.target.type == 'checkbox'){
                this.setState({
                    [field]: !this.state[field],
                })
            } else if(e.target.type == 'radio'){
                this.setState({
                    type: field,
                })
            } else{
                this.setState({
                    [field]: e.target.value 
                })
            }
    } 

    // submit
    handleSubmit(e){
        e.preventDefault();
        console.info('filters applied');
        this.getFilterCondition();
        //store.add(this.state, 'filters') not sure of needed
        this.filter();
        this.changeRoute();
        this.setState(this.cleanState);
    }

    changeRoute(){
        let path = `${this.props.history.location.pathname}?sort=updated`;
        for(let key in this.condition){
            path += `&${key}=${this.condition[key]}`
        }
        this.props.history.push(path)
    }

    // receive num of filters to apply
    getFilterCondition(){
        for (let key in this.state ){
                if(!!this.state[key]){
                    this.condition[key] = this.state[key]
                }
            }
        console.log('condition', this.condition)
        store.add(this.condition, 'filtercondition');
    }
    
    // get proper filter fns
    getProperConditionFns(){
        return this.fns.filter( item => Object.keys(this.condition).indexOf(item.name) !== -1)
    }

    filter(){
        let fns = this.getProperConditionFns();

        return this.props.repos.filter(repo => {
             
            let filterTests = [];
            for(let i = 0 ; i < fns.length; i++){
                let res = fns[i].fn.call(this, repo)
                filterTests.push(res);
            }

            return filterTests.indexOf(false) !== -1;
        })
    }

    render(){
        return(
            <div className="main-filters">
                <form onSubmit={this.handleSubmit.bind(this)}>
                <div>
                    <label>
                        Has open issues <input
                        type ='checkbox' 
                        onChange={this.handleChange.bind(this, 'open_issues_count')}
                        checked = {this.state.open_issues_count}
                        /> 
                    </label>
                </div>
                <div>
                    <label>
                        Has open topics <input 
                        type ='checkbox'
                        onChange={this.handleChange.bind(this, 'topics')}
                        checked = {this.state.topics}
                        /> 
                    </label>
                </div>
                <div>
                    Starred >= <input
                    type='number'
                    onChange={this.handleChange.bind(this, 'stars')}
                    value={this.state.stars}/> times
                </div>
                <div>
                    Updated after 
                    <DatePicker
                        selected={this.state.updated_at}
                        onChange={this.handleDateChange.bind(this)}
                    />
                </div>
                <div>
                    Type :
                    <ul>
                        <li><label><input type="radio" 
                        name="type"
                        value="all" 
                        checked={this.state.type === 'all'}
                        onChange={this.handleChange.bind(this, 'all')}/> All</label></li>
                        <li><label><input type="radio" 
                        name="type" 
                        value="fork"
                        checked={this.state.type === 'fork'}
                        onChange={this.handleChange.bind(this, 'fork')}/> Forks</label></li>
                        <li><label><input type="radio" 
                        name="type" 
                        checked={this.state.type === 'source'}
                        value="source" 
                        onChange={this.handleChange.bind(this, 'source')}/> Sources</label></li>
                    </ul>
                </div>
                <select value={this.state.language} onChange={this.handleChange.bind(this, 'language')}>
                    {this.languages.map(lang => {
                        return <option value = {lang} key={lang} >{lang}</option>
                    })}
                    
              </select>
              <button>Apply</button>
              </form>
            </div>
        )
    }
}

export default withRouter(Filters);