import React, { useMemo, useState } from 'react'


/**
 * 计算斐波那契数列之和
 */
function fib(n) {
  console.log('计算函数执行了')
  if (n < 3) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
}


/**
 * useMemo()
 * 使用缓存：当需要大量的计算时
 */
export default function Memo() {

  const [c1, setC1] = useState(0);

  let result = null;
  // 频繁change c1会频繁执行fib(c1)，但组件只会在触发change c1的最后一次时渲染，并且阻止了c2重新渲染的行为。
  result = useMemo(() => {
    // 返回计算的结果
    return fib(c1);
  }, [c1])

  // change c2时fib(c1)会重新执行，这是不合理的，要阻止c2的这种行为，只允许c1变时执行fib(c1)。
  // result = fib(c1);
  const [c2, setC2] = useState(0);

  // 使用useMemo缓存渲染中的一个值（保证引用稳定，简单数据类型不用）
  const list=useMemo(()=>{return [1,2,3]},[]);

  console.log('组件重新渲染了')

  return (
    <div>Memo
      <button onClick={() => setC1(c1 + 1)}>change c1:{c1}</button>
      <button onClick={() => setC2(c2 + 1)}>change c2:{c2}</button>
      {result}
      {/* React.memo() */}
      <MemoSon count={list}/>
    </div>
  )
}


/**
 * 通过验证默认的渲染机制是子跟父组件一同渲染和更新。
 * 可使用React.memo()对子组件进行缓存，只有props变化时才会重新跟随父组件渲染（context）
 */
const MemoSon=React.memo(function Son(props){
  console.log('子组件重新渲染了')
  return <div>this is son c1:{props.list}</div>
});