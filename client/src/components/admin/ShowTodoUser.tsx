import React from 'react'
import { ITodo } from '../../Interface/ITodo'
import { VoidFunction } from '../../types/commonTypes'

type ShowTodoUsersPropsType = {
    todos: Array<ITodo>,
    closeTodo: VoidFunction
}

export const ShowTodoUsers: React.FC<ShowTodoUsersPropsType> = (props) => {
    let todos = null
    if (props.todos.length > 0) {
        todos = props.todos.map(t => <li key={t._id} className="collection-item">{t.name}</li>)
    } else {
        return (
            <div className='shadow'>
                <div className='show-todo-user-modal'>
                    <div className='pos-rel'>
                        <a
                            className="btn-floating btn-small waves-effect waves-light red pos-btn-close"
                            onClick={props.closeTodo}
                        >
                            <i className="material-icons">close</i>
                        </a>
                        <ul className="collection">
                            <li className="collection-item">У етого пользователя нет todo</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='shadow'>
            <div className='show-todo-user-modal'>
                <div className='pos-rel'>
                    <a
                        className="btn-floating btn-small waves-effect waves-light red pos-btn-close"
                        onClick={props.closeTodo}
                    >
                        <i className="material-icons">close</i></a>
                    <ul className="collection">
                        {todos}
                    </ul>
                </div>
            </div>
        </div>
    )
}