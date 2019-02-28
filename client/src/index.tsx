import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import * as io from 'socket.io-client';
import App from './components/App';
import reducer from './redux/reducer';

export const API_URL = 'https://localhost:3000';
const socket = io(API_URL);
const initialState = {
    keywords: [],
    providers: ['twitter'],
    tweets: [],
    user: {}
};

const store = createStore(reducer, initialState as any);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App socket={socket} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
