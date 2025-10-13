import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../pages/Home";
import ErrorPage from "../Components/Shared/ErrorPage";
import AuthPage from "../Pages/Authentication/AuthPage";
import Loading from "../Components/Shared/Loading";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyProfile from "../Pages/Dashboard/MyProfile";
import RequestedMeals from "../Pages/Dashboard/RequestedMeals";
import MyReviews from "../Pages/Dashboard/MyReviews";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import AddMeal from "../Pages/Dashboard/AddMeal";
import AllMeals from "../Pages/Dashboard/AllMeals";
import AllReviews from "../Pages/Dashboard/AllReviews";
import ServeMeals from "../Pages/Dashboard/ServeMeals";
import UpcomingMeals from "../Pages/Dashboard/UpcomingMeals";
import EditProfile from "../Pages/Dashboard/EditProfile";
import MealDetails from "../Pages/Meals/MealDetails";
import Meals from "../Pages/Meals/Meals";
import ForgetPass from "../Pages/Authentication/ForgetPass";
import ManageUsers from "../Pages/Dashboard/ManageReviews";

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
                element: <Meals/>
            },
            {
                path: "/meal/:id",
                element: <MealDetails/>
            },
            {
                path: "/upcomingMeals",
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthPage/>
    },
    {
        path: "/forget-pass",
        element: <ForgetPass/>
    },
    {
        path: "/dashboard",
        element: <DashboardLayout/>,
        children: [
            {
                path: "my-profile",
                element: <MyProfile/>
            },
            {
                path: "requested-meals",
                element: <RequestedMeals/>
            },
            {
                path: "my-reviews",
                element: <MyReviews/>
            },
            {
                path: "payment-history",
                element: <PaymentHistory/>
            },
            {
                path: "manage-users",
                element: <ManageUsers/>
            },
            {
                path: "add-meal",
                element: <AddMeal/>
            },
            {
                path: "all-meals",
                element: <AllMeals/>
            },
            {
                path: "all-reviews",
                element: <AllReviews/>
            },
            {
                path: "serve-meals",
                element: <ServeMeals/>
            },
            {
                path: "upcoming-meals",
                element: <UpcomingMeals/>
            },
            {
                path: "edit-profile",
                element: <EditProfile/>
            }
        ]
    }
]);
