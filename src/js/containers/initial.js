import React, { Component } from 'react';
import request from '../utils/request';
import store from '../utils/store';
import SubmitButton from '../components/submit';
import RadioButton from '../components/radio';
import '../../styles/initial.css';

class InitialComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            checked: "user",
            name: "",
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

    handleSubmit(e){
        console.log('submit')
        e.preventDefault();
        this.url = `https://api.github.com/${this.state.checked}s/${this.state.name}/repos`;
        request
            .send(this.url)
            .then(response => {
    
                this.setState({
                    repos: response
                }, () => {
                    this.saveDataToStore();
                    this.changeRoute();   // WARNING setState on unmounted component !!
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
    }
    
    saveDataToStore(){
        for(let key in this.state){
            store.add(this.state[key], key)
        }
        store.save();
    }

    render() {
        return (
            <div className="initial-container">
                <form onSubmit = {this.handleSubmit.bind(this)}>
                    <input 
                        type="text" 
                        required
                        placeholder="Whom you want to find?"
                        value = {this.state.name}
                        onChange = {this.handleInputChange.bind(this)}
                        />
                    <div className='initial-radio-control'>
                        <RadioButton val={"user"}
                                    handleChange={this.handleRadioChanged.bind(this)}
                                    isChecked = {this.state.checked === "user"}
                        />
                        <RadioButton val={"org"}
                                    handleChange={this.handleRadioChanged.bind(this)}
                                    isChecked = {this.state.checked === "org"}
                        />
                    </div>    
                    <SubmitButton/>
                </form>
            </div>
        )
    }
}

export default InitialComponent;