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
        this.updateState(this.parseUrl(this.props.history));
    }

    componentWillReceiveProps(nextProps){
        if(this.props === nextProps){
            return;
        }
    }

    parseUrl(str){
        let query = str.split('?')[1].split('&').slice(1);
        let obj ={};
        let values = query.map( str => {
            return str.split('=')
        })
        values.forEach((arr) => {
            obj[arr[0]] = arr[1]
        })
        return obj;
    }

    updateState(obj){
        for(let key in obj){
            this.setState({
                [key]: obj[key]
            })
        }
    }

    // receive languages for <select>
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
        store.save('languages', this.languages);
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
        debugger;
        this.condition = {};
        e.preventDefault();
        this.getFilterCondition();
        ee.emit('apply_filters', this.condition);
    }

    getProps(){
        this.condition = {};
        this.getFilterCondition();
        return this.condition;
    }


    // receive num of filters to apply
    getFilterCondition() {
        for (let key in this.state) {
            if (!!this.state[key] !== false ){
                    this.condition[key] = this.state[key]
                }
            }
    }
    parseUrl

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
                         <Button p={this.getProps()}/>
              </form>
            </div>
        )
    }
}

export default Filters;

const Button = withRouter(({ history, ...props}) => {

    let path = `?sort=updated`;
    for (let key in props.p) {
        path += `&${key}=${props.p[key]}`
    }

    return (
    <button
    className="filter-apply"
    type='submit'
    onClick={() => { history.push(path) }}
  >
    Apply
  </button>
  )})

//   <div className="filter-apply">    
//   <button>Apply</button>
// </div> 