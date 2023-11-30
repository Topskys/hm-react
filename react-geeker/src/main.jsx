import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css';
import { RouterProvider } from 'react-router-dom'
import router from '@/router';
import { Provider } from 'react-redux';
import store from '@/store';
import 'normalize.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>,
)
