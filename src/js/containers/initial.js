import React, { Component } from 'react';

class InitialComponent extends Component{
    changeRoute(){
        this.props.history.push(`/${this.state.data}`);
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