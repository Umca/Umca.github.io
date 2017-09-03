import React from 'react';
import Card from '../components/card';

export default class Cards extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
                <div className="main-cards">
                    {
                        this.props.repos.map( repo => {
                            return <Card repo={repo} key={repo.id} />
                        })
                    }
                </div>  
        )
    }

}