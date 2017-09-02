import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import ee from '../utils/ee';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import RadioButton from '../components/radio';
import Checkbox from '../components/checkbox';
import '../../styles/filter.css';
import '../../styles/parts.css';


console.log(ee)

class Filters extends React.Component{
    constructor(props){
        super(props);
        this.state = {
                open_issues_count: false,
                topics: false,
                stars: undefined,
                updated_at:null,
                type: 'all',
                language:"",
        };
        this.cleanState = {
            open_issues_count: false,
            topics: false,
            stars: undefined,
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
        console.log( field, e.value)
        if (e.target){
            if(e.target.type == 'checkbox'){
                this.setState({
                    [field]: !this.state[field],
                })
            } else if(e.target.type == 'radio'){
                this.setState({
                    type: field,
                })
            } else if (e.target.type == 'number') {
                this.setState({
                    stars: e.target.value
                })
            }
        } else {
            this.setState({
                [field]: e.value,
            })
        }
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
                    <Checkbox
                        onChange={this.handleChange.bind(this, 'open_issues_count')}
                        checked={this.state.open_issues_count}
                        label="has open issues"
                    />  
                    <Checkbox
                        onChange={this.handleChange.bind(this, 'topics')}
                        checked={this.state.topics}
                        label="has open topics"
                    />  
                
                <div className="main-filter-stars">
                     <label>
                        starred >=
                    <input
                       
                    className="search-input filter-input "        
                    type='number'
                    onChange={this.handleChange.bind(this, 'stars')}
                    value={this.state.stars} /> times
                    </label>        
                </div>
                <div>
                    updated after
                    <div className="datepicker-wrapper">    
                    <DatePicker
                        selected={this.state.updated_at}        
                            placeholderText="..."
                            dateFormat="DD/MM/YYYY"   
                            className="search-input filter-input zIndex"
                        onChange={this.handleDateChange.bind(this)}
                    />
                    </div>        
                </div>
                <div className="type-block">
                    <ul className="filters">
                            <li>
                                <RadioButton
                                    val="all"
                                    handleChange={this.handleChange.bind(this, 'all')}
                                    isChecked={this.state.type === 'all'}
                                    op="main-block"
                                    label="all"
                                    feature={true}
                                />
                            </li>  
                            <li>
                                <RadioButton
                                    val="fork"
                                    handleChange={this.handleChange.bind(this, 'fork')}
                                    isChecked={this.state.type === 'fork'}
                                    op="main-block"
                                    label="forks"
                                    feature={true}
                                />
                            </li>
                            <li>
                                <RadioButton
                                    val="sources"
                                    handleChange={this.handleChange.bind(this, 'source')}
                                    isChecked={this.state.type === 'source'}
                                    op="main-block"
                                    label="sources"
                                    feature={true}
                                />
                            </li>
                    </ul>
                </div>
                <Select
                        value={this.state.language}
                        onChange={this.handleChange.bind(this, 'language')}
                        options={this.options}
                        className="filter-select"
                        placeholder="language"
                />
                <div className="filter-apply">    
                        <button>Apply</button>
              </div>          
              </form>
            </div>
        )
    }
}

export default withRouter(Filters);