import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import { applyMiddleware , createStore} from 'redux';
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom';
import Reducer from './reducers'
import './root.css'
const createStoreWithMiddleWare = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={createStoreWithMiddleWare(Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
    )}   
    >
      <App/>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
