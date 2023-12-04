import React, { memo, useCallback, useState } from 'react'


const Input = memo(function Input({ onChange }) {
    console.log("子组件重新渲染了")
    return <input onChange={(e) => onChange(e.target.value)} />
});

export default function Callback() {

    // 传给子组件的函数（不使用useCallback处理，触发setC()子组件会重新渲染）
    const childHandler = useCallback((value) => console.log(value),[]);
    // 用于触发父组件重新渲染
    const [c, setC] = useState(0);

    return (
        <div>Callback
            {/* 将函数作为props传给子组件 */}
            <Input onChange={childHandler} />
            <button onClick={() => setC(c + 1)}>{c}</button>
        </div>
    )
}
