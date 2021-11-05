import { AuthModel } from "../../models";
import { repoboardActionTypes } from "./repoboard-action-types";


const defaultState: AuthModel = {
    status: false,
    user: null
}

export interface Action {
    type: string,
    payload: any
}

export function repoboardReducer (state: AuthModel = defaultState, action: Action) {
    switch (action.type) {
        case repoboardActionTypes.SET_AUTH:
            return action.payload;
        case repoboardActionTypes.SET_REPOSITORIES:
            return {
                ...state,
                repositories: action.payload
            };
        default:
            return state;
    }
}