import React, { Component } from 'react';
import request from '../utils/request';
import store from '../utils/store';
import SubmitButton from '../components/submit';
import RadioButton from '../components/radio';

class InitialComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            checked: "user",
            data: "",
            response: null,
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
            data: e.target.value
        })
    }
    changeRoute(){
        this.props.history.push(`/${this.state.data}`);
    }
    handleSubmit(e){
        e.preventDefault();
        this.url = `https://api.github.com/${this.state.checked}s/${this.state.data}`;
        request
            .send(this.url)
            .then(response => {
                this.setState({
                    response
                });
                this.saveDataToStore();
                this.changeRoute();
            })
            .catch(err => {
                this.setState({
                    errors : err
                });
                this.saveDataToStore();
            })
    }
    

    saveDataToStore(){
        for(let key in this.state){
            store.add(this.state[key], key)
        }
    }

    render() {
        return (
            <div className="container">
                <form onSubmit = {this.handleSubmit.bind(this)}>
                    <input 
                        type="text" 
                        required
                        placeholder="Whom you want to find?"
                        value = {this.state.data}
                        onChange = {this.handleInputChange.bind(this)}
                        />
                    <div>
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