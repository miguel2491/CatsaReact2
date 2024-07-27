import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login.tsx";
import Signup from "./routes/Signup.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import Profile from "./routes/Profile.tsx";
import Usuario from "./routes/Admin/Usuarios.tsx";
import Ayuda from "./routes/Admin/Ayuda.tsx";
import VerPedido from "./views/Pedidos/VerPedido.tsx";
import LevantarPedido from "./views/Pedidos/LevantarPedido.tsx";
import PedidoCan from "./routes/PedidoCan.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/me",
        element: <Profile />,
      },
      {
        path: "/usuarios",
        element: <Usuario />,
      },
      {
        path: "/ayuda",
        element: <Ayuda />,
      },
      {
        path: "/levantarPedido",
        element: <LevantarPedido />,
      },
      {
        path: "/verPedido",
        element: <VerPedido />,
      },
      {
        path: "/pedidoCan",
        element: <PedidoCan />,
      }

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
