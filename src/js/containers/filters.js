import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import ee from '../utils/ee';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


console.log(ee)

class Filters extends React.Component{
    constructor(props){
        super(props);
        this.state = {
                open_issues_count: false,
                topics: false,
                stars: "",
                updated_at:null,
                type: 'all',
                language:"",
        };
        this.cleanState = {
            open_issues_count: false,
            topics: false,
            stars: "",
            updated_at: null,
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
        //this.languages.unshift(null)

        this.options = this.languages.map(lang => {
            return {value:lang, label:lang}
        })
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
    
        if (e.target){
            if(e.target.type == 'checkbox'){
                this.setState({
                    [field]: !this.state[field],
                })
            } else if(e.target.type == 'radio'){
                this.setState({
                    type: field,
                })
            } 
        } else {
            this.setState({
                [field]: e.value,
            })
        }
    } 

    handleSelect(field, e) {
        console.log(field, e)
    }

    // submit
    handleSubmit(e) {
        this.condition = {};
        e.preventDefault();
        this.getFilterCondition();
        //this.changeRoute();
        //this.setState(this.cleanState);
        ee.emit('apply_filters', this.condition);
    }

    changeRoute(){
        let path = `${this.props.history.location.pathname}?sort=updated`;
        for(let key in this.condition){
            path += `&${key}=${this.condition[key]}`
        }
        this.props.history.push(path)
    }

    // receive num of filters to apply
    getFilterCondition() {
        console.log('state', this.state)
        console.log('condition, this.condition')
        for (let key in this.state) {
            if (!!this.state[key] !== false ){
                    this.condition[key] = this.state[key]
                }
            }
    }
    
    

    render() {
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
                            placeholderText="Click to select a date"
                            dateFormat="DD/MM/YYYY"   
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
                <Select
                        value={this.state.language}
                        onChange={this.handleChange.bind(this, 'language')}
                        options={this.options}
                />      
              <button>Apply</button>
              </form>
            </div>
        )
    }
}

export default withRouter(Filters);