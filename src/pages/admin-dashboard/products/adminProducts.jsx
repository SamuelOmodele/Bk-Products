import React, { useEffect } from 'react';
import styles from './adminProducts.module.css'
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveSidebarMenu } from '../../../redux/sidebarSlice';

const AdminProducts = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveSidebarMenu('products'));
  }, [])

  return (
    <div className={styles['products-page']}>
      <p className={styles['main-text']}>Products</p>
      <Outlet />
    </div>
  )
}

export default AdminProducts