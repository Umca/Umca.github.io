export default filter = {
    fns:[],
    configureFilterFns(state){
        for (let key in state){
            if(key == 'language'){
                this.fns.push(
                    {
                        name: key,
                        fn: function(repo){
                            return repo[key] == state[key]
                        }
                    }
                )
            } else {
                if (key === 'stars'){
                    this.fns.push(
                        {
                            name: key,
                            fn: function(repo){
                                return repo.stargazers_count >= state.stars 
                            }
                        }
                    )
                } else if(key == 'open_issues_count'){
                    this.fns.push({
                        name: key,
                        fn: function (repo){
                            return repo.open_issues_count > 0
                        }
                    })
                } 
                else if(key == 'topics'){
                    this.fns.push({
                        name: key,
                        fn: function (repo){
                            return repo.topics.length > 0
                        }
                    })
                } else if(key == 'type'){
                    this.fns.push({
                        name: key,
                        fn: function (repo){
                            if(state.type == 'All'){
                                return true;
                            } else {
                                return repo[state.type]
                            }
                        }
                    })
                }else{
                    this.fns.push(
                        {
                            name: key,
                            fn: function(repo){
                                return moment(repo.updated_at) > state.updated_at 
                            }
                        }
                    )
                    
                }
            }
        }
    },
    getProperConditionFns(condition){
        return this.fns.filter( item => Object.keys(condition).indexOf(item.name) !== -1)
    },
    filter(repos){
        let fns = this.getProperConditionFns();

        return repos.filter(repo => {
             
            let filterTests = [];
            for(let i = 0 ; i < fns.length; i++){
                let res = fns[i].fn.call(repo)
                filterTests.push(res);
            }

            return filterTests.indexOf(false) !== -1;
        })
    }
}