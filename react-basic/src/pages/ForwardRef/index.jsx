import React, { forwardRef } from 'react'


// 子组件
const Input = forwardRef(function Input(props, ref) {
    return <input ref={ref}/>
});


// 父组件
export default function ForwardRef() {
    const inputRef = React.useRef(null);

    const showRef = () => {
        // 使用ref调用子组件的方法实现input聚焦
        inputRef.current.focus();
    }

    return (
        <div>
            ForwardRef
            <Input ref={inputRef} />
            <button onClick={showRef}>focus</button>
        </div>
    )
}
