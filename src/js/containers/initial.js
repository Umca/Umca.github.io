import React, { Component } from 'react';
import request from '../utils/request';
import store from '../utils/store';
import Button from '../components/submit';
import RadioButton from '../components/radio';
import '../../styles/initial.css';
import '../../styles/parts.css';

class InitialComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            checked: store.extract('checked') ||"user",
            name: store.extract('name') || "",
            repos: null,
            errors: null
        }
    }
    
    handleRadioChanged(e){
        this.setState({
            checked: e.target.value
        })
    }
    handleInputChange(e){
        this.setState({
            name: e.target.value
        })
    }
    changeRoute(){
        this.props.history.push(`/${this.state.name}`);
    }

    checkForLocalStorage() {
        let storage = JSON.parse(localStorage.getItem('store'));
        if (storage && storage.name === this.state.name) {
            this.setState({
                repos: storage.repos
            })
            return true;
        } else {
            return false;
        }
    }

    handleSubmit(e){
        console.log('submit')
        e.preventDefault();
        //if (!this.checkForLocalStorage()) {
            this.url = `https://api.github.com/${this.state.checked}s/${this.state.name}/repos`;
            request
                .sendInit(this.url)
                .then(response => {
        
                    this.setState({
                        repos: response
                    }, () => {
                        this.saveDataToStore();
                        this.changeRoute();// WARNING setState on unmounted component !!
                    });
                    
                })
                .catch(err => {
                    console.error('err', err.message)
                    this.setState({
                        errors: err.message
                    }, () => {
                        this.saveDataToStore();
                        // show error message
                    });
                })
        //} else {
        //    this.changeRoute();
        //}
    }
    
    saveDataToStore(){
        for(let key in this.state){
            store.save(key, this.state[key])
        }
    }

    render() {
        return (
            <div className="initial-container">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input 
                        className="search-input"    
                        type="text" 
                        required
                        placeholder="Whom you want to find?"
                        aria-label="Search"     
                        value = {this.state.name}
                        onChange = {this.handleInputChange.bind(this)}
                        />
                    <div className='initial-radio-control'>
                        <RadioButton val={"user"}
                                    handleChange={this.handleRadioChanged.bind(this)}
                                    isChecked={this.state.checked === "user"}
                                    op='initial-block'
                                    name="type"
                            label="user"
                        />
                        <RadioButton val={"org"}
                                    handleChange={this.handleRadioChanged.bind(this)}
                                    isChecked={this.state.checked === "org"}
                                    op='initial-block'
                                    name="type"
                            label="org"
                        />
                    </div>    
                    <Button text="PRESS ME"/>
                </form>
            </div>
        )
    }
}

export default InitialComponent;