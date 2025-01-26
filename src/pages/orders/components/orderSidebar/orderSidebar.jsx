import React from 'react'
import styles from './orderSidebar.module.css'
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const OrderSidebar = () => {

    const navigate = useNavigate();
    const location = useLocation();

  return (
    <div className={styles['sidebar']}>
        <p onClick={() => navigate('/orders')} className={location.pathname === '/orders' ? styles['active'] : ''}>All Orders</p>
        <p onClick={() => navigate('/orders/open')} className={location.pathname === '/orders/open' ? styles['active'] : ''}>Open Orders</p>
        <p onClick={() => navigate('/orders/closed')} className={location.pathname === '/orders/closed' ? styles['active'] : ''}>Closed Orders</p>
        <p className={styles['to-cart']} onClick={() => navigate('/cart')}><IoArrowBackOutline size={18}/> Cart</p>
    </div>
  )
}

export default OrderSidebar