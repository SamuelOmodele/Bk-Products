import React from 'react'
import styles from './homeFeatures.module.css'
import { RiCustomerServiceLine, RiSecurePaymentLine } from 'react-icons/ri'
import { FaShippingFast } from 'react-icons/fa'

const HomeFeatures = () => {
    return (
        <div className={styles['features-component']}>
            <h2>We Provide</h2>
            <div className={styles['home-features-container']}>
                <div className={styles['feature']}>
                    <RiCustomerServiceLine className={styles['feature-icon']} size={32} />
                    <div className={styles['feature-text']}>
                        <h3>Customer Support</h3>
                        <p>Get prompt assistance with our responsive customer support team 24/7</p>
                    </div>
                </div>
                <div className={styles['feature']}>
                    <RiSecurePaymentLine className={styles['feature-icon']} size={32} />
                    <div className={styles['feature-text']}>
                        <h3>Easy Payment</h3>
                        <p>Place your order and complete your purchase through a simple bank transfer.</p>
                    </div>
                </div>
                <div className={styles['feature']}>
                    <FaShippingFast className={styles['feature-icon']} size={32} />
                    <div className={styles['feature-text']}>
                        <h3>Fast Delivery</h3>
                        <p>Get your orders delivered quickly and efficiently with our fast delivery service</p>
                    </div>
                </div>
                {/* <div className={styles['feature']}>
                <RiCustomerServiceLine className={styles['feature-image']} />
                <div className={styles['feature-text']}>
                    <h3>Responsive</h3>
                    <p>Customer service available 24/7</p>
                </div>
            </div> */}
            </div>


        </div>
    )
}

export default HomeFeatures