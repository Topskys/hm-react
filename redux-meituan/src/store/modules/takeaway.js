import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';


const foodsStore = createSlice({
    name: 'foods',
    initialState: {
        // 商品列表
        foodList: [],
        // 当前菜单下标
        activeIndex: 0,
        // 购物车列表
        cartList: [],
    },
    reducers: {
        setFoodList: (state, action) => {
            state.foodList = action.payload
        },
        // 修改菜单下标
        changeActiveIndex: (state, action) => {
            state.activeIndex = action.payload
        },
        // 添加购物车
        addCart: (state, action) => {
            const item = state.cartList.find((item) => action.payload.id === item.id);
            if (item) {
                item.count++;
            } else {
                state.cartList.push(action.payload);
            }
        },
        // -
        increCount: (state, action) => {
            const item = state.cartList.find((item) => action.payload.id === item.id);
            item.count++;
        },
        // +
        decreCount: (state, action) => {
            const item = state.cartList.find((item) => action.payload.id === item.id);
            if (item.count === 1) {
                state.cartList.splice(state.cartList.indexOf(item), 1);
                return;
            }
            item.count--;
        },
        // 清空购物车
        clearCart:(state)=>{
            state.cartList=[];
        }
    }
});

const { setFoodList, changeActiveIndex, addCart, increCount, decreCount ,clearCart} = foodsStore.actions;

const fetchFoodList = () => {
    return async (dispatch) => {
        const response = await axios.get("http://localhost:3004/takeaway");
        dispatch(setFoodList(response.data));
    }
}

const reducer = foodsStore.reducer;

export { fetchFoodList, changeActiveIndex, addCart, increCount, decreCount,clearCart }
export default reducer;
