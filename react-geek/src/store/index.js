import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";

// 组装子模块
const store = configureStore({
    reducer: {
        user: userReducer
    }
});


export default store;