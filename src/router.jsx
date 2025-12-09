import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Register from "./pages/Auth/register";
import Login from "./pages/Auth/login";
import Home from "./pages/Home/Home";
import Club from "./pages/CLubs/Club";
import ClubDetails from "./pages/CLubs/ClubDetails";
import PaymentSuccess from "./pages/payment/paymentSuccess";
import Events from "./pages/Events/Events";
import EventDetails from "./pages/Events/EventDetails";

 
  const router = createBrowserRouter([

    {
    path: "/",
    element: <MainLayout />,
    children: [
       { path: "/", element: <Home/> },
       { path: "/clubs", element: <Club /> },
      { path: "/clubs/:id", element: <ClubDetails /> },
       { path: "/events", element: <Events /> },
        { path: "/events/:id", element: <EventDetails /> },
       { path: "/login", element: <Login /> },
       { path: "/register", element: <Register /> },
        { path: "/payment-success", element: <PaymentSuccess /> },
     
    ],
  },
  ])

  export default router