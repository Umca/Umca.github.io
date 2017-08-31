import React from 'react';
import Card from '../components/card';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Modal from '../components/modal';
import Portal from './portal';
import ee from '../utils/ee';


export default class Cards extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

    openModal(e) {
        this.setState({ isModalOpen: true });
        console.log(e.target.dataset.id)
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }

    render(){
        return (
            <div>
                <Portal className="DialogGroup">
                    <ReactCSSTransitionGroup
                        transitionName="Dialog-anim"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                    > 
                        {this.state.isModalOpen ?
                            <Modal
                                closeModal={this.closeModal.bind(this)}
                            /> :
                            null
                        }
                    </ReactCSSTransitionGroup>
                </Portal> 
                <div className="main-cards">
                    {
                        this.props.repos.map( repo => {
                            return <Card repo={repo} key={repo.id} openModal={this.openModal.bind(this)}/>
                        })
                    }
                </div>
            </div>    
        )
    }

}