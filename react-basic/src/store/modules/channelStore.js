import { createSlice } from '@reduxjs/toolkit';


const channelStore = createSlice({
    name: 'channel',
    // 初始化state
    initialState: {
        channelList: [],
    },
    // 修改state的方法（action同步方法，支持直接修改）
    reducers: {
        setChannelList(state, action) {
            state.channelList = action.payload;
        }
    },
})


const { setChannelList } = channelStore.actions;

const reducer = channelStore.reducer;

const url = 'http://geek.itheima.net/v1_0/channels';
const fetchChannelList = () => {
    return (dispatch) => {
        fetch(url).then((res) => res.json()).then((res) => {
            dispatch(setChannelList(res.data.channels));
        });
    }
}

export {
    setChannelList,
    fetchChannelList
}

export default reducer;