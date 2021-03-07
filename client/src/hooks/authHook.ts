import { useCallback, useEffect, useState } from "react"

const storageName = 'userData'

type LocalStorageType = {
    userId: number,
    token: string,
    email: string
}

type UseAuthType = () => {
    logout: () => void,
    ready: boolean,
    login: (jwtToken: string, id: number, email: string) => void,
    userId: number | null,
    email: string | null,
    token: string | null
}

export const useAuth: UseAuthType = () => {
    const [token, setToken] = useState<string | null>(null)
    const [ready, setReady] = useState<boolean>(false)
    const [userId, setUserId] = useState<number | null>(null)
    const [email, setEmail] = useState<string | null>(null)

    const login = useCallback((jwtToken: string, id: number, email: string) => {
        setToken(jwtToken)
        setUserId(id)
        setEmail(email)

        localStorage.setItem(storageName, JSON.stringify({
            userId, token, email
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setEmail(null)

        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName) || '[]') as LocalStorageType

        if (data && data.token) {
            login(data.token, data.userId, data.email)
        }

        setReady(true)
    }, [login])

    return { login, logout, token, userId, ready, email }
}