import React from 'react';
import moment from 'moment';
import '../../styles/card.css';
import ee from '../utils/ee';
import store from '../utils/store'

class Card extends React.Component {
        constructor(props){
                super(props);
                this.info = {};
        }
        handleClick(e) {
                ee.emit('modal_open', this.props.repo.id)
                store.save('opened_card', this.props.repo.id);  
        }

        trimNumber(num) {
                if (num / 1000 > 1) {
                        return `${num / 1000} K`
                } else {
                        return num;
                }
        }
        shorten(text, maxLength) {
                var ret = text;
                if (ret.length > maxLength) {
                        ret = ret.substr(0, maxLength - 3) + "...";
                }
                return ret;
        }
        
        render(){
                return (
                        <div className="main-card" onClick={this.handleClick.bind(this)} data-id={this.props.repo.id}>
                                <h1 className="card-title">{this.props.repo.name}</h1>
                                <div className="card-description">Description : {this.shorten(this.props.repo.description, 100)}</div>
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