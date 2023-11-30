// 账单列表store
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const billStore = createSlice({
    name:'bill',
    // 数据状态
    initialState: {
        billList: [],
    },
    reducers: {
        // 同步修改方法
        setBillList: (state, action) => {
            state.billList = action.payload;
        }
    }
});


// 解构actions方法
const { setBillList } = billStore.actions;

// 编写异步请求方法
const getBillList = () => {
    return async (dispatch) => {
        // 编写异步请求
        const { data } = await axios.get('http://localhost:8888/ka');
        // 触发同步reducer
        dispatch(setBillList(data));
    }
}


const reducer = billStore.reducer;


export { setBillList, getBillList };

export default reducer;