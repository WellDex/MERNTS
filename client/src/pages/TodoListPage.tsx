import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useMessage } from "../hooks/messageHook"
import { useRequest } from "../hooks/hookRequests"
import { Todo } from "../components/todo/Todo"
import { AuthContext } from "../context/AuthContext"
import { Preloader } from "../components/common/Preloader"
import { ITodo } from "../Interface/ITodo"
import { VoidFunction } from '../types/commonTypes'

type FormPropsType = {
    id: number | null,
    name: string | null,
    description?: string | null,
    isCondition: boolean,
    dateEx: string | null
}

export const TodoListPage = () => {
    const { token } = useContext(AuthContext)
    const message = useMessage()
    const { loading, error, req, clearError } = useRequest()
    const [form, setForm] = useState<FormPropsType>({ id: null, name: "", description: "", isCondition: false, dateEx: null })
    const [todos, setTodos] = useState<Array<ITodo>>([])

    const getTodos: VoidFunction = useCallback(async () => {
        try {
            const data = await req('/api/todo/', 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            setTodos(data)

        } catch (e) {

        }
    }, [token, req])

    useEffect(() => {
        getTodos()
    }, [getTodos])
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    //asdasdsa
    //test2
    //test2
    //test2
    //test2
    //test2

    const changeIsCondition: (id: number) => void = async (id: number) => {
        try {
            const data = await req('/api/todo/toggleCondition', 'POST', { id })

            message(data.message)
            getTodos()
        } catch (e) {

        }
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>, id: number): void => {
        const todo = todos.find(el => el._id === id) as ITodo

        if (e.target.name === 'name') {
            setForm({
                ...form,
                id: todo._id,
                name: e.target.value,
                description: todo.description,
                isCondition: todo.isCondition,
                dateEx: todo.dateEx
            })
        } else {
            setForm({
                ...form,
                id: todo._id,
                name: todo.name,
                description: e.target.value,
                isCondition: todo.isCondition,
                dateEx: todo.dateEx
            })
        }
    }

    const updateTodo: VoidFunction = () => {
        updateTodoHandler().then(() => {
            getTodos()
        })
    }

    const updateTodoHandler = async () => {
        try {
            const data = await req('/api/todo/update', 'POST', { ...form }, {
                Authorization: `Bearer ${token}`
            })

            message(data.message)

        } catch (e) {

        }
    }

    const deleteTodoHandler: (id: number) => void = async (id: number) => {
        try {
            const data = await req('/api/todo/delete', 'DELETE', { id }, {
                Authorization: `Bearer ${token}`
            })

            message(data.message)

            getTodos()

        } catch (e) {

        }
    }

    const todoMap = todos.map(todo =>
        <Todo
            key={todo._id}
            id={todo._id}
            name={todo.name}
            description={todo.description}
            isCondition={todo.isCondition}
            dateEx={todo.dateEx}
            changeHandler={changeHandler}
            changeIsCondition={changeIsCondition}
            updateTodo={updateTodo}
            deleteTodoHandler={deleteTodoHandler}
            loading={loading}
        />
    )

    if (loading) {
        return <Preloader />
    }

    return (
        <>
            {todos.length > 0
                ? <ul className='collapsible'>
                    {todoMap}
                </ul>
                : <p className='dflex-center helpers'>У вас нет todo</p>
            }
        </>
    )
}
