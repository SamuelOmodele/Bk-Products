import React from 'react'
import { AiOutlineCustomerService } from 'react-icons/ai';
import { BiCheckShield } from "react-icons/bi";
import { MdOutlineLocalShipping } from 'react-icons/md';
import styles from './aboutUs.module.css'

const AboutUs = () => {
    return (
        <div className={styles['about-us-section']}>
            <h2>About Us</h2>
            <p className={styles['about']}>At BK Products, we are passionate about redefining your shopping experience. Founded with a vision to bring convenience and innovation to every household, we strive to offer a seamless online shopping platform that combines quality, affordability, and exceptional service. Our product range is carefully curated to meet your everyday needs, from home essentials to cutting-edge gadgets. We believe that shopping should be stress-free, enjoyable, and accessible to everyone</p>
            <div className={styles['about-us-features']}>
                <div className={styles['feature']}>
                    <BiCheckShield className={styles['feature-icon']} />
                    <h3>Quality Assurance</h3>
                    <p>We offer quality products from trusted brands.</p>
                </div>
                <div className={styles['feature']}>
                    <MdOutlineLocalShipping className={styles['feature-icon']} />
                    <h3>Convenience</h3>
                    <p>Simplified shopping process with fast delivery and easy returns.</p>
                </div>
                <div className={styles['feature']}>
                    <AiOutlineCustomerService className={styles['feature-icon']} />
                    <h3>Support</h3>
                    <p>Providing top-notch assistance whenever you need it.</p>
                </div>
            </div>
        </div>
    )
}

export default AboutUs