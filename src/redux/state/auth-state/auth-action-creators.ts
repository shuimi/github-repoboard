import { authActionTypes } from "./auth-action-types";
import { RepositoryModel, AuthModel } from "../../models";

export const setAuth = (auth: AuthModel) => {
    return {
        type: authActionTypes.SET_AUTH,
        payload: auth
    }
}

export const setRepositories = (repositories: Array<RepositoryModel>) => {
    return {
        type: authActionTypes.SET_REPOSITORIES,
        payload: repositories
    }
}