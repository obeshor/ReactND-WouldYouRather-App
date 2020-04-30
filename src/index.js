import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';
import './bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import App from './components/App';
import './index.css';

let store = createStore(reducer, middleware);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);