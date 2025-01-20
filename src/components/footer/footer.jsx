import React from 'react'
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styles from './footer.module.css'


const Footer = () => {
  return (
    <div className={styles['footer-section']}>
        <div className={styles['upper-section']}>
            <div className={styles['left']}>
                <img src="/BK_Logo.png" alt="logo" />
                <h4>BK Products</h4>
                <p>Experience innovation with BK</p>
            </div>
            <div className={styles['right']}>
                <div className={styles['links']}>
                    <p>Quick Links</p>
                    <p>Home</p>
                    <p>About</p>
                    <p>Shop</p>
                    <p>Contact</p>
                </div>
                <div className={styles['links']}>
                    <p>Social Media</p>
                    <p><FaFacebook size={22} /></p>
                    <p><FaInstagram size={22}/></p>
                    <p><FaXTwitter size={22}/></p>
                </div>
            </div>
        </div>
        <div className={styles['lower-section']}>
            &copy; 2025 BK Products. All Rights Reserved. | Designed by BK Team
        </div>
    </div>
  )
}

export default Footer