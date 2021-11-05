import { repoBrowserActionTypes } from "./repo-browser-action-types";
import { RepositoryModel, AuthModel } from "../../models";

export const setAuth = (auth: AuthModel) => {
    return {
        type: repoBrowserActionTypes.SET_AUTH,
        payload: auth
    }
}

export const setRepositories = (repositories: Array<RepositoryModel>) => {
    return {
        type: repoBrowserActionTypes.SET_REPOSITORIES,
        payload: repositories
    }
}