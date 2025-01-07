import React from 'react'
import BkLogo from '../bkLogo/bkLogo'
import styles from './navbar.module.css'
import { MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <div className={styles['navbar']}>
      <div>
        <BkLogo imageSize={'50px'} headTextSize={'21px'} smallTextSize={'11px'} />
      </div>

      <div className={styles['menu-box']}>
        <p onClick={() => navigate('/')}>Home</p>
        <p>Shop</p>
        <p>About</p>
        <p>Contact</p>
      </div>

      <div className={styles['signin-cart-box']}>
        <button>
          <MdOutlineShoppingCart size={18} />
          Cart
        </button>
        <button className={styles['signin']} onClick={() => navigate('/sign-in')}>Sign in</button>
      </div>
    </div>
  )
}

export default Navbar