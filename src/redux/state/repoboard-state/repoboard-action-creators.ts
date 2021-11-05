import { repoboardActionTypes } from "./repoboard-action-types";
import { RepositoryModel, AuthModel } from "../../models";

export const setAuth = (auth: AuthModel) => {
    return {
        type: repoboardActionTypes.SET_AUTH,
        payload: auth
    }
}

export const setRepositories = (repositories: Array<RepositoryModel>) => {
    return {
        type: repoboardActionTypes.SET_REPOSITORIES,
        payload: repositories
    }
}