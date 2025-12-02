import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';


const AdminRoute = ({children}) => {
    const {loading}=useAuth();
    const {role,roleLoading}=useRole()

       if(loading || roleLoading){
    return <p className='text-4xl text-red-400'>Loading...</p>
   }

   if(role!=='admin'){
    return <div className='text-5xl text-red-400'>forbidden:Access Denied</div>
   }
    return children;
};

export default AdminRoute;