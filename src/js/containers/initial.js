import React, { Component } from 'react';

class InitialComponent extends Component{
    changeRoute(){
        this.props.history.push(`/${this.state.data}`);
    }
    render() {
        return (
            <div className="container">
                <input type="text" placeholder="Whom you want to find?" />
                <div>
                    <label>
                        <input type='checkbox' />
                        <p>user</p>
                    </label>
                    <label>
                        <input type='checkbox' />
                        <p>organisation</p>
                    </label>
                </div>    
                <button>Press me</button>
            </div>
        )
    }
}

export default InitialComponent;