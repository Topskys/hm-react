import { useEffect, useState } from 'react'
import './App.css'
// store
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, addToNum } from './store/modules/counterStore';
import { fetchChannelList } from './store/modules/channelStore'


function App() {

  // className={classnames('nav-item',{active:type===item.type})}

  const dispatch = useDispatch();
  // state.counter为reducer: {counter:counterReducer}
  const { count } = useSelector(state => state.counter);
  const { channelList } = useSelector(state => state.channel);

  // 触发异步请求执行
  useEffect(() => {
    dispatch(fetchChannelList());
  }, [dispatch]);


  return (
    <div className="App">
      <button onClick={() => dispatch(decrement())} >-</button>
      <button  >{count}</button>
      <button onClick={() => dispatch(increment())} >+</button>
      <button onClick={() => dispatch(addToNum(100))} >add to 100</button>
      <ul>{channelList.map(item => <li key={item.id}>{item.name}</li>)}</ul>
    </div>
  )
}

export default App
