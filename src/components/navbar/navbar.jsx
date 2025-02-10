import React, { useEffect, useState } from 'react'
import BkLogo from '../bkLogo/bkLogo'
import styles from './navbar.module.css'
import { MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { useSelector } from 'react-redux';
import Loader from '../loader/loader';

const Navbar = ({ active }) => {

  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const role = useSelector((state) => state.auth.role);

  return (
    <div className={styles['navbar']}>
      <div>
        <BkLogo imageSize={'50px'} headTextSize={'21px'} smallTextSize={'11px'} />
      </div>

      {/* --- INLINE MENU --- */}
      <div className={styles['menu-box']}>
        <p onClick={() => navigate('/')} className={active === 'home' ? styles['active'] : ''} >Home</p>
        <p onClick={() => navigate('/shop')} className={active === 'shop' ? styles['active'] : ''}>Shop</p>
        <p onClick={() => navigate('/about')} className={active === 'about' ? styles['active'] : ''}>About</p>
        <p onClick={() => navigate('/contact')} className={active === 'contact' ? styles['active'] : ''}>Contact</p>
      </div>

      <div className={styles['signin-cart-box']}>
        <button onClick={() => navigate('/cart')}>
          <MdOutlineShoppingCart size={18} />
          Cart
        </button>
        {role ==='pending' && <Loader color={'#115ffc'} size={24} />}
        {!role && <button className={styles['signin']} onClick={() => navigate('/sign-in')}>Sign in</button>}
        {role === 'admin' && <div className={styles['dashboard-account']} onClick={() => navigate('/admin') }>Dashboard <LuSquareArrowOutUpRight size={16}/></div>}
        {role === 'user' && <div className={styles['dashboard-account']} onClick={() => navigate('/cart') }>My Account <LuSquareArrowOutUpRight size={16}/></div>}
      </div>

      <IoMenu size={26} className={styles['menu-icon']} onClick={() => setMobileMenu(mobileMenu => !mobileMenu)}/>

      {/* --- BLOCK MENU --- */}
      {mobileMenu && 
      <div className={styles['mobile-menu']}>
        <p onClick={() => navigate('/')} className={active === 'home' ? styles['active'] : ''} >Home</p>
        <p onClick={() => navigate('/shop')} className={active === 'shop' ? styles['active'] : ''}>Shop</p>
        <p onClick={() => navigate('/about')} className={active === 'about' ? styles['active'] : ''}>About</p>
        <p onClick={() => navigate('/contact')} className={active === 'contact' ? styles['active'] : ''}>Contact</p>
        <button onClick={() => navigate('/cart')}>
          <MdOutlineShoppingCart size={18} />
          Cart
        </button>
        {role ==='pending' && <Loader color={'#115ffc'} size={24} />}
        {!role && <button className={styles['signin']} onClick={() => navigate('/sign-in')}>Sign in</button>}
        {role === 'admin' && <div className={styles['dashboard-account']} onClick={() => navigate('/admin') }>Dashboard <LuSquareArrowOutUpRight size={16}/></div>}
        {role === 'user' && <div className={styles['dashboard-account']} onClick={() => navigate('/cart') }>My Account <LuSquareArrowOutUpRight size={16}/></div>}
      </div>}
    </div>
  )
}

export default Navbar