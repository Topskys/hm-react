// Redux  ----- react-redux插件 ----- React组件
// Redux配置工具@reduxjs/toolkit
// npm install react-redux @reduxjs/toolkit

import { createSlice } from '@reduxjs/toolkit';


const counterStore = createSlice({
    name: 'counter',
    // 初始化state
    initialState: {
        count: 0
    },
    // 修改state的方法（同步方法，支持直接修改）
    reducers: {
        increment: state => void (state.count++),
        decrement: state => void (state.count--),
        addToNum: (state, action) => { state.count = state.count + action.payload },
    },
})


const { increment, decrement, addToNum } = counterStore.actions;

const reducer = counterStore.reducer;

export {
    increment,
    decrement,
    addToNum,
}

export default reducer;