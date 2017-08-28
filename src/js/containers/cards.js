import React from 'react';

export default class Cards extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="main-cards">
            {
                this.props.repos.map( repo => {
                    return (
                        <div key={repo.id} className="main-card">
                            <p>Name {repo.name}</p>
                            <p>Description {repo.description}</p>
                            <p>Is fork {repo.fork}</p>
                            <p>Stars {repo.stargazers_count}</p>
                            <p>Last update {moment(repo.updated_at).format('lll')}</p>
                            <p>Language {repo.language}</p>
                        </div>
                    )
                })
            }
        </div>
        )
    }

}