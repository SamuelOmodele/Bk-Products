import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Loader from '../loader/loader';
import styles from './protectedRoute.module.css'

const ProtectedRoute = ({children}) => {

  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const role = useSelector((state) => state.auth.role);

  if (!isSignedIn && role ==='pending'){
    return (
      <div className={styles['loading-container']}><Loader color={'#115ffc'} size={34}/> Please wait . . .</div>
    )
  }

  return isSignedIn ? children : <Navigate to={'/sign-in'} />

}

export default ProtectedRoute