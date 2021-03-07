import React, { useState } from 'react'
import { EditField } from "../common/EditField"
import { NameTodo } from "./NameTodo"

type ShowAndEditTodoPropsType = {
    config: string,
    toggleNameEditMode: () => void,
    toggleDescEditMode: () => void,
    update: () => void,
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    editMode: boolean,
    text: string | undefined,
    loading: boolean,
    isActive: boolean
}

export const ShowAndEditTodo: React.FC<ShowAndEditTodoPropsType> = (props) => {

    const changeEditMode = () => {
        if (props.config === 'name') {
            props.toggleNameEditMode()
        } else {
            props.toggleDescEditMode()
        }
    }

    const changeField = () => {
        props.update()
    }

    return (
        <>
            {props.editMode
                ? <EditField
                    config={props.config}
                    text={props.text}
                    changeHandler={props.changeHandler}
                    changeField={changeField}
                    loading={props.loading}
                />
                : <NameTodo
                    config={props.config}
                    changeInputEditMode={changeEditMode}
                    name={props.text}
                    isActive={props.isActive}
                />
            }
        </>
    )
}