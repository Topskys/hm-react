import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import router from './router/index.jsx';
import { RouterProvider } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 绑定路由 */}
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)
