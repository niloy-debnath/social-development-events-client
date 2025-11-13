import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "../pages/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../pages/Login";
import UpcomingEvents from "../pages/UpcomingEvents";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import CreateEvent from "../pages/CreateEvent";
import ManageEvents from "../pages/ManageEvents";
import JoinedEvent from "../pages/JoinedEvent";
import EventDetails from "../pages/EventDetails";

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
        path: "/create-event",
        element: (
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-events",
        element: (
          <PrivateRoute>
            <ManageEvents></ManageEvents>
          </PrivateRoute>
        ),
      },
      {
        path: "/joined-events",
        element: (
          <PrivateRoute>
            <JoinedEvent></JoinedEvent>
          </PrivateRoute>
        ),
      },
      {
        path: "/upcoming-events",
        element: <UpcomingEvents></UpcomingEvents>,
      },
      {
        path: "/event/:id",
        element: <EventDetails></EventDetails>,
      },
    ],
  },
]);
