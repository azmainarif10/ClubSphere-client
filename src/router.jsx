import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Register from "./pages/Auth/register";
import Login from "./pages/Auth/login";
import Home from "./pages/Home/Home";
import Club from "./pages/CLubs/Club";

 
  const router = createBrowserRouter([

    {
    path: "/",
    element: <MainLayout />,
    children: [
       { path: "/", element: <Home/> },
       { path: "/clubs", element: <Club /> },
       { path: "/login", element: <Login /> },
       { path: "/register", element: <Register /> },
     
    ],
  },
  ])

  export default router