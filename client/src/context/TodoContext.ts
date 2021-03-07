import { createContext } from 'react'

type TodoContextType = {
    name: string | null,
    description: string | null,
    isCondition: boolean,
    dateEx: string | null,
    userId: number | null
}

export const TodoContext = createContext<TodoContextType>({
    name: null,
    description: null,
    isCondition: false,
    dateEx: null,
    userId: null
})