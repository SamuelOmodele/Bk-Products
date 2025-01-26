import React from 'react'
import styles from './orders.module.css'
import Navbar from '../../components/navbar/navbar'
import OrderSidebar from './components/orderSidebar/orderSidebar'
import { Outlet } from 'react-router-dom'

const Orders = () => {
  return (
    <div>
      <Navbar />
      <div className={styles['content-page']}>
        <div className={styles['orders-page']}>
          <div className={styles['orders-page-sidebar']}>
            <OrderSidebar />
          </div>
          <div className={styles['orders-page-content']}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders