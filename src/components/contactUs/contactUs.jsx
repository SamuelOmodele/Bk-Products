import React, { useEffect } from 'react'
import styles from './contactUs.module.css'
import customer_support from '../../assets/customer-support.jpg';
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const ContactUs = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0
        });
    }, []);

    return (
        <div className={styles['contact-us']}>

            <div className={styles['contact-us-upper-section']}>
                <div className={styles['section-text']}>
                    <img src={'BK_logo.png'} className={styles['logo-img']} alt="logo" />
                    <h3>Get in touch</h3>
                    <p>Want to get in touch? We'd love to hear from you.</p>
                    <p>Reach out to us through any of our contacts </p>
                </div>
                <img src={customer_support} alt="" />
            </div>
            <div className={styles['contact-us-lower-section']}>
                <div className={styles['contact-us-card']}>
                    <FaPhoneAlt className={styles['contact-icon']} />
                    <p className={styles['card-main-text']}>via Phone</p>
                    <p className={styles['card-description-text']}>Reach us via any of our contact lines </p>
                    <p className={styles['bold']}>08012345678</p>
                    <p className={styles['bold']}>08012345678</p>
                </div>
                <div className={styles['contact-us-card']}>
                    <IoIosMail className={styles['contact-icon']} />
                    <p className={styles['card-main-text']}>via Email</p>
                    <p className={styles['card-description-text']}>Reach us via email</p>
                    <p className={styles['bold']}>bkproducts@gmail.com</p>
                </div>
            </div>
        </div>
    )
}

export default ContactUs