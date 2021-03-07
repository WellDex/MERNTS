import React from 'react'
import Moment from 'react-moment'
import 'moment/locale/ru'

type MomentPropsType = {
    dateEx: string
}

export const MyMoment: React.FC<MomentPropsType> = (props) => {
    return <Moment locale="ru" format="H:mm DD MMM">{props.dateEx}</Moment>
}