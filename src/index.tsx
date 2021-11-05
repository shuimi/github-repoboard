import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { store } from "./redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";


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
