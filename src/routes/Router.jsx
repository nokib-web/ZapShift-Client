import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Rider from "../pages/Rider/Rider";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCanceled from "../pages/Dashboard/Payment/PaymentCanceled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRider from "../pages/Dashboard/ApproveRider/ApproveRider";
import UserManagement from "../pages/Dashboard/UsersManagement/UserManagement";
import AdminRoute from "./AdminRoute";
import AssignRider from "../pages/Dashboard/AssignRider/AssignRider";
import RiderRoute from "./RiderRoute";
import AssignedDeliveries from "../pages/Dashboard/AssignedDeliveries/AssignedDeliveries";


const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home

            },
            {
                path: "coverage",
                Component: Coverage,
                loader: () => fetch('/serviceCenters.json').then(res => res.json())

            },
            {
                path: "rider",
                element: <PrivateRoute><Rider /></PrivateRoute>,
                loader: () => fetch('/serviceCenters.json').then(res => res.json())
            },
            {
                path: "send-parcel",
                element: <PrivateRoute><SendParcel /></PrivateRoute>,
                loader: () => fetch('/serviceCenters.json').then(res => res.json())
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register

            }
        ]
    },


    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'my-parcels',
                Component: MyParcels
            },
            {
                path: 'payment/:parcelId',
                Component: Payment

            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-canceled',
                Component: PaymentCanceled
            },
            {
                path: 'payment-history',
                Component: PaymentHistory,
            },
            {
                path:'assigned-deliveries',
                element: <RiderRoute><AssignedDeliveries></AssignedDeliveries></RiderRoute>
            },
            {
                path: 'approve-rider',
                element: <AdminRoute><ApproveRider></ApproveRider></AdminRoute>
            },
            {
                path: 'assign-rider',
                element: <AdminRoute><AssignRider></AssignRider></AdminRoute>
            },
            {
                path: 'user-management',
                // Component: UserManagement
                element: <AdminRoute><UserManagement></UserManagement></AdminRoute>
            }
        ]
    }
]);
export default router;