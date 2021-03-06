
import materializeCSS from 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import App from './components/App';
//import reducers from './reducers';
import authReducer from './reducers/index';
import axios from 'axios';
window.axios = axios;

//const store = createStore(() => [],{}, applyMiddleware());
const store = createStore(
  authReducer,
  applyMiddleware(ReduxThunk)
);


ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);

console.log('STRIPE KEY IS',process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is',process.env.NODE_ENV);
