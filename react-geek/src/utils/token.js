// 封装token相关的方法
const TOKEN_KEY = 'token_key';


export function setToken(token) {
    sessionStorage.setItem(TOKEN_KEY, token);
}


export function getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
}


export function removeToken() {
    sessionStorage.removeItem(TOKEN_KEY);
}