import React, { forwardRef, useImperativeHandle } from 'react'


// 子组件
const Input = forwardRef(function Input(props, ref) {
    const inputRef = React.useRef(null);

    const focusHandler = () => {
        inputRef.current.focus();
    }

    // 暴露函数给父组件调用
    useImperativeHandle(ref, () => {
        return {
            focusHandler
        }
    });

    return <input ref={inputRef} />
});


// 父组件
export default function ForwardRef() {
    const sonRef = React.useRef(null);

    const showRef = () => {
        // 调用useImperativeHandle在子组件暴露的方法实现input聚焦
        sonRef.current.focusHandler();
    }

    return (
        <div>
            ForwardRef
            <Input ref={sonRef} />
            <button onClick={showRef}>focus</button>
        </div>
    )
}
