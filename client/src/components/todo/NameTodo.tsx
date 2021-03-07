import React from 'react'

type NameTodoPropsType = {
    changeInputEditMode: () => void,
    name: string| undefined,
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