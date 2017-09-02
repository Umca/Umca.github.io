const request = {
    sendInit(url){

        let headers = new Headers();
        headers.append('Accept', 'application/vnd.github.mercy-preview+json');

        return fetch(url, {
            headers: headers
        })
            .then(res => {
                if(res.message !== 'Not found'){
                    return res.json();
                }
                throw new Error ('There is now such user / org!');
            })
    },

    send(url) {
        return fetch(url)
            .then(res => res.json())
            .then(res => res);
    }

}

export default request;