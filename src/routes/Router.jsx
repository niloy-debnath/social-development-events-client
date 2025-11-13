import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "../pages/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../pages/Login";
import UpcomingEvents from "../pages/UpcomingEvents";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/upcoming-events",
        element: <UpcomingEvents></UpcomingEvents>,
      },
    ],
  },
]);
