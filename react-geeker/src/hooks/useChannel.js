// 封装获取频道列表的逻辑函数
import { useState, useEffect } from 'react';
import { getChannel } from '@/apis/article';


function useChannel() {
    const [channelList, setChannelList] = useState([]);

    // 请求频道数据
    useEffect(() => {
        const getChannelList = async () => {
            const res = await getChannel()
            setChannelList(res.data.channels)
        };
        getChannelList();
    }, []);

    return {
        channelList
    }
}

export { useChannel };