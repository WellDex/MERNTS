export interface ITodo {
    readonly _id: number,
    name: string,
    description?: string,
    isCondition: boolean,
    dateEx: string
}