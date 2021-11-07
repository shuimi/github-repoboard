import { RepositoryModel } from "./repository-model";


export interface UserModel {
    username: string,
    email: string,
    avatarURL: string,
    repos: Array<RepositoryModel>
}