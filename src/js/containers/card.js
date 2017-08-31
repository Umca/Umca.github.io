import React from 'react';
import moment from 'moment';

const Card = (props) => {
        return (
            <div className="main-card" onClick={props.openModal} data-id={props.repo.id}>
                    <p>Name {props.repo.name}</p>
                    <p>Description {props.repo.description}</p>
                    <p>Is fork {props.repo.fork}</p>
                    <p>Stars {props.repo.stargazers_count}</p>
                    <p>Last update {moment(props.repo.updated_at).format('lll')}</p>
                    <p>Language {props.repo.language}</p>
            </div>   
        )
}

export default Card;