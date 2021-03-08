import React, { useState } from 'react'
import { VoidFunction } from '../../types/commonTypes'
import { EditField } from "../common/EditField"
import { NameTodo } from "./NameTodo"

type ShowAndEditTodoPropsType = {
    config: string,
    toggleNameEditMode: VoidFunction,
    toggleDescEditMode: VoidFunction,
    update: VoidFunction,
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    editMode: boolean,
    text: string | undefined,
    loading: boolean,
    isActive: boolean
}

export const ShowAndEditTodo: React.FC<ShowAndEditTodoPropsType> = (props) => {

    const changeEditMode: VoidFunction = () => {
        if (props.config === 'name') {
            props.toggleNameEditMode()
        } else {
            props.toggleDescEditMode()
        }
    }

    const changeField:VoidFunction = () => {
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