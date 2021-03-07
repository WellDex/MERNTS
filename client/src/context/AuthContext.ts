import { createContext } from 'react'

const noop = () => {
}

type AuthContextType = {
    token: string | null,
    userId: number | null,
    login: (jwtToken: string, id: number, email: string) => void,
    logout: () => void,
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