import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';

import 'antd/dist/antd.css';
import './index.css';


ReactDOM.render(
    <React.StrictMode>
        <Provider store={ store }>
            <PersistGate loading={ null } persistor={ persistor }>
                <App/>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
