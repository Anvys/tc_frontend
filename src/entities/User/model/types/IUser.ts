export interface IUser {
    session_id: string;
    username: string;
}

export interface IUserSchema {
    authData?: IUser;
    test:string
}

export type TLSUser = Omit<IUser, 'password'>
