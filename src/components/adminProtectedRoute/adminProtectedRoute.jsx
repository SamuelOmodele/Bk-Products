import React from 'react'
import styles from './adminProtectedRoute.module.css'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../loader/loader';

const AdminProtectedRoute = ({ children }) => {

    const isSignedIn = useSelector((state) => state.auth.isSignedIn);
    const role = useSelector((state) => state.auth.role);

    if (!isSignedIn) {
        if (role === 'pending') {
            return (
                <div className={styles['loading-container']}><Loader color={'#115ffc'} size={34} /> Please wait . . .</div>
            )
        }
        if (!role) {
            return (
                <Navigate to={'/sign-in'} />
            )
        }
    }

    if (isSignedIn) {
        if (role === 'admin' || role ==='super-admin'){
            return children
        }
        if (role === 'user'){
            return(
                <Navigate to={'/'} />
            )
        }
    }

}

export default AdminProtectedRoute