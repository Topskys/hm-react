import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import router from './router/index.jsx';
import { RouterProvider } from "react-router-dom";
import '../theme.css';// 引入自定义antd主题
import { Provider } from 'react-redux';
import store from '@/store';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
