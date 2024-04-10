import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootswatch/dist/darkly/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Provider } from 'react-redux';
import store from './store';
import "mapbox-gl/dist/mapbox-gl.css";
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <ToastContainer
        theme="dark"
      />
        <RouterProvider router={router} />
      <ToastContainer />
    </Provider>,
)
