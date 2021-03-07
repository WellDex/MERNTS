import React, { useContext, useEffect, useState } from 'react'
import { useRequest } from "../hooks/hookRequests"
import { AuthContext } from "../context/AuthContext"
import { useMessage } from "../hooks/messageHook"
import { useHistory } from "react-router-dom"

export const CreateTodo: React.FC = (props) => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    let history = useHistory()
    const { error, req, clearError, loading } = useRequest()
    const [Todo, setTodo] = useState({ name: '', description: '' })


    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const createTodo = async () => {
        try {
            const data = await req('/api/todo/create', 'POST', { ...Todo }, { Authorization: `Baerer ${auth.token}` })

            history.push('/todoList')

        } catch (e) {

        }
    }

    return (
        <div className="card blue darken-1">
            <div className="card-content white-text">
                <span className="card-title">Создание todo</span>
                <div>
                    <div className="input-field">
                        <input
                            id="name"
                            type="text"
                            className="yellow-input"
                            name="name"
                            value={Todo.name}
                            onChange={e => setTodo({ ...Todo, name: e.target.value, description: Todo.description })}
                        />
                        <label htmlFor="name">Название</label>
                    </div>
                    <div className="input-field">
                        <textarea
                            id="desc"
                            className="materialize-textarea"
                            name="description"
                            value={Todo.description}
                            onChange={e => setTodo({ ...Todo, description: e.target.value, name: Todo.name })}
                        ></textarea>
                        <label htmlFor="desc">Описание</label>
                    </div>
                </div>
            </div>
            <div className="card-action dflex-sb">
                <button
                    className="btn green lighten-1"
                    type="submit"
                    name="action"
                    onClick={createTodo}
                    disabled={loading}
                >
                    Создать
                </button>
            </div>
        </div>
    )
}
