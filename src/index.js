import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";

import NewRecipeForm from "./Pages/NewRecipeForm";
import RecipeUpdater from "./Pages/RecipeUpdater";
import RecipeList from "./Pages/RecipeList";
import MealPlan from "./Pages/MealPlan"
import OneRecipeCard from "./Components/OneRecipeCard";

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
        element: <NewRecipeForm />,
      },
      {
        path: "/update/:id",
        element: <RecipeUpdater />,
      },
      {
        path: "/mealplan",
        element: <MealPlan />
      },
      {
        path: "/recipes/:id",
        element: <OneRecipeCard />
      }     
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


