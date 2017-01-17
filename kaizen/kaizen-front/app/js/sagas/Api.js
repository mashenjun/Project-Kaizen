import 'whatwg-fetch'


/*
 * endpoint:url you want to call
 * request:{method, requestbody(if post)}
 *
 * */
const callApi = (endpoint, request) => {
    if (request && request.body) {
        request.body = JSON.stringify(request.body);
    }

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    const requestWithHeaders = {
        ...{headers},
        ...request
    };

    return fetch(endpoint, requestWithHeaders)
        .then(response => response.json().then(body => ({ response, body})))
        .then(({ response, body }) => {
            return {
                result: body,
                status:response.status
            }
        })

};


export default {
    loginWithfetchToken(userinfo) {
        let url = '/accounts/api/login/';
        return callApi(url, {
            method: 'POST',
            body: userinfo
        })
    }
}