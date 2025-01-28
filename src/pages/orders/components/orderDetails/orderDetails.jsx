import React, { useState } from 'react'
import styles from './orderDetails.module.css'
import { FiInfo } from 'react-icons/fi';
import { FaBoxOpen, FaShippingFast } from 'react-icons/fa';
import watchImage from '../../../../assets/wrist-watch.jpg'
import payment_receipt from '../../../../assets/payment_receipt.jpg'
import map from '../../../../assets/map2.jpg'
import locationIcon from '../../../../assets/location-icon.png'

const OrderDetails = () => {

    const [modalTab, setModalTab] = useState('1')

    return (
        <div >

            {/* --- MODAL TAB --- */}
            <div className={styles['modal-tab-container']}>
                <p className={modalTab === '1' ? styles['active-modal-tab'] : styles['']} onClick={() => setModalTab('1')}><FiInfo size={20} /> Info</p>
                <p className={modalTab === '2' ? styles['active-modal-tab'] : styles['']} onClick={() => setModalTab('2')}> <FaBoxOpen size={20} />Products</p>
                <p className={modalTab === '3' ? styles['active-modal-tab'] : styles['']} onClick={() => setModalTab('3')}> <FaShippingFast size={20} />Delivery</p>
            </div>

            {/* --- ORDER INFO TAB --- */}
            {modalTab === '1' && <div>
                <div className={styles['order-info-tab-section']}>
                    <p className={styles['order-info-tab-heading']}>Customer info</p>

                    <p className={styles['order-info-tab-label']}><span>Name</span> <span>Omodele Samuel</span></p>
                    <p className={styles['order-info-tab-label']}><span>Email</span> <span>abc@gmail.com</span></p>
                    <p className={styles['order-info-tab-label']}><span>Phone no.</span> <span>08012347890</span></p>
                </div>
                <div className={styles['order-info-tab-section']}>
                    <p className={styles['order-info-tab-heading']}>Order info</p>

                    <p className={styles['order-info-tab-label']}><span>Order date</span> <span>Dec 6, 2024, 10:00AM</span></p>
                    <p className={styles['order-info-tab-label']}><span>Status</span> <span style={{ color: '#F77C27' }}>pending</span></p>
                    <p className={styles['order-info-tab-label']}><span>Product Amount</span> <span>$75,000</span></p>
                    <p className={styles['order-info-tab-label']}><span>Shipping fee</span> <span>$400</span></p>
                    <p className={styles['order-info-tab-label']}><span>Total</span> <span>$75,400</span></p>
                    <p className={styles['order-info-tab-label']}><span>Payment status</span> <span style={{ color: '#F77C27' }}>submitted</span></p>
                </div>

                <div className={styles['order-info-tab-section']}>
                    <p className={styles['order-info-tab-heading']}>Payment Proof</p>
                    <img src={payment_receipt} className={styles['payment-receipt-image']} alt="" />
                    <div className={styles['validate-payment-container']}>
                        <p className={styles['validate-payment-text']}>validate payment</p>
                        <button className={styles['verify']}>Verify</button>
                        <button className={styles['reject']}>Reject</button>
                    </div>
                </div>

            </div>}

            {modalTab === '2' && <div>
                <div className={styles['order-info-tab-section']}>
                    <p className={styles['order-info-tab-heading']}>Items</p>


                    <div className={styles['order-info-tab-label']} style={{ alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <div style={{ width: '60px' }}><img src={watchImage} alt="" className={styles['product-image']} /></div>

                            <div>
                                <p style={{ fontSize: '15px', fontWeight: '500' }}>Wrist Watch</p>
                                <p style={{ fontSize: '13px' }}>Accessories</p>
                                <p style={{ fontSize: '13.5px' }}>$2,500/unit</p>
                            </div>
                        </div>
                        <p>2 units</p>
                        <p>$5,000</p>
                    </div>
                    <div className={styles['order-info-tab-label']} style={{ alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <div style={{ width: '60px' }}><img src={watchImage} alt="" className={styles['product-image']} /></div>

                            <div>
                                <p style={{ fontSize: '15px', fontWeight: '500' }}>Wrist Watch</p>
                                <p style={{ fontSize: '13px' }}>Accessories</p>
                                <p style={{ fontSize: '13.5px' }}>$2,500/unit</p>
                            </div>
                        </div>
                        <p>2 units</p>
                        <p>$5,000</p>
                    </div>
                    <div className={styles['order-info-tab-label']} style={{ alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <div style={{ width: '60px' }}><img src={watchImage} alt="" className={styles['product-image']} /></div>

                            <div>
                                <p style={{ fontSize: '15px', fontWeight: '500' }}>Wrist Watch</p>
                                <p style={{ fontSize: '13px' }}>Accessories</p>
                                <p style={{ fontSize: '13.5px' }}>$2,500/unit</p>
                            </div>
                        </div>
                        <p>2 units</p>
                        <p>$5,000</p>
                    </div>

                </div>
                <div className={styles['order-info-tab-label']} style={{ alignItems: 'center', fontSize: '15.5px', fontWeight: '500', marginBottom: '15px' }}>
                    <p>Total Product amount:</p>
                    <p>$15,000</p>
                </div>
            </div>}

            {modalTab === '3' && <div style={{ marginBottom: '15px', position: 'relative' }}>
                <img src={map} alt="" style={{ height: '150px', width: '100%', borderRadius: '10px', marginBottom: '10px', border: '1.5px solid rgba(17, 95, 252, 0.2)' }} />
                <img src={locationIcon} alt="" style={{ position: 'absolute', top: '30px', left: '150px', width: '80px' }} />
                <p style={{ fontSize: '20px', fontWeight: '600' }}>Lagos State</p>
                <p style={{ fontSize: '13px', padding: '5px 0' }}>Delivery takes 4 - 5 working days </p>
                {/* <p style={{ fontSize: '13px', padding: '5px 0' }}>Delivery date: Jan 1 2025 (1:00PM)</p> */}
                <p style={{ fontSize: '16px', fontWeight: '500', display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid #E6E6E6', padding: '10px 0', marginTop: '10px' }}><span>Shipping Fee</span><span>$450</span></p>
            </div>}

        </div>
    )
}

export default OrderDetails