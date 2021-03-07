import { useCallback } from 'react'

type MessageFunctionType = () => (txt: string | null) => void

export const useMessage: MessageFunctionType = () => {
    return useCallback(txt => {
        // @ts-ignore
        if (window.M && txt) {
            // @ts-ignore
            window.M.toast({ html: txt })
        }
    }, [])
}