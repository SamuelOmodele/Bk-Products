import React from 'react'
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styles from './footer.module.css'
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";


const Footer = () => {
    return (
        <div className={styles['footer-section']}>
            <div className={styles['upper-section']}>
                <div className={styles['left']}>
                    <img src="/BK_logo.png" alt="logo" />
                    <h4>BK Products</h4>
                    <p>Experience innovation with BK</p>
                </div>
                <div className={styles['right']}>
                    <div className={styles['links']}>
                        <p>Contact</p>
                        <p><FaPhoneAlt size={18} /> 08012345678</p>
                        <p><IoIosMail size={18} /> bkproducts@gmail.com</p>
                        <p><IoLocationSharp size={18} /> Lagos, Nigeria</p>
                    </div>
                    <div className={styles['links']}>
                        <p>Get Help</p>
                        <p>Online shopping giude</p>
                        <p>Customer support</p>
                    </div>

                    <div className={styles['links']}>
                        <p>Follow us</p>
                        <p><FaFacebook size={22} /> Facebook</p>
                        <p><FaInstagram size={22} /> Instagram</p>
                        <p><FaXTwitter size={22} />Twitter</p>
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