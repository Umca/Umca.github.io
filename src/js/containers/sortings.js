import React from 'react';
import ee from '../utils/ee';
import RadioButton from '../components/radio';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import '../../styles/sort.css';
import { withRouter } from 'react-router-dom';

// const withRouting = (component) =>{
//     class extends React.Component{
//         return(
//             withRouter(({history, ...props}) => (
//                 component
//             ))
//         )
//     }
// }

export default class Sortings extends React.Component{
    constructor(){
        super();
        this.state = {
            sort_type: false,
            order: 'ASC'
        }
    }

    emitEvent() {
        ee.emit('apply_sorting', this.state);
    }

    handleChange(type, e) {

        if(type == 'proper'){
            this.setState({
                sort_type: e.target.value.replace(" ", '_')
            }, () => {
                this.emitEvent();
            })
        } else if (type == "order") {
            this.setState({
                order: e.value
            }, () => {
                this.emitEvent();
            })
        }
    }
    showOrderCheckboxes() {
        return !!this.state.sort_type;
    }

    render(){
        return(
            <div className="main-sortings">
                <ul className="sorts">
                    <li>
                        <RadioButton
                            val="name"
                            handleChange={this.handleChange.bind(this, 'proper')}
                            isChecked={this.state.sort_type === 'name'}
                            op='main-block'
                            name="sort_type"
                            label="name"
                        />
                    </li>
                    <li>
                        <RadioButton
                            val="stargazers_count"
                            handleChange={this.handleChange.bind(this, 'proper')}
                            isChecked={this.state.sort_type === 'stargazers_count'}
                            op='main-block'
                            name="sort_type"
                            label="stars"
                        />
                    </li>
                    <li>
                        <RadioButton
                            val="open_issues_count"
                            handleChange={this.handleChange.bind(this, 'proper')}
                            isChecked={this.state.sort_type === 'open_issues_count'}
                            op='main-block'
                            name="sort_type"
                            label="open issues"
                        />
                    </li>
                    <li>
                        <RadioButton
                            val="updated_at"
                            handleChange={this.handleChange.bind(this, 'proper')}
                            isChecked={this.state.sort_type === 'updated_at'}
                            op='main-block'
                            name="sort_type"
                            label="updated at"
                        />
                    </li>
                </ul>
                <Select
                    value={this.state.order}
                    onChange={this.handleChange.bind(this, 'order')}
                    options={[{ value: 'ASC', label: 'ASC', className: 'options-color' }, { value: 'DESC', label: 'DESC', className: 'options-color' }]}
                    className="select-width"
                />
                
            </div>
        )
    }
}