import { createContext } from 'react'
import { VoidFunction } from '../types/commonTypes'

const noop = () => {
}

type AuthContextType = {
    token: string | null,
    userId: number | null,
    login: (jwtToken: string, id: number, email: string) => void,
    logout: VoidFunction,
    email: string | null,
    isAuth: boolean
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    email: null,
    isAuth: false
})