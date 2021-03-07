import React, {useState} from 'react'
import {ShowAndEdit} from "./ShowAndEdit"
import {EditField} from "../common/EditField"
import {IUser} from '../../Interface/IUser'

type ProfileInfoPropsType = {
    updatePassword: () => void,
    user: IUser,
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    updateProfile: () => void,
    loading: boolean,
    deleteUser: (e: React.MouseEvent) => void
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {
    const [editMode, setEditMode] = useState<Boolean>(false)

    const changePassword = () => {
        props.updatePassword()

        setEditMode(!editMode)
    }

    return (
        <div className='mg-top-10'>
            <ul className="collection with-header">
                <li className="collection-header">
                    <h5>Имя</h5>
                </li>
                <ShowAndEdit
                    text={props.user.name}
                    config={'name'}
                    changeHandler={props.changeHandler}
                    update={props.updateProfile}
                    loading={props.loading}
                />
                <li className="collection-header">
                    <h5>Фамилия</h5>
                </li>
                <ShowAndEdit
                    text={props.user.lastName}
                    config={'lastName'}
                    changeHandler={props.changeHandler}
                    update={props.updateProfile}
                    loading={props.loading}
                />
                <li className="collection-header">
                    <h5>Email</h5>
                </li>
                <li className="collection-header">
                    <div>
                        {props.user.email}
                    </div>
                </li>
                <li className="collection-header">
                    <h5>Пароль</h5>
                </li>
                <li className="collection-item cur-pointer">
                    {!editMode
                        ? <div>
                            Изменить пароль
                            <a
                                href="#!"
                                className="secondary-content"
                                onClick={() => setEditMode(!editMode)}
                            >
                                <i className="material-icons">edit</i>
                            </a>
                        </div>
                        : <EditField
                            config={'password'}
                            text={''}
                            changeHandler={props.changeHandler}
                            changeField={changePassword}
                            loading={props.loading}
                        />
                    }
                </li>
            </ul>
            <a
                className="waves-effect waves-light btn-small red darken-1 float-right"
                onClick={(e) => props.deleteUser(e)}
            >
                <i className="material-icons right">delete</i>
                Удалить профиль
            </a>
        </div>
    )
}