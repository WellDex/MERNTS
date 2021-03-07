import React from 'react'
import { IUser } from '../../Interface/IUser'

type UsersPropsType = {
    user: IUser,
    getTodoUser: (id: number | undefined) => void,
    changeStatusUser: (id: number | undefined) => void,
    deleteUser: (id: number | undefined) => void
}

export const Users: React.FC<UsersPropsType> = (props) => {
    return (
        <>
            <tr>
                <td>{props.user.email}</td>
                <td>
                    {props.user.status
                        ? 'Забанен'
                        : 'Не забанен'
                    }
                </td>
                <td>
                    <a
                        className="waves-effect waves-light btn modal-trigger"
                        onClick={() => props.getTodoUser(props.user._id)}
                    >
                        Показать todo
                    </a>
                </td>
                <td>
                    {props.user.status
                        ? <a
                            className="waves-effect waves-light btn-small blue lighten-2"
                            onClick={() => props.changeStatusUser(props.user._id)}
                        >
                            Разбанить
                        </a>
                        : <a
                            className="waves-effect waves-light btn-small red darken-1"
                            onClick={() => props.changeStatusUser(props.user._id)}
                        >
                            Забанить
                        </a>
                    }
                </td>
                <td>
                    <a
                        className="waves-effect waves-light btn-small"
                        onClick={() => props.deleteUser(props.user._id)}
                    >
                        Удалить пользователя
                    </a>
                </td>
            </tr>

            <div id="modal1" className="modal bottom-sheet">
                <div className="modal-content">
                    <h4>Modal Header</h4>
                    <p>A bunch of text</p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>
        </>
    )
}