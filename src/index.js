import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";

import RecipeCreator from "./Pages/RecipeCreator";
import RecipeUpdater from "./Pages/RecipeUpdater";
import RecipeList from "./Pages/RecipeList";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <RecipeList />,
      },
      {
        path: "/create",
        element: <RecipeCreator />,
      },
      {
        path: "/update/:id",
        element: <RecipeUpdater />,
      },
     
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


