import React, { useState } from 'react'
import styles from './orderDetails.module.css'
import { FiInfo } from 'react-icons/fi';
import { FaBoxOpen, FaShippingFast } from 'react-icons/fa';
import watchImage from '../../../../assets/wrist-watch.jpg'
import payment_receipt from '../../../../assets/payment_receipt.jpg'
import map from '../../../../assets/map2.jpg'
import locationIcon from '../../../../assets/location-icon.png'

const AdminOrderDetails = ({ order }) => {

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true, // Ensures AM/PM format
        });
    };

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

                    <p className={styles['order-info-tab-label']}><span>Name</span> <span>{order.firstname} {order.lastname}</span></p>
                    <p className={styles['order-info-tab-label']}><span>Email</span> <span>{order.email}</span></p>
                    <p className={styles['order-info-tab-label']}><span>Phone no.</span> <span>{order.phone_number}</span></p>
                </div>
                <div className={styles['order-info-tab-section']}>
                    <p className={styles['order-info-tab-heading']}>Order info</p>

                    <p className={styles['order-info-tab-label']}><span>Order ID</span> <span>{order.order_id}</span></p>
                    <p className={styles['order-info-tab-label']}><span>Order date</span> <span>{formatDate(order.created_at)}</span></p>
                    <p className={styles['order-info-tab-label']}><span>Status</span> <span style={{ color: order.order_status === 'pending' ? '#F77C27' : order.order_status === 'processing' ? '#115FFC' : order.order_status === "delivered" ? '#21A168' : '', fontSize: '14px', fontWeight: '300' }}>{order.order_status}</span></p>
                    <p className={styles['order-info-tab-label']}><span>Product Amount</span> <span>&#8358;{Number(order.total_product_amount).toLocaleString()}</span></p>
                    <p className={styles['order-info-tab-label']}><span>Shipping fee</span> <span>&#8358;{Number(order.shipping_fee).toLocaleString()}</span></p>
                    <p className={styles['order-info-tab-label']}><span>Total</span> <span>&#8358;{Number(order.total_amount).toLocaleString()}</span></p>
                    <p className={styles['order-info-tab-label']}><span>Payment status</span> <span style={{ color: order.payment_status === 'pending' ? '#F77C27' : order.payment_status === 'submitted' ? '#115FFC' : order.payment_status === "verified" ? '#21A168' : 'red', fontSize: '14px', fontWeight: '300' }}>{order.payment_status}</span></p>
                </div>

                <div className={styles['order-info-tab-section']}>
                    <p className={styles['order-info-tab-heading']}>Payment Proof</p>
                    <img src={order.payment_receipt ? payment_receipt : null} className={styles['payment-receipt-image']} alt="" />
                </div>

                {(order.payment_status === 'submitted') &&
                    <div className={styles['validate-payment']}>
                        <p>Please validate payment receipt above </p>
                        <div className={styles['buttons']}>
                            <button>Mark verified</button>
                            <button>Mark rejected</button>
                        </div>
                    </div>
                }
                {(order.payment_status === 'verified') &&
                    <div style={{ color: '#21A168', fontSize: '14px', textAlign: 'center' }}>
                        <p>Payment has been verified</p>
                    </div>
                }
                {(order.payment_status === 'rejected') &&
                    <div style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>
                        <p>Payment was rejected</p>
                    </div>
                }

            </div>}

            {modalTab === '2' && <div>
                <div className={styles['product-section']}>
                    <h3>Items</h3>
                    <div className={styles['product-container']}>
                        {order.order_items.map((product, index) => (
                            <div key={index} className={styles['single-product']}>
                                <div className={styles['product-image']}><img src={watchImage} alt="" /></div>
                                <p className={styles['product-name']}>{product.product_name}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {/* <p className={styles['category']}>{product.category}</p> */}
                                    <p className={styles['product-priceperunit']}>&#8358;{Number(product.price).toLocaleString()}/unit</p>
                                    <p className={styles['unit']}>{product.quantity} units</p>
                                </div>
                                <p className={styles['product-price']}>&#8358;{Number(product.total_price).toLocaleString()}</p>
                            </div>
                        ))}

                    </div>

                </div>
                <div className={styles['total']}>
                    <p>Total Product amount:</p>
                    <p style={{ fontWeight: '600' }}>&#8358;{Number(order.total_product_amount).toLocaleString()}</p>
                </div>
            </div>}

            {modalTab === '3' && <div style={{ marginBottom: '15px', position: 'relative' }}>
                <img src={map} alt="" style={{ height: '150px', width: '100%', borderRadius: '10px', marginBottom: '10px', border: '1.5px solid rgba(17, 95, 252, 0.2)' }} />
                <img src={locationIcon} alt="" style={{ position: 'absolute', top: '30px', left: '150px', width: '80px' }} />
                <p style={{ fontSize: '20px', fontWeight: '600' }}>{order.delivery_zone.name}</p>
                <p style={{ fontSize: '13px', padding: '5px 0' }}>{order.delivery_zone.description} </p>
                <p style={{ fontSize: '16px', fontWeight: '500', display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid #E6E6E6', padding: '10px 0', marginTop: '10px' }}><span>Delivery Fee</span><span>&#8358;{Number(order.shipping_fee).toLocaleString()}</span></p>

                {order.order_status === 'processing' &&
                    <div className={styles['validate-payment']}>
                        <p>Please deliver the order items to the address above. </p>
                        <div className={styles['buttons']}>
                            <button style={{ backgroundColor: '#115ffc' }}>Mark delivered</button>
                        </div>
                    </div>
                }

                {order.order_status === 'delivered' &&
                    <div style={{ color: '#21A168', fontSize: '14px', textAlign: 'center' }}>
                        <p>Order has been delivered successfully and closed.</p>
                    </div>
                }

            </div>}

        </div>
    )
}

export default AdminOrderDetails