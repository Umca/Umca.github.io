const request = {
    send(url){

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
    }
}

export default request;