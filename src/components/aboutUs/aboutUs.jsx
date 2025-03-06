import React, { useEffect } from 'react'
import { AiOutlineCustomerService } from 'react-icons/ai';
import { BiCheckShield } from "react-icons/bi";
import { MdOutlineLocalShipping } from 'react-icons/md';
import styles from './aboutUs.module.css'

const AboutUs = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0
        });
    }, []);

    return (
        <div className={styles['about-us-section']}>
            <h2>About Us</h2>
            <p className={styles['about']}>
                {/* At BK Products, we are passionate about redefining your shopping experience. Founded with a vision to bring convenience and innovation to every household, we strive to offer a seamless online shopping platform that combines quality, affordability, and exceptional service. Our product range is carefully curated to meet your everyday needs, from home essentials to cutting-edge gadgets. We believe that shopping should be stress-free, enjoyable, and accessible to everyone */}
                At BK Products, we are committed to pushing the boundaries of innovation and delivering high-quality solutions for modern living. Our products are designed with precision, ensuring durability, reliability, and performance that you can trust.
                With a passion for excellence, we blend cutting-edge technology with user-centric designs, making everyday tasks simpler and more efficient. Whether it's home appliances, gadgets, or smart solutions, BK Products is dedicated to enhancing your lifestyle with innovation you can rely on.
                Join us on this journey of excellence—experience innovation, experience BK.
            </p>
            <div className={styles['about-us-features']}>
                <div className={styles['feature']}>
                    <BiCheckShield className={styles['feature-icon']} />
                    <h3>Quality Assurance</h3>
                    <p>Experience top-tier products designed for durability, reliability, and performance.</p>
                </div>
                <div className={styles['feature']}>
                    <MdOutlineLocalShipping className={styles['feature-icon']} />
                    <h3>Convenience</h3>
                    <p>Enjoy a seamless shopping experience with fast, hassle-free delivery</p>
                </div>
                <div className={styles['feature']}>
                    <AiOutlineCustomerService className={styles['feature-icon']} />
                    <h3>Support</h3>
                    <p>Get expert assistance anytime to ensure a smooth shopping experience.</p>
                </div>
            </div>
        </div>
    )
}

export default AboutUs