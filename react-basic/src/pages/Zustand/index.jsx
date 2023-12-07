import React, { useEffect } from 'react';
import { create } from 'zustand';

const createCounterStore = (set) => {
    return {
        count: 0,
        inc: () => {
            set(state => ({ count: state.count + 1 }))
        }
    }
}

const URL = 'http://geek.itheima.net/v1_0/channels'
const createChannelStore = (set) => {
    return {
        channelList: [],
        fetchGetList: async () => {
            const res = await fetch(URL)
            const data = await res.json()
            set(state => ({ channelList: data.data.channels }))
        }
    }
}

const useStore = create((...args) => {
    return {
        // count: 0,
        // inc: () => {
        //     set(state => ({ count: state.count + 1 }))
        // },
        // channelList: [],
        // fetchGetList: async () => {
        //     const res = await fetch(URL)
        //     const jsonRes = await res.json();
        //     set(state => ({ channelList: jsonRes.data.channels }))
        // }
        // 切片模式
        ...createCounterStore(...args),
        ...createChannelStore(...args),
    }
})

export default function Zustand() {
    const { count, inc, fetchGetList, channelList } = useStore();
    useEffect(() => {
        fetchGetList();
    }, [fetchGetList])
    return (
        <div>
            Zustand
            <button onClick={inc}>{count}</button>
            <ul>
                {
                    channelList.map(item => (<li key={item.id}>{item.name}</li>))
                }
            </ul>
        </div>
    )
}
