

const request = {
    sendInit(url){

        let headers = new Headers();
        headers.append('Accept', 'application/vnd.github.mercy-preview+json');
        headers.append('Authorization', 'token ac135ea452d934ca864b7c281e3886f8902083eb');

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
        headers.append('Authorization', 'token ac135ea452d934ca864b7c281e3886f8902083eb');
        return fetch(url, {
            headers: headers
        })
            .then(res => res.json())
    },

    sendOne(url) {
        let headers = new Headers();
        headers.append('Accept', 'application/vnd.github.mercy-preview+json');
        headers.append('Authorization', 'token ac135ea452d934ca864b7c281e3886f8902083eb');
        return fetch(url, {
            headers: headers
        })
    }

}

export default request;