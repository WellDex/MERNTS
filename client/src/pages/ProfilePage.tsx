import React, {useCallback, useContext, useEffect, useState} from 'react'
import {ProfileInfo} from '../components/user/ProfileInfo'
import {useMessage} from '../hooks/messageHook'
import {useRequest} from '../hooks/hookRequests'
import {Preloader} from '../components/common/Preloader'
import {AuthContext} from '../context/AuthContext'
import {Redirect} from 'react-router-dom'
import {IUser} from '../Interface/IUser'

export const ProfilePage = () => {
    const {token, userId, logout} = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, req, clearError} = useRequest()
    const [user, setUser] = useState<IUser>({name: '', lastName: '', email: '', password: ''})


    const getUser = useCallback(async () => {
        try {
            const data = await req('/api/user/', 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            setUser(data)

        } catch (e) {
            throw e
        }
    }, [token, req])

    useEffect(() => {
        getUser()
    }, [getUser])
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value})
        console.log(user)
    }

    const updateProfile = async () => {
        try {
            const data = await req('/api/user/update', 'POST', {...user}, {
                Authorization: `Bearer ${token}`
            })

            message(data.message)
        } catch (e) {

        }
    }

    const updatePassword = async () => {
        try {
            const data = await req('/api/user/updatePassword', 'POST', {password: user.password}, {
                Authorization: `Bearer ${token}`
            })

            message(data.message)
        } catch (e) {

        }
    }

    const deleteUser = async (event: React.MouseEvent) => {
        try {
            await req('/api/todo/deleteAll', 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
            const data = await req('/api/user/delete', 'DELETE', {id: userId}, {
                Authorization: `Bearer ${token}`
            })

            message(data.message)

            logoutHandler(event)

        } catch (e) {

        }
    }

    const logoutHandler = (event: React.MouseEvent) => {
        event.preventDefault()
        logout()
        return <Redirect to='/Login'/>
    }

    if (loading) {
        return <Preloader/>
    }

    return (
        <ProfileInfo
            user={user}
            changeHandler={changeHandler}
            updateProfile={updateProfile}
            updatePassword={updatePassword}
            deleteUser={deleteUser}
            loading={loading}
        />
    )
}
