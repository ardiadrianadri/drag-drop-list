import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { initDatasource } from './datasources/preferences-datasource';
import { reducer } from './reducers';

initDatasource();

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware( thunkMiddleware )
  )
); 

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
