import {useCallback, useState} from 'react'

type UseRequestType = () => {
    clearError: () => void
    loading: boolean
    error: string | null
    req: (url: string, method?: string, body?: any, headers?: any) => Promise<any>
}

export const useRequest: UseRequestType = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const req = useCallback(async (url: string, method: string = 'GET', body: any = null, headers: any = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const res = await fetch(url, {method, body, headers})
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || 'Error')

            }

            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, req, error, clearError}
}