import React from 'react';
import store from '../utils/store';
import Filters from './filters';
import Sortings from './sortings';
import Cards from './cards';
import moment from 'moment';
import ee from '../utils/ee';
import filter from '../utils/filter';
import sorting from '../utils/sort';
import Button from '../components/submit';
import '../../styles/main.css';
import Modal from 'react-modal';
import request from '../utils/request';
import _ from 'lodash';
import '../../styles/modal.css';
import { Pie } from "react-chartjs-2";
import Chart from 'chart.js';
import Loader from 'react-loader';


window.moment = moment;

export default class Main extends React.Component {
    constructor() {
        super();
        this.repos = store.extract('repos') || []
        this.state = {
            filtered: this.repos,
            modal_info: null,
            openedRepo: null,
            page: 1
        }
        this.types = {
            name: 'string',
            stargazers_count: 'number',
            open_issues_count: 'number',
            updated_at: 'date',
            isModalOpen: false
        }
        this.info = {};
        this.colors = ['#c2cbd1', '#facdb9', '#fd625e', '#ff6192', '#faa009', '#f7057d', '#1bf2cc', '#322014', '#0080ff', '#009a00', '#ffffb3', '#0000ff', '#34aac1', '#fef65b', '#e9d49c', '#2f2d45', '#073b2c', '#0b0915', '#374649', '#008080', '#ff6666', '#5aaa3d', '#f36f28'];
        this.addEeListener();
    }
    componentWillMount() {
        if (localStorage.getItem('repos')) {
            this.setState({
                repos: store.extract('repos')
            })
        }
    }
    
    handleLoadMore(){
        this.setState({
            page: this.state.page+=1
        }, () =>{
            let name = store.extract('name');
            let type = store.extract('checked');
            let url = `https://api.github.com/${type}s/${name}/repos?page=${this.state.page}&per_page=30`
            request.send(url). then((response) => {
                this.repos = this.repos.concat(response);
                console.log(this.repos)
                this.setState({
                    filtered: this.repos
                })
            });
        })
    }

    getColors(amount) {
        return this.colors.slice(0, amount);
    }

    langRatio() {
        console.log(this.state.modal_info.repo_languages)
        // let sum = this.state.modal_info.repo_languages.reduce((num, arr) => {
        //     return num + arr[1]
        // }, 0);

        // let ratio = this.state.modal_info.repo_languages.map(lang => {
        //     return lang[1] / sum;
        // })

        let lang = this.state.modal_info.repo_languages.map(lang => {
            return lang[0]
        })

        let ratio = this.state.modal_info.repo_languages.map(lang => {
            return lang[1]
        })

        let zipped = _.zip(lang, ratio);

        console.log(zipped, 'zipped')
        
        return zipped;

    }

    collectPieData() {
        debugger;
        let l = this.langRatio();
        let colors = this.getColors(l.length);

        //['red']
        //[['js',2]]

        let dataset = l.map((item, i) => item.concat(colors[i])); // [['js', 2, 'red' ]]

        console.log(dataset, 'dataset');

        let data = {
            datasets: [{
                backgroundColor: [],
                data: []
            }],
                labels: []
        }

        dataset.forEach(arr => {
            data.datasets[0].backgroundColor.push(arr[2])
            data.datasets[0].data.push(arr[1])
            data.labels.push(arr[0]);
        })

        this.setState({
            pieData : data
        })
    }

    closeModal() {
        this.setState({
            isModalOpen: false,
            openedRepo: null
        });
    }

    async wrapAsyncFn() {
        let info = await this.getDataForModal();
        if (info) {
            store.save('contribs', JSON.stringify(info.contribs));
            store.save('pr', JSON.stringify(info.pr));
            store.save('repo_languages', JSON.stringify(info.repo_languages));
            store.save('opened_id', JSON.stringify(info.opened_id));
            store.save('link', JSON.stringify(info.link));
            store.save('forks_url', JSON.stringify(info.forks_url));
            console.log(info, 'info')
            this.setState({
                modal_info: info
            }, () => {
                this.collectPieData()
            })
        }
    }

    addEeListener() {
        ee.on('apply_filters', (obj) => {
            filter.configureFilterFns(obj);
            let filtered = filter.filter(this.repos, obj);
            this.setState({
                filtered
            })
        })
        ee.on('apply_sorting', obj => {
            let {
                sort_type,
                order
            } = obj;
            let sorted = sorting.sort(this.state.filtered, sort_type, this.types[sort_type], order);
            this.setState({
                filtered: sorted
            })
        })
        ee.on("modal_open", id => {
            this.setState({
                isModalOpen: true,
                openedRepo: id
            }, () => {
                this.wrapAsyncFn();
            });
        })
    }

