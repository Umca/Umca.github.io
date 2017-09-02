import React from 'react';
import moment from 'moment';
import '../../styles/card.css'

class Card extends React.Component {
        constructor(props){
                super(props);
        }
        render(){
                return (
                        <div className="main-card" onClick={this.props.openModal} data-id={this.props.repo.id}>
                                <h1 className="card-title">{this.props.repo.name}</h1>
                                <p className="card-description">Description : {this.props.repo.description}</p>
                                <p className="card-fork-star">
                                {
                                        this.props.repo.fork ?
                                                <span><img alt="isForked" src="./assets/fork.png" /></span> :
                                                null
                                }
                                <span> {this.props.repo.stargazers_count} <img alt="stars count" src="./assets/star.png" /></span>
                                </p>        
                                <p className="card-date"><i className="fa fa-calendar" aria-hidden="true"></i> {moment(this.props.repo.updated_at).format('lll')}</p>
                                <p className="card-language"><span>{this.props.repo.language}</span></p>
                        </div>
                )
        }        
}

export default Card;