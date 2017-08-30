import React from 'react';
import ee from '../utils/ee';

export default class Sortings extends React.Component{
    constructor(){
        super();
        this.state = {
            sort_type: false,
            order: 'asc'
        }
    }

    emitEvent() {
        ee.emit('apply_sorting', this.state);
    }

    handleChange(type, e) {
        if(type == 'proper'){
            this.setState({
                sort_type: e.target.value
            }, () => {
                this.emitEvent();
            })
        } else {
            this.setState({
                order: e.target.value
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
                <ul>
                    <li><label><input type="radio"
                        name="sort_type"
                        value="name"
                        checked={this.state.sort_type === 'name'}
                        onChange={this.handleChange.bind(this, 'proper')} /> Repo name</label></li>
                    <li><label><input type="radio"
                        name="sort_type"
                        value="stargazers_count"
                        checked={this.state.sort_type === 'stargazers_count'}
                        onChange={this.handleChange.bind(this, 'proper')} /> Stars</label></li>
                    <li><label><input type="radio"
                        name="sort_type"
                        checked={this.state.sort_type === 'open_issues_count'}
                        value="open_issues_count"
                        onChange={this.handleChange.bind(this, 'proper')} /> Open issues</label></li>
                    <li><label><input type="radio"
                        name="sort_type"
                        checked={this.state.sort_type === 'updated_at'}
                        value="updated_at"
                        onChange={this.handleChange.bind(this, 'proper')} /> Updated at</label></li>
                </ul>
                <ul className={ (this.showOrderCheckboxes() ? 'visible' : 'invisible')} >
                    <li><label><input type="checkbox"
                        name="order"
                        checked={this.state.order === 'asc'}
                        value="asc"
                        onChange={this.handleChange.bind(this, 'order')} /> ASC</label></li>
                    <li><label><input type="checkbox"
                        name="order"
                        checked={this.state.order === 'desc'}
                        value="desc"
                        onChange={this.handleChange.bind(this, 'order')} /> DESC</label></li>
                </ul>
            </div>
        )
    }
}