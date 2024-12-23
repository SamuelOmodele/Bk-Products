import React from 'react'
import styles from './adminSidebar.module.css'
import BkLogo from '../bkLogo/bkLogo.jsx'
import { Link } from 'react-router-dom'
import {RxDashboard} from "react-icons/rx";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { AiOutlineDollar } from "react-icons/ai";

const AdminSidebar = () => {
  return (
    <div className={styles['sidebar']}>

      {/* -- Logo --- */}
      <BkLogo imageSize={'45px'} headTextSize={'22px'} smallTextSize={'9.5px'}/>

      {/* -- Sidebar items --- */}
      
      <div className={styles['sidebar-items']}>
      <p style={{marginBottom: '15px', color: '#aaa', fontSize: '14px', fontWeight: '400'}}>MAIN MENU</p>
        <Link className={styles['active']}>
          <RxDashboard size={22}/> Overview
        </Link>
        <Link>
          <MdOutlineShoppingCart size={22}/> Orders
        </Link>
        <Link>
          <AiOutlineProduct size={22}/> Products
        </Link>
        <Link>
          <AiOutlineDollar size={22}/> Sales
        </Link>
        <Link>
          <FaRegUserCircle size={22}/> Profile
        </Link>
        <Link>
          <BiLogOutCircle size={22}/> Logout
        </Link>
      </div>
    </div>
  )
}

export default AdminSidebar