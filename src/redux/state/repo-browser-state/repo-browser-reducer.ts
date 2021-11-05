import { AuthModel } from "../../models";
import { repoBrowserActionTypes } from "./repo-browser-action-types";


const defaultState: AuthModel = {
    status: false,
    user: null
}

export interface Action {
    type: string,
    payload: any
}

export function repoBrowserReducer (state: AuthModel = defaultState, action: Action) {
    switch (action.type) {
        case repoBrowserActionTypes.SET_AUTH:
            return action.payload;
        case repoBrowserActionTypes.SET_REPOSITORIES:
            return {
                ...state,
                repositories: action.payload
            };
        default:
            return state;
    }
}