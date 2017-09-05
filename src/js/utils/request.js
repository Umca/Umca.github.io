

const request = {
    sendInit(url){

        let headers = new Headers();
        headers.append('Accept', 'application/vnd.github.mercy-preview+json');
        return fetch(url, {
            headers: headers
        })
            .then(res => {
                if(res.statusText !== 'Not Found'){
                    return res.json();
                }
                throw new Error ('There is now such user / org!');
            })
    },

    send(url) {
        let headers = new Headers();
        headers.append('Accept', 'application/vnd.github.mercy-preview+json');
        return fetch(url, {
            headers: headers
        })
            .then(res => res.json())
    },

    sendOne(url) {
        let headers = new Headers();
        headers.append('Accept', 'application/vnd.github.mercy-preview+json');
        return fetch(url, {
            headers: headers
        })
    }

}

export default request;
