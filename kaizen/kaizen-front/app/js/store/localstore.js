export const localstore = {
    setToken(token){
        if (window.localStorage) {
            localStorage.setItem('kaizenToken',token);
        }else{
            throw 'Localstorage is not available';
        }
    },
    getToken(){
        if (window.localStorage) {
            localStorage.getItem('kaizenToken');
        }else{
            throw 'Localstorage is not available';
        }
    }
};