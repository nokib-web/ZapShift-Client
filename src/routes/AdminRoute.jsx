import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading/Loading';
import useRole from '../hooks/useRole';

const AdminRoute = ({children}) => {
    const { loading}=useAuth();
    const {role, roleLoading} = useRole()

    if(loading || roleLoading){
        return <Loading></Loading>
    }
    if ( role!== 'admin'){
        return <div>Forbidden Access</div> // todo make a forbidden component
    }

    return children
};

export default AdminRoute;