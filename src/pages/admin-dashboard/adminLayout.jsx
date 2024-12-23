import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../../components/adminSidebar/adminSidebar'
import styles from './adminLayout.module.css'
import AdminNavbar from '../../components/adminNavbar/adminNavbar'

const AdminLayout = () => {
  return (
    <div className={styles['page']}>
      <div className={styles['sidebar-container']}>
        <AdminSidebar />
      </div>
      <div className={styles['outlet-container']}>
        <AdminNavbar />
        <div className={styles['component-container']}>
          <Outlet />
        </div>
        
      </div>
    </div>
  )
}

export default AdminLayout