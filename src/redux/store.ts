import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from "./state/auth-state/auth-reducer";
import { AuthModel } from "./models";


const loggerMiddleware = createLogger();

export interface RootReducerModel {
    auth: AuthModel
}

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    composeWithDevTools(
        applyMiddleware(
            loggerMiddleware
        )
    )
);

// @ts-ignore
export const persistor = persistStore(store);