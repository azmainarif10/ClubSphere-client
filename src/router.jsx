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
import EventPaymentSuccess from "./pages/payment/EventPaymentSuccess";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import RoleRoute from "./routes/RoleRoute";
import AdminHome from "./pages/Admin/AdminHome";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageClubs from "./pages/Admin/ManageClubs";
import AllPayments from "./pages/Admin/AllPayments";
import MemberHome from "./pages/Member/MemberHome";
import MyMemberships from "./pages/Member/MyMemberships";
import PaymentHistory from "./pages/Member/PaymentHistory";
import MyEvents from "./pages/Member/MyEvents";

 
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
        { path: "/event/payment-success", element: <EventPaymentSuccess/> },
     
    ],
  },

   {
    path:"/dashboard",
    element:(<PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>),
    children:[
      
     { path: "admin",element: (  <RoleRoute allowed={["admin"]}> <AdminHome /></RoleRoute> ),  },
      { path: "manage-users", element: <RoleRoute allowed={["admin"]}><ManageUsers /></RoleRoute> },
      { path: "manage-clubs", element: <RoleRoute allowed={["admin"]}><ManageClubs /></RoleRoute> },
      { path: "payments", element: <RoleRoute allowed={["admin"]}><AllPayments /></RoleRoute> },


      { path: "member", element: <RoleRoute allowed={["member"]}><MemberHome /></RoleRoute> },
      { path: "my-memberships", element: <RoleRoute allowed={["member"]}><MyMemberships /></RoleRoute> },
      { path: "my-events", element: <RoleRoute allowed={["member"]}><MyEvents /></RoleRoute> },
      { path: "payment-history", element: <RoleRoute allowed={["member"]}><PaymentHistory /></RoleRoute> },
    ]
   }
    
  
  ])

  export default router