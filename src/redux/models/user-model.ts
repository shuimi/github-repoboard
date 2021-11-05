import { RepositoryModel } from "./repository-model";


export interface UserModel {
    username: string,
    email: string,
    repos: Array<RepositoryModel>
}