import React from 'react';
import Card from '../components/card';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Modal from '../components/modal';
import Portal from './portal';
import ee from '../utils/ee';
import request from '../utils/request';
import store from '../utils/store';


export default class Cards extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
            openedRepo: "24560307",
        }
        this.repo = {};
        this.info = {};
    }

    openModal(e) {
        this.setState({
            isModalOpen: true,
        }, () => {
            this.getDataForModal();
        });
    }

    closeModal() {
        this.setState({ isModalOpen: false, openedRepo: null });
    }

    getDataForModal() {
        this.repo = this.props.repos.filter(repo => {
            return repo.id == +this.state.openedRepo
        })[0];
        console.log(this.repo);

        if (this.isInStorage()) {
            if (this.isInStorage() == this.state.openedRepo) {
                return;
            }
        }

        this.info.id = this.repo.id;
        this.info.link = this.repo.url;
        this.getContributors();
        this.getPR();
        this.getLanguages();
        if (this.isFork()) {
            this.info.forks_url = this.repo.forks_url;
        }
        this.saveData();

    }

    isInStorage() {
        let storage = JSON.parse(localStorage.getItem('store'));

        if (storage.info) {
            return storage.info.id;
        } else {
            return;
        }
    }

    saveData() {
        store.save(this.info, 'modal');
        localStorage.setItem('modal', JSON.stringify(this.info)); 
    }

    isFork() {
        return this.repo.fork;
    }

    getContributors() {
        request.send(this.repo.contributors_url)
            .then(response => {
                this.info.contributors = response.splice(0, 3)
            })
            
    }

    getLanguages() {
        request.send(this.repo.languages)
            .then(response => {
                this.info.languages = response;
            })
    }

    getPR() {
        let url = this.repo.pulls_url.match(/.*{/)[0].slice(0, -1);
        console.log('url', url)
        request.send(url)
            .then(response => {
               let opened = response.filter(repo => {
                    return !repo.closed_at;
                })
               console.log(opened, 'opened');
                
               
            //    let commented = opened.map(open => {
            //        return request.send(open.comments_url)
            //            .then(response => {
            //                return response;
            //         })
            //    }) 
               
            //    console.log(commented, 'commented'); 
            })
    }

    render(){
        return (
            
                <div className="main-cards">
                    {
                        this.props.repos.map( repo => {
                            return <Card repo={repo} key={repo.id} openModal={this.openModal.bind(this)}/>
                        })
                    }
                </div>  
        )
    }

}