    async getDataForModal() {

        this.repo = this.state.filtered.filter(repo => {
            return repo.id == +this.state.openedRepo
        })[0];

        if (this.isInStorage()) {
            this.setState({
                modal_info: {
                    contribs: JSON.parse(store.extract('contribs')),
                    pr: JSON.parse(store.extract('pr')),
                    repo_languages: JSON.parse(store.extract('repo_languages')),
                    opened_id: JSON.parse(store.extract('opened_id')),
                    link: JSON.parse(store.extract('link'))
                }
            }, () => {
                this.collectPieData();
            })
            return;
        }
        let opened_id = this.repo.id;
        let link = this.repo.url;
        let contribs = await this.getContributors();
        let pr = await this.getPR();
        let repo_languages = await this.getLanguages();
        let forks_url;
        if (this.isFork()) {
            forks_url = this.repo.forks_url;
        } else {
            forks_url = null;
        }
        return {
            contribs,
            pr,
            repo_languages,
            opened_id,
            link,
            forks_url
        }
    }

    isInStorage() {
        let storage = JSON.parse(localStorage.getItem('opened_id'));
        return +storage && storage == this.state.openedRepo;
    }

    isFork() {
        return this.repo.fork;
    }

    async getContributors() {
        return request.send(this.repo.contributors_url)
            .then(response => {
                return response.slice(0, 3)
            })
        // .then(res => {
        //     console.log(res)
        //     store.save('contributros', JSON.stringify(res))
        // })        
    }

    async getLanguages() {
        return request.send(this.repo.languages_url)
            .then(response => {
                let most_used = [];
                for (let lang in response) {
                    if (response[lang] > 1024) {
                        most_used.push([lang, response[lang]])
                    }
                }
                return most_used;
                // this.info.languages = most_used;
                // store.save('languages', JSON.stringify(his.info.languages))
            })

    }

    async getPR() {
        let url = this.repo.pulls_url.match(/.*{/)[0].slice(0, -1);
        return request.send(url)
            .then(response => {
                let opened = response.filter(repo => {
                    return !!repo.closed_at !== true;
                })

                let opened_urls = opened.map(open => {
                    return {
                        comments_url: open.comments_url,
                        link: open.url
                    };
                })

                return Promise.all(
                    opened_urls.map(url => {
                        return request.send(url.comments_url)
                    })
                ).then(res => {


                    let comments = res;

                    let zipped = _.zip(opened_urls, comments)

                    let top = zipped.sort((arrA, arrB) => {
                        return arrB[1].length - arrA[1].length
                    }).slice(0, 5)

                    return top;

                    // this.info.pr = top;

                    // store.save('pr', JSON.stringify(this.info.pr))


                })
            })
    }

    render() {
        let locale = moment.locale();
        return (
            <div className='main-container' >
                <Filters repos = {
                    this.state.repos
                }
                history={this.props.location.search}
                />
                <Sortings / >
                <Cards repos = {
                    this.state.filtered
                }
                />
                <Modal
                    isOpen={this.state.isModalOpen}
                    contentLabel = "Modal"
                    
                    info={this.state.modal_info}
                    style = {{
                            content: {
                                top: '50%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                                width: '600px',
                                minHeight: '400px',
                                maxHeight:'400px'
                            },
                            overlay: {
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                                zIndex: 999999
                            }
                    }} >
                    
                    <div className="modal-container">{
                        this.state.modal_info ?
                            <div>
                                
                                    <p><a href={this.state.modal_info.link}>{this.state.modal_info.link}</a>
                                
                                <button onClick={this.closeModal.bind(this)}>x</button></p>
                                <table className="blueTable">
                                <thead>    
                                    <tr>
                                        <td>Name</td>    
                                        <td>Login</td>    
                                        <td>Contributions</td>    
                                    </tr>
                                </thead>    
                                <tbody>
                            {this.state.modal_info.contribs.map(contrib => {
                                    return (
                                        <tr key={contrib.login}>
                                            <td>{contrib.login}</td>
                                            <td>{contrib.html_url}</td>
                                            <td>{contrib.contributions}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                                </table> 
                            {
                                    this.state.modal_info.pr.length > 0 ?
                                        < ul > PRs: {
                                                this.state.modal_info.pr.map(pr => {
                                                    return ( <
                                                        li key = {
                                                            pr[0].link
                                                        } > < a href = {pr[0].link} > {
                                                            pr[0].link
                                                        } </a></li>
                                                    )
                                                })
                                        } </ul> :
                                        <p>Oops, no open PRs...</p>
                            }
                            <div>   
                                    {this.state.pieData && this.state.pieData.datasets.length > 0 ? <Pie width={200} height={150} data={this.state.pieData}  ><canvas /></Pie> : null}    
                            </div>    
                            </div>    
                            :
                            < Loader loaded = {false} color = "#007eff" / >
                    }
                    </div>    
                   
                </Modal>    
                <div className="main-button" >
                    <button onClick={this.handleLoadMore.bind(this)}> load more </button>
                </div>     
        </div>)
    }
}

