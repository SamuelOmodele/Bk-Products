import React from 'react'
import styles from './orderContent.module.css'
import { useNavigate } from 'react-router-dom';
import SingleOrderBox from './singleOrderBox';

const ClosedOrders = () => {
    const navigate = useNavigate();

    const orders = [
        {
            orderId: '#5MAS029D8',
            orderStatus: 'delivered',
            numOfProduct: 2,
            orderDate: '12 Dec, 2024',
            deliveryZone: 'Ikeja, Lagos State',
            paymentStatus: 'verified',
            totalPrice: '$2,000.00'
        },
    ]

    return (
        <div className={styles['orders-content-page']}>
            <div className={styles['orders-nav']}>
                <p onClick={() => navigate('/orders')}>All</p>
                <p onClick={() => navigate('/orders/open')}>Open</p>
                <p onClick={() => navigate('/orders/closed')} className={styles['active-tab']}>Closed</p>
            </div>
            <h3>Closed Orders</h3>
            <div className={styles['orders-box']}>
                {orders.map((order, index) => (
                    <SingleOrderBox order={order} key={index} />
                ))}
            </div>
        </div>
    )
}

export default ClosedOrders