const filter = {
    fns:[],
    configureFilterFns(state) {
        debugger;
        let keys = Object.keys(state);
        console.log(keys)
        for (let i = 0; i < keys.length; i++){
            //for (let key in state) {
                if (keys[i] == 'language') {
                    this.fns.push(
                        {
                            name: keys[i],
                            fn: function (repo) {
                                return repo[keys[i]] == state[keys[i]]
                            }
                        }
                    )
                } else {
                    if (keys[i] === 'stars') {
                        this.fns.push(
                            {
                                name: keys[i],
                                fn: function (repo) {
                                    return repo.stargazers_count >= state.stars
                                }
                            }
                        )
                    } else if (keys[i] == 'open_issues_count') {
                        this.fns.push({
                            name: keys[i],
                            fn: function (repo) {
                                return repo.open_issues_count > 0
                            }
                        })
                    }
                    else if (keys[i] == 'topics') {
                        this.fns.push({
                            name: keys[i],
                            fn: function (repo) {
                                return repo.topics.length > 0
                            }
                        })
                    } else if (keys[i] == 'type') {
                        this.fns.push({
                            name: keys[i],
                            fn: function (repo) {
                                if (state.type == 'all') {
                                    return true;
                                } else if (state.type == 'fork' && repo.fork){
                                    return true
                                } else if (state.type == 'source' && !repo.fork) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        })
                    } else {
                        this.fns.push(
                            {
                                name: keys[i],
                                fn: function (repo) {
                                    if (state.updated_at == null) {
                                        return true;
                                    }
                                    return moment(repo.updated_at) > state.updated_at
                                }
                            }
                        )

                    }
                }
            //}
        }
   
    },
    getProperConditionFns(condition) {
        let arr =  this.fns.filter(item => Object.keys(condition).indexOf(item.name) !== -1)
        return arr;
    },
    filter(repos, condition){
        let fns = this.getProperConditionFns(condition);

        // let arr = repos.filter(repo => {
             
           
        // })
        let filtered = []
        for (let k = 0; k < repos.length; k++){
            let filterTests = [];
            for (let i = 0; i < fns.length; i++) {
                let res = fns[i].fn(repos[k])
                filterTests.push(res);
            }

            if (!filterTests.includes(false)) {
                filtered.push(repos[k]);
            }
        }

        this.fns = [];

        return filtered;
    }
}

export default filter;