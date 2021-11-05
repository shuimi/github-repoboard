import { UserModel } from "./user-model";


export interface AuthModel {
    status: boolean,
    user: UserModel | null,
}