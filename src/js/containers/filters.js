import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

export default class Filters extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filters: {
                has_open_issues: false,
                has_topics: false,
                stars: false,
                updated_after: false,
                type: {
                    all: false,
                    forks: false,
                    source: false
                },
                language:false
            },
            currentDate : moment()
        };
        this.languages = [];
    }
    componentWillMount(){
        this.getLanguages();
    }

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
        store.add(this.languages, 'languages');
    }

    handleDateChange(date) {
        this.setState({
          currentDate: date
        });
      }

    filter(prop){
        return this.props.repos.filter( repo => {
            return repo[property] == true;
        })
    }

    render(){
        return(
            <div className="main-filters">
                <div>
                    <label>
                        Has open issues <input type ='checkbox' /> 
                    </label>
                </div>
                <div>
                    <label>
                        Has open topics <input type ='checkbox' /> 
                    </label>
                </div>
                <div>
                    Starred >= <input type='number'/> times
                </div>
                <div>
                    Updated after 
                    <DatePicker
                        selected={this.state.currentDate}
                        onChange={this.handleDateChange.bind(this)}
                    />
                </div>
                <div>
                    Type :
                    <ul>
                        <li><label><input type="radio" name="type" value="all" /> All</label></li>
                        <li><label><input type="radio" name="type" value="fork" /> Forks</label></li>
                        <li><label><input type="radio" name="type" value="source" /> Sources</label></li>
                    </ul>
                </div>
                <select value={this.languages[0]} onChange={this.handleChange}>
                    {this.languages.map(lang => {
                        return <option value = "lang" key="lang">{lang}</option>
                    })}
                    
              </select>
            </div>
        )
    }
}