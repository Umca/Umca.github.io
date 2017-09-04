import React from 'react';
import ee from '../utils/ee';
import RadioButton from '../components/radio';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import '../../styles/sort.css';
import { withRouter } from 'react-router-dom';

const withRouting = component =>{
    return withRouter(
        class extends React.Component{
            render() {
                return <component {...this.props}/>;
            }
        
    })
}

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

    handleChange(type, history, e) {
        console.log(type, history.location, e)
        
        if(type == 'proper'){
            this.setState({
                sort_type: e.target.value.replace(" ", '_')
            }, () => {
                this.emitEvent();
                debugger;
                let path = '';
                if (history.location.search && history.location.search.indexOf('sort=updated') == -1) {
                    path += history.location.search + `&sort=updated&${this.state.sort_type}&order=${this.state.order}`;
                } else {
                    path += `?sort=updated&${this.state.sort_type}&order=${this.state.order}`;
                }
                console.log(path)
                history.push(path)
            })
        } else if (type == "order") {
            let order = e.value;
            this.setState({
                order: e.value
            }, () => {
                console.log(this.state.sort)
                this.state.sort_type && this.emitEvent();
                let path = '';
                debugger;
                if (history.location.search && history.location.search.indexOf('sort=updated') == -1) {
                    path += history.location.search + `&${this.state.sort_type}&order=${order}`;
                } else {
                    path += `?sort=updated&${this.state.sort_type}&order=${order}`;
                }
                this.state.sort_type && history.push(path)
            })
        }
    }
    showOrderCheckboxes() {
        return !!this.state.sort_type;
    }

    render() {
        
        const NameRadioWithRouter =  withRouter(({ history, ...props }) => {
            return (
                <RadioButton
                    val="name"
                    handleChange={this.handleChange.bind(this, 'proper', history)}
                    isChecked={this.state.sort_type === 'name'}
                    op='main-block'
                    name="sort_type"
                    label="name"
                />
            )
        })
        const StarsRadioWithRouter = withRouter(({ history, ...props }) => {
            return (
                <RadioButton
                    val="stargazers_count"
                    handleChange={this.handleChange.bind(this, 'proper', history)}
                    isChecked={this.state.sort_type === 'stargazers_count'}
                    op='main-block'
                    name="sort_type"
                    label="stars"
                />
            )
        })
        const CountRadioWithRouter = withRouter(({ history, ...props }) => {
            return (
                <RadioButton
                    val="open_issues_count"
                    handleChange={this.handleChange.bind(this, 'proper', history)}
                    isChecked={this.state.sort_type === 'open_issues_count'}
                    op='main-block'
                    name="sort_type"
                    label="open issues"
                />
            )
        })
        const UpdatedRadioWithRouter = withRouter(({ history, ...props }) => {
            return (
                <RadioButton
                    val="updated_at"
                    handleChange={this.handleChange.bind(this, 'proper', history)}
                    isChecked={this.state.sort_type === 'updated_at'}
                    op='main-block'
                    name="sort_type"
                    label="updated at"
                />
            )
        })
        const OrderRadioWithRouter = withRouter(({ history, ...props }) => {
            return (
                <Select
                    value={this.state.order}
                    onChange={this.handleChange.bind(this, 'order', history)}
                    options={[{ value: 'ASC', label: 'ASC', className: 'options-color' }, { value: 'DESC', label: 'DESC', className: 'options-color' }]}
                    className="select-width"
                />
            )
        })
        return(
            <div className="main-sortings">
                <ul className="sorts">
                    <li>
                        <NameRadioWithRouter  />
                    </li>
                    <li>
                        <StarsRadioWithRouter/>
                    </li>
                    <li>
                        <CountRadioWithRouter/>
                    </li>
                    <li>
                        <UpdatedRadioWithRouter/>
                    </li>
                </ul>
                <OrderRadioWithRouter/>
                
            </div>
        )
    }
}