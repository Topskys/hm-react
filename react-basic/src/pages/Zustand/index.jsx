import React, { useEffect } from 'react';
import { create } from 'zustand';

const URL = 'http://geek.itheima.net/v1_0/channels'
const useStore = create((set) => {
    return {
        count: 0,
        inc: () => {
            set(state => ({ count: state.count + 1 }))
        },
        channelList: [],
        fetchGetList: async () => {
            const res = await fetch(URL)
            const jsonRes = await res.json();
            set(state => ({ channelList: jsonRes.data }))
        }
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
