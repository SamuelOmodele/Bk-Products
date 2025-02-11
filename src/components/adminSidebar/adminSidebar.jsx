import React from 'react'
import styles from './adminSidebar.module.css'
import BkLogo from '../bkLogo/bkLogo.jsx'
import { Link, useNavigate } from 'react-router-dom'
import {RxDashboard} from "react-icons/rx";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { FaTruck } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { IoSettingsOutline } from "react-icons/io5";
import { setIsSignedIn, setRole } from '../../redux/authSlice.js';
import { IoClose } from "react-icons/io5";

const AdminSidebar = ({setShowSidebar}) => {
  
  let sidebarMenu =useSelector((state) => (state.sidebar.activeSidebarMenu));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('accessToken');
    dispatch(setRole(null));
    dispatch(setIsSignedIn(false));
    navigate('/sign-in')
  }

  return (
    <div className={styles['sidebar']}>

      {/* -- Logo --- */}
      <BkLogo imageSize={'45px'} headTextSize={'22px'} smallTextSize={'9.5px'}/>
      <IoClose size={24} className={styles['close-icon']} onClick={() => setShowSidebar(false)}/>

      {/* -- Sidebar items --- */}
      
      <div className={styles['sidebar-items']}>
        <p className={styles['main-menu-text']}>MAIN MENU</p>

        <Link to={'/admin/'} onClick={() => setShowSidebar(false)} className={(sidebarMenu ==='overview' ? styles['active'] : styles[''])} >
          <RxDashboard size={22}/> Overview
        </Link>
        <Link to={'/admin/orders'} onClick={() => setShowSidebar(false)} className={(sidebarMenu ==='orders' ? styles['active'] : styles[''])}>
          <MdOutlineShoppingCart size={22}/> Orders
        </Link>
        <Link to={'/admin/products'} onClick={() => setShowSidebar(false)} className={(sidebarMenu ==='products' ? styles['active'] : styles[''])}>
          <AiOutlineProduct size={22} /> Products
        </Link>
        <Link to={'/admin/delivery'} onClick={() => setShowSidebar(false)} className={(sidebarMenu ==='delivery' ? styles['active'] : styles[''])}>
          <FaTruck size={22} /> Delivery
        </Link>
        <Link to={'/admin/settings'} onClick={() => setShowSidebar(false)} className={(sidebarMenu ==='settings' ? styles['active'] : styles[''])}>
          <IoSettingsOutline size={22}/> Settings
        </Link>
        <Link onClick={logout} id={styles['logout1']}>
          <BiLogOutCircle size={22}/> Logout
        </Link>
        <p className={styles['logout']} onClick={logout} id={styles['logout2']}>
          <BiLogOutCircle size={22} /> Logout
        </p>
      </div>
    </div>
  )
}

export default AdminSidebar