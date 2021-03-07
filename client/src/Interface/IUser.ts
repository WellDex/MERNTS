export interface IUser {
    readonly _id?: number,
    name: string,
    lastName: string,
    email: string,
    password: string,
    status?: boolean
}