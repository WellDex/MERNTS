import React, { useState } from 'react'
import { EditField } from "../common/EditField"

type ShowAndEditPropsType = {
    update: () => void,
    text: string,
    loading: boolean,
    config: string,
    changeHandler: (e:React.ChangeEvent<HTMLInputElement>) => void
}

export const ShowAndEdit: React.FC<ShowAndEditPropsType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false)

    const changeField = () => {
        props.update()
        setEditMode(!editMode)
    }

    return (
        <li className="collection-item">
            {!editMode
                ? <div>
                    {props.text}
                    <a
                        href="#!"
                        onClick={() => setEditMode(!editMode)}
                        className="secondary-content"
                    >
                        <i className="material-icons">
                            edit
                        </i>
                    </a>
                </div>
                : <EditField
                    config={props.config}
                    text={props.text}
                    changeHandler={props.changeHandler}
                    changeField={changeField}
                    loading={props.loading}
                />
            }
        </li>
    )
}