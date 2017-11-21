import 'whatwg-fetch'


/*
 * endpoint:url you want to call
 * request:{method, requestbody(if post)}
 *
 * */
const callApi = (endpoint, request, token) => {
  if (request && request.body) {
    request.body = JSON.stringify(request.body);
  }

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if(token){
    headers['Authorization'] = 'jwt '+token;
  }

  const requestWithHeaders = {
    ...{headers},
    ...request
  };

  return fetch(endpoint, requestWithHeaders)
      .then(response => response.json().then(body => ({response, body})))
      .then(({response, body}) => {
        if(response.headers.has('newtoken')){
          return {
            token : response.headers.get('newtoken'),
            result: body,
            status: response.ok
          }
        }else{
          return {
            result: body,
            status: response.ok
          }
        }

      })
};


export default {
  loginWithfetchToken(userinfo) {
    const url = '/accounts/api/login/';
    return callApi(url, {
      method: 'POST',
      body: userinfo
    })
  },
  signupWithfetchToken(userinfo) {
    const url = '/accounts/api/register/';
    return callApi(url, {
      method: 'POST',
      body: userinfo
    })
  },
  getUsermapData() {
    const url = '/upload/uploader';
    return callApi(url, {
      method: 'GET'
    })
  },
  getUploderPost(uploaderid) {
    const url = '/upload/filter/post/' + uploaderid;
    return callApi(url, {
      method: 'GET'
    })
  },
  getPostDetail(pid){
    const url = '/upload/post/'+pid;
    return callApi(url, {
      method: 'GET'
    })
  },
  getUploaders(uid, token){
    const url = '/upload/filter/uploader/' + uid;
    return callApi(url, {
      method: 'GET',
    },token)
  },
  searchUploaders(keyword){
    const url = '/upload/search/uploader_postKeyword/' + keyword;
    return callApi(url, {
      method: 'GET',
    })
  },
  filterUploaders(filter){
    const url = '/upload/filter/uploader_postCatalogue/' + filter;
    return callApi(url, {
      method: 'GET',
    })
  }
}