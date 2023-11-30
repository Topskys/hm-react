import React from 'react';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';


const root = createRoot(document.getElementById('root'));

root.render(
 <Provider store={store}>
   <App />
 </Provider>
);