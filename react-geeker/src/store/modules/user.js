import { login } from "@/apis/user";
import { getToken, setToken as _setToken } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";


const userStore = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || '',
    },
    // 同步方法
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            _setToken(action.payload);
        },
    }
})

// 同步actions修改方法
const { setToken } = userStore.actions;

// 异步actions请求方法
const fetchLogin = (loginForm) => {
    return async dispatch => {
        // 1. 发送异步请求
        const res = await login(loginForm);
        // 2. 提交同步action存储token
        dispatch(setToken(res.data.token));
    }
}

const reducer = userStore.reducer;


export { setToken, fetchLogin };
export default reducer;