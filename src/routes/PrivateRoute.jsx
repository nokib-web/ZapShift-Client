import React from 'react';
import useAuth from '../hooks/useAuth';
import Link from 'daisyui/components/link';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const {user, loading} = useAuth();

    const location = useLocation()
    

    if(loading){
        return <div><span className="loading loading-infinity items-center loading-xl"></span></div>;
    }
    if(!user){
        return <Navigate state={location.pathname} to="/login" replace />;
     
    }

    return children;
};

export default PrivateRoute;