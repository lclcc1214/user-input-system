import { createBrowserRouter } from "react-router-dom"
import About from "./pages/About"
import App from "./pages/App"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import UserDetail from "./pages/UserDetail"


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children:[
            {
                path: "",
                element: <Login />,
            },
            {
                path: "/Home",
                element: <Home />,
            },
            {
                path: "/UserDetail",
                element: <UserDetail />,
            },
            {
                path: "/About",
                element: <About />,
            }
        ]
    },
    
])

export default router