import React from 'react'
import styles from './adminNavbar.module.css'
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const AdminNavbar = () => {
  return (
    <div className={styles['navbar-container']}>
        <p>Hello, Samuel</p>
        <div className={styles['right-content']}>
            <div className={styles['search-input']}>
                <input type="text" placeholder='Search . . . ' />
                <IoSearch size={20} className={styles['search-icon']}  />
            </div>
            <IoNotificationsOutline size={21} style={{color: '#493C6F'}} />
            <FaRegUserCircle size={20} />
        </div>
    </div>
  )
}

export default AdminNavbar