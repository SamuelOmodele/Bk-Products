import React, { useState } from 'react'
import styles from './orderDetails.module.css'
import { FiInfo } from 'react-icons/fi';
import { FaBoxOpen, FaShippingFast } from 'react-icons/fa';
import watchImage from '../../../../assets/wrist-watch.jpg'
import payment_receipt from '../../../../assets/payment_receipt.jpg'
import map from '../../../../assets/map2.jpg'
import locationIcon from '../../../../assets/location-icon.png'

const OrderDetails = () => {

    const [modalTab, setModalTab] = useState('1');

    const products = [
        {
            name: 'SUN8 Generic Mens Wrist Watch',
            image: watchImage,
            category: 'Gadgets',
            pricePerUnit: '$500',
            numOfUnit: 2,
            totalPrice: '$1,000.00'
        },
        {
            name: 'SUN8 Generic Mens Wrist Watch',
            image: watchImage,
            category: 'Gadgets',
            pricePerUnit: '$250',
            numOfUnit: 2,
            totalPrice: '$500.00'
        },
        {
            name: 'SUN8 Generic Mens Wrist Watch',
            image: watchImage,
            category: 'Gadgets',
            pricePerUnit: '$250',
            numOfUnit: 2,
            totalPrice: '$500.00'
        },
    ]

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

                    <p className={styles['order-info-tab-label']}><span>Order ID</span> <span>#1MAS029D8</span></p>
                    <p className={styles['order-info-tab-label']}><span>Order date</span> <span>Dec 12, 2024, 10:00AM</span></p>
                    <p className={styles['order-info-tab-label']}><span>Status</span> <span style={{ color: '#F77C27' }}>pending</span></p>
                    <p className={styles['order-info-tab-label']}><span>Product Amount</span> <span>$2,000.00</span></p>
                    <p className={styles['order-info-tab-label']}><span>Shipping fee</span> <span>$20.00</span></p>
                    <p className={styles['order-info-tab-label']}><span>Total</span> <span>$2020.00</span></p>
                    <p className={styles['order-info-tab-label']}><span>Payment status</span> <span style={{ color: '#F77C27' }}>submitted</span></p>
                </div>

                <div className={styles['order-info-tab-section']}>
                    <p className={styles['order-info-tab-heading']}>Payment Proof</p>
                    <img src={payment_receipt} className={styles['payment-receipt-image']} alt="" />
                </div>

            </div>}

            {modalTab === '2' && <div>
                <div className={styles['product-section']}>
                    <h3>Items</h3>
                    <div className={styles['product-container']}>
                        {products.map((product, index) => (
                            <div key={index} className={styles['single-product']}>
                                <div className={styles['product-image']}><img src={product.image} alt="" /></div>
                                <p className={styles['product-name']}>{product.name}</p>
                                <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                                    <p className={styles['category']}>{product.category}</p>
                                    <p className={styles['product-priceperunit']}>{product.pricePerUnit}/unit</p>
                                    <p className={styles['unit']}>{product.numOfUnit} units</p>
                                </div>
                                <p className={styles['product-price']}>{product.totalPrice}</p>
                            </div>
                        ))}

                    </div>

                </div>
                <div className={styles['total']}>
                    <p>Total Product amount:</p>
                    <p style={{ fontWeight: '600' }}>$2,000.00</p>
                </div>
            </div>}

            {modalTab === '3' && <div style={{ marginBottom: '15px', position: 'relative' }}>
                <img src={map} alt="" style={{ height: '150px', width: '100%', borderRadius: '10px', marginBottom: '10px', border: '1.5px solid rgba(17, 95, 252, 0.2)' }} />
                <img src={locationIcon} alt="" style={{ position: 'absolute', top: '30px', left: '150px', width: '80px' }} />
                <p style={{ fontSize: '20px', fontWeight: '600' }}>Ikeja, Lagos State</p>
                <p style={{ fontSize: '13px', padding: '5px 0' }}>Delivery takes 4 - 5 working days </p>
                <p style={{ fontSize: '16px', fontWeight: '500', display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid #E6E6E6', padding: '10px 0', marginTop: '10px' }}><span>Delivery Fee</span><span>$20.00</span></p>
            </div>}

        </div>
    )
}

export default OrderDetails