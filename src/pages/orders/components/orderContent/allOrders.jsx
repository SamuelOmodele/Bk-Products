import React from 'react'
import styles from './orderContent.module.css'
import { useNavigate } from 'react-router-dom';
import SingleOrderBox from './singleOrderBox';

const AllOrders = () => {
    const navigate = useNavigate();

    const orders = [
        {
            orderId: '#1MAS029D8',
            orderStatus: 'pending',
            numOfProduct: 2,
            orderDate: '12 Dec, 2024',
            deliveryZone: 'Ikeja, Lagos State',
            paymentStatus: 'pending',
            totalPrice: '$2,000.00'
        },
        {
            orderId: '#2MAS029D8',
            orderStatus: 'pending',
            numOfProduct: 2,
            orderDate: '12 Dec, 2024',
            deliveryZone: 'Ikeja, Lagos State',
            paymentStatus: 'submitted',
            totalPrice: '$2,000.00'
        },
        {
            orderId: '35MAS029D8',
            orderStatus: 'pending',
            numOfProduct: 2,
            orderDate: '12 Dec, 2024',
            deliveryZone: 'Ikeja, Lagos State',
            paymentStatus: 'declined',
            totalPrice: '$2,000.00'
        },
        {
            orderId: '#4MAS029D8',
            orderStatus: 'processing',
            numOfProduct: 2,
            orderDate: '12 Dec, 2024',
            deliveryZone: 'Ikeja, Lagos State',
            paymentStatus: 'verified',
            totalPrice: '$2,000.00'
        },
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
            <p onClick={() => navigate('/orders')} className={styles['active-tab']}>All</p>
            <p onClick={() => navigate('/orders/open')}>Open</p>
            <p onClick={() => navigate('/orders/closed')}>Closed</p>
        </div>
        <h3>All Orders</h3>
        <div className={styles['orders-box']}>
            {orders.map((order, index) => (
                <SingleOrderBox order={order} key={index}/>
            ))}
            
        </div>
    </div>
  )
}

export default AllOrders