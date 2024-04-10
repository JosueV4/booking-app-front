import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import HotelDetail from "./pages/HotelDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Bookings from "./pages/Bookings";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/hotels/:id",
                element: <HotelDetail />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/bookings",
                element: <ProtectedRoute><Bookings /></ProtectedRoute>
            },
        ]
    },
])

export default router;
