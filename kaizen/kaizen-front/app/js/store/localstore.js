export const localstore = {
  setToken(payload){
    if (window.localStorage) {
      localStorage.setItem('kaizenToken', payload['token']);
      localStorage.setItem('username', payload['username']);
      localStorage.setItem('uid', payload['id']);
      localStorage.setItem('isAuthenticated', true);
    } else {
      throw 'Localstorage is not available';
    }
  },
  refreshtoken(token){
    if (window.localStorage) {
      localStorage.setItem('kaizenToken', token);
    } else {
      throw 'Localstorage is not available';
    }
  },
  deleteToken(){
    if (window.localStorage) {
      localStorage.removeItem('kaizenToken');
      localStorage.removeItem('username');
      localStorage.removeItem('uid');
      localStorage.removeItem('isAuthenticated');
    } else {
      throw 'Localstorage is not available';
    }
  },
  getToken(){
    if (window.localStorage) {
      return {
        kaizenToken: localStorage.getItem('kaizenToken'),
        username: localStorage.getItem('username'),
        uid: localStorage.getItem('uid'),
        isAuthenticated: localStorage.getItem('isAuthenticated')
      };
    } else {
      throw 'Localstorage is not available';
    }
  }
};