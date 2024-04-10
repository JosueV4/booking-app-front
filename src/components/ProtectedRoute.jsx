import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({children}) => {

    const token = useSelector(state => state.app.token);

    if (!token) {
        toast('You need to be logged in order to access this page!', {
            theme: 'dark',
            type: 'error',
        })
        return <Navigate to='/login' />
    }
    return children
}

export default ProtectedRoute