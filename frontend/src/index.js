import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import store from './app/store/index';
import { initialize } from "./app/store/init/actions";
import { Provider } from 'react-redux';

store.dispatch(initialize());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
