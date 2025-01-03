import React from 'react'
import styles from './adminSidebar.module.css'
import BkLogo from '../bkLogo/bkLogo.jsx'
import { Link } from 'react-router-dom'
import {RxDashboard} from "react-icons/rx";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { FaTruck } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { IoSettingsOutline } from "react-icons/io5";

const AdminSidebar = () => {
  
  let sidebarMenu =useSelector((state) => (state.sidebar.activeSidebarMenu))

  return (
    <div className={styles['sidebar']}>

      {/* -- Logo --- */}
      <BkLogo imageSize={'45px'} headTextSize={'22px'} smallTextSize={'9.5px'}/>

      {/* -- Sidebar items --- */}
      
      <div className={styles['sidebar-items']}>
        <p className={styles['main-menu-text']}>MAIN MENU</p>

        <Link  className={(sidebarMenu ==='overview' ? styles['active'] : styles[''])} to={'/admin/'}>
          <RxDashboard size={22}/> Overview
        </Link>
        <Link to={'/admin/orders'} className={(sidebarMenu ==='orders' ? styles['active'] : styles[''])}>
          <MdOutlineShoppingCart size={22}/> Orders
        </Link>
        <Link to={'/admin/products'} className={(sidebarMenu ==='products' ? styles['active'] : styles[''])}>
          <AiOutlineProduct size={22} /> Products
        </Link>
        <Link to={'/admin/delivery'} className={(sidebarMenu ==='delivery' ? styles['active'] : styles[''])}>
          <FaTruck size={22} /> Delivery
        </Link>
        <Link to={'/admin/settings'} className={(sidebarMenu ==='settings' ? styles['active'] : styles[''])}>
          <IoSettingsOutline size={22}/> Settings
        </Link>
        <Link to={'/sign-in'} className={styles['logout']}>
          <BiLogOutCircle size={22} /> Logout
        </Link>
      </div>
    </div>
  )
}

export default AdminSidebar