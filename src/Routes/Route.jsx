import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../pages/Home";
import ErrorPage from "../Components/Shared/ErrorPage";
import AuthPage from "../Pages/Authentication/AuthPage";
import Loading from "../Components/Shared/Loading";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "/meals",
                element: <Loading/>
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthPage/>
    }
]);
