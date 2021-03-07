import React from "react"
import { UseRoutes } from "./routes"
import { useAuth } from "./hooks/authHook"
import { BrowserRouter } from "react-router-dom"
import { AuthContext } from "./context/AuthContext"
import { Navbar } from "./components/common/Navbar"
import { Preloader } from "./components/common/Preloader"
import 'materialize-css'


export const App: React.FC = () => {
    const { token, login, logout, userId, ready, email } = useAuth()
    const isAuth = !!token

    if (!ready) {
        return <Preloader />
    }

    return (
        <AuthContext.Provider value={{ token, userId, login, logout, isAuth, email }}>
            <BrowserRouter>
                {isAuth && <Navbar />}
                <div className="container">
                    <UseRoutes isAuth={isAuth} email={email} />
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}