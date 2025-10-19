import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import './index.css'
import App from "./App.jsx";
import Authors from "./pages/Authors.jsx";
import Author from "./pages/Author.jsx";
import Books from "./pages/Books.jsx";
import Book from "./pages/Book.jsx";
import Genders from "./pages/Genders.jsx";
import Gender from "./pages/Gender.jsx";
import Loans from "./pages/Loans.jsx";
import Loan from "./pages/Loan.jsx";
import Users from "./pages/Users.jsx";
import User from "./pages/User.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/authors",
        element: <Authors />,
      },
      {
        path: "/authors/:id",
        element: <Author />,
      },
      {
        path: "/authors/create",
        element: <Author />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/books/:id",
        element: <Book />,
      },
      {
        path: "/books/create",
        element: <Book />,  
      },
      {
        path: "/genders",
        element: <Genders />,
      },
      {
        path: "/genders/:id",
        element: <Gender />,
      },
      {
        path: "/genders/create",
        element: <Gender />,
      },
      {
        path: "/loans",
        element: <Loans />,
      },
      {
       path: "/loans/:id",
       element: <Loan />,
      },
      {
       path: "/loans/create",
       element: <Loan />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/:id",
        element: <User />,
      },
      {
        path: "/users/create",
        element: <User />,
      },
      {
        path: "*",
        element: <h1>Page not found</h1>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <RouterProvider router={router} />
  </StrictMode>
);
