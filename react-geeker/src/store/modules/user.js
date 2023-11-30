import { getUserInfo, login } from "@/apis/user";
import { getToken, setToken as _setToken, removeToken } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";


const userStore = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || '',
        userInfo: {},
    },
    // 同步方法
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            _setToken(action.payload);
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
        clearUserInfo: (state) => {
            state.token = ''
            state.userInfo = {};
            removeToken();
        }
    }
})

// 同步actions修改方法
const { setToken, setUserInfo,clearUserInfo } = userStore.actions;

// 异步actions请求方法
const fetchLogin = (loginForm) => {
    return async dispatch => {
        // 1. 发送异步请求
        const res = await login(loginForm);
        // 2. 提交同步action存储token
        dispatch(setToken(res.data.token));
    }
}

const fetchUserInfo = () => {
    return async dispatch => {
        // 1. 发送异步请求
        const res = await getUserInfo();
        // 2. 提交同步action存储token
        dispatch(setUserInfo(res.data));
    }
}

const reducer = userStore.reducer;


export { setToken, setUserInfo, fetchLogin, fetchUserInfo,clearUserInfo };
export default reducer;