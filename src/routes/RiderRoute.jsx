import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading/Loading';

const RiderRoute = ({children}) => {
    const { loading, user }=useAuth();
    const {role, roleLoading} = useRole()

    if(loading || !user || roleLoading){
        return <Loading></Loading>
    }
    if ( role!== 'rider'){
        return <div>Forbidden Access</div> // todo make a forbidden component
    }

    return children
};

export default RiderRoute;