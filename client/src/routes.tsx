import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { TodoListPage } from "./pages/TodoListPage"
import { ProfilePage } from "./pages/ProfilePage"
import { AuthPage } from "./pages/AuthPage"
import { CreateTodo } from "./pages/CreateTodo"
import { Admin as AdminPage } from "./pages/Admin"

type useRoutesType = {
    isAuth: boolean,
    email: string | null
}

export const UseRoutes: React.FC<useRoutesType> = ({ isAuth, email }) => {
    if (email === "admin@mail.ru") {
        return (
            <Switch>
                <Route path="/admin" exact>
                    <AdminPage />
                </Route>
                <Redirect to="/admin" />
            </Switch>
        )
    }

    if (isAuth) {
        return (
            <div className="container-card">
                <Switch>
                    <Route path="/todoList" exact>
                        <TodoListPage />
                    </Route>
                    <Route path="/profile" exact>
                        <ProfilePage />
                    </Route>
                    <Route path="/create" exact>
                        <CreateTodo />
                    </Route>
                    <Redirect to="/todoList" />
                </Switch>
            </div>
        )
    }
    return (
        <AuthPage />
    )
}