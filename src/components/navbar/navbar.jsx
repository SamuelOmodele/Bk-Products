import React, { useState } from 'react'
import BkLogo from '../bkLogo/bkLogo'
import styles from './navbar.module.css'
import { MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";

const Navbar = ({ active }) => {

  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

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
        <button className={styles['signin']} onClick={() => navigate('/sign-in')}>Sign in</button>
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
        <button className={styles['signin']} onClick={() => navigate('/sign-in')}>Sign in</button>
      </div>}
    </div>
  )
}

export default Navbar