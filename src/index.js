import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore, applyMiddleware} from 'redux';
import userReducer from './reducer/userReducer';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import App from "./App";
import glue from "./reducer";

const store = createStore(userReducer, applyMiddleware(thunk));

const YouPin = glue(App);
ReactDOM.render(
    <Provider store={store}>
        <YouPin/>
    </Provider>,
  document.getElementById('root')
);


