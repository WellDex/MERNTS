import React from 'react'
import { VoidFunction } from '../../types/commonTypes'

type NameTodoPropsType = {
    changeInputEditMode: VoidFunction,
    name: string | undefined,
    config: string,
    isActive: boolean
}

export const NameTodo: React.FC<NameTodoPropsType> = (props) => {
    return (
        <>
            <span onClick={props.changeInputEditMode}>{props.name}</span>
            {props.config === 'name'
                ? <i className='material-icons'>{props.isActive ? 'arrow_drop_up' : 'arrow_drop_down'}</i>
                : ''
            }
        </>
    )
}