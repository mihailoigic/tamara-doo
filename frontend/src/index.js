import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.css';
import store from './app/store';
import { initialize } from "./app/store/init/actions";
import { Provider } from 'react-redux';

store.dispatch(initialize());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
