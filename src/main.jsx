import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./routes/Router.jsx";
import MainLayout from "./Layout/MainLayout.jsx";
import AuthProvider from "./Context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
    <ToastContainer></ToastContainer>
  </StrictMode>
);
