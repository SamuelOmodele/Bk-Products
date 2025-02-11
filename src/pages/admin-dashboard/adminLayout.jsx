import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../../components/adminSidebar/adminSidebar'
import styles from './adminLayout.module.css'
import AdminNavbar from '../../components/adminNavbar/adminNavbar'

const AdminLayout = () => {

  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <div className={styles['page']}>
      <div style={{marginLeft: showSidebar ? '0' : ''}} className={styles['sidebar-container']}>
        <AdminSidebar setShowSidebar={setShowSidebar} />
      </div>
      <div className={styles['outlet-container']}>
        <div className={styles['navbar']}><AdminNavbar setShowSidebar={setShowSidebar} /></div>
        <div className={styles['component-container']}>
          <Outlet />
        </div>
        
      </div>
    </div>
  )
}

export default AdminLayout