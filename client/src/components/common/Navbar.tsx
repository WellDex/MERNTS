import React, { useContext } from 'react'
import { AuthContext } from "../../context/AuthContext"
import { NavLink, Redirect } from "react-router-dom"

type logoutHandlerType = (e: React.MouseEvent) => JSX.Element

export const Navbar: React.FC = () => {
    const auth = useContext(AuthContext)

    const logoutHandler: logoutHandlerType = (e) => {
        e.preventDefault()
        auth.logout()
        return <Redirect to='/' />
    }

    return (
        <nav>
            <div className="nav-wrapper pd-l-10">
                {auth.email === 'admin@mail.ru'
                    ? <a href="#" className="brand-logo center">my Todo list</a>
                    : <NavLink to="/todoList"
                        className="brand-logo center"
                    >
                        my Todo list
                    </NavLink>
                }
                <ul id="nav-mobile" className="right ">
                    {auth.email === 'admin@mail.ru'
                        ? ''
                        : <li>
                            <NavLink to="/create"
                                className="btn-floating btn-small waves-effect waves-light  teal lighten-1"
                            >
                                <i className="material-icons">add</i>
                            </NavLink>
                        </li>
                    }
                    {auth.email === 'admin@mail.ru'
                        ? ''
                        : <li>
                            <NavLink to="/profile"
                                className="btn-floating btn-small waves-effect waves-light yellow darken-3"
                            >
                                <i className="material-icons">account_box</i>
                            </NavLink>
                        </li>
                    }
                    <li>
                        <a
                            className="btn-floating btn-small waves-effect waves-light deep-orange lighten-2"
                            onClick={logoutHandler}
                        >
                            <i className="material-icons">exit_to_app</i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}