import React from 'react'
import styles from './adminSidebar.module.css'
import BkLogo from '../bkLogo/bkLogo.jsx'
import { Link } from 'react-router-dom'
import {RxDashboard} from "react-icons/rx";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { FaTruck } from "react-icons/fa";

const AdminSidebar = () => {

  const location = useLocation().pathname;

  return (
    <div className={styles['sidebar']}>

      {/* -- Logo --- */}
      <BkLogo imageSize={'45px'} headTextSize={'22px'} smallTextSize={'9.5px'}/>

      {/* -- Sidebar items --- */}
      
      <div className={styles['sidebar-items']}>
        <p style={{marginBottom: '15px', color: '#aaa', fontSize: '14px', fontWeight: '400'}}>MAIN MENU</p>

        <Link  className={(location === '/admin' || location === '/admin/' ? styles['active'] : styles[''])} to={'/admin/'}>
          <RxDashboard size={22}/> Overview
        </Link>
        <Link to={'/admin/orders'} className={(location === '/admin/orders' || location === '/admin/orders/' ? styles['active'] : styles[''])}>
          <MdOutlineShoppingCart size={22}/> Orders
        </Link>
        <Link >
          <AiOutlineProduct size={22} /> Products
        </Link>
        <Link >
          <FaTruck size={22} /> Shipping
        </Link>
        <Link >
          <FaRegUserCircle size={22}/> My Account
        </Link>
        <Link className={styles['logout']}>
          <BiLogOutCircle size={22} /> Logout
        </Link>
      </div>
    </div>
  )
}

export default AdminSidebar