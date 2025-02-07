import React from 'react'
import styles from './adminNavbar.module.css'
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import profileImg from "../../assets/profile-image-crop.jpg"
import { useNavigate } from 'react-router-dom';
import { CgMenuLeftAlt } from "react-icons/cg";

const AdminNavbar = ({setShowSidebar}) => {

  const navigate = useNavigate();

  return (
    <div className={styles['navbar-container']}>
      <CgMenuLeftAlt onClick={() => setShowSidebar(true)}  className={styles['menu-icon']}/>
        <p>Dashboard</p>
        <div className={styles['right-content']}>
            {/* <div className={styles['search-input']}>
                <input type="text" placeholder='Search . . . ' />
                <IoSearch size={20} className={styles['search-icon']}  />
            </div> */}
            <button className={styles['back']} onClick={() => navigate('/')}>Back to website</button>
            {/* <IoNotificationsOutline size={21} className={styles['notification-icon']} /> */}
            <img src={profileImg} className={styles['profile-image']} alt="" />
        </div>
    </div>
  )
}

export default AdminNavbar