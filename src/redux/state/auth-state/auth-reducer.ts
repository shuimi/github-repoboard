import { AuthModel } from "../../models";
import { authActionTypes } from "./auth-action-types";


const defaultState: AuthModel = {
    status: false,
    user: null
}

export interface Action {
    type: string,
    payload: any
}

export function authReducer (state: AuthModel = defaultState, action: Action) {
    switch (action.type) {
        case authActionTypes.SET_AUTH:
            return action.payload;
        case authActionTypes.SET_REPOSITORIES:
            return {
                ...state,
                repositories: action.payload
            };
        default:
            return state;
    }
}