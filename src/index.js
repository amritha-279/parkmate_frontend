import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./Pages/Login";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Parking from "./Pages/Parking";
import Records from "./Pages/Records";
import Contact from "./Pages/Contact";
import ProtectedRoute from "./Pages/ProtectedRoute";
import ParkingForm from "./Pages/ParkingForm";

const routerVariables = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/home", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/parking", element: <Parking /> },
      { path: "/parking/:slotId", element: <Parking /> },
      {
        path: "/addParking",
        element: (
          <ProtectedRoute>
            <ParkingForm />
          </ProtectedRoute>
        ),
      },
      { path: "/records", element: <Records /> },
      { path: "/contact", element: <Contact /> },
      { path: "*", element: <h1>Page not found Please check your URL</h1> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={routerVariables} />
  </React.StrictMode>
);
