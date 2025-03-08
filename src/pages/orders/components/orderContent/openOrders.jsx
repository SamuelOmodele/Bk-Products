import React, { useEffect, useState } from 'react'
import styles from './orderContent.module.css'
import { useNavigate } from 'react-router-dom'
import SingleOrderBox from './singleOrderBox';
import Loader from '../../../../components/loader/loader';

const OpenOrders = () => {

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
    ]

    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setData(null)
        setLoading(true);
        setError(null);
        console.log('loading starts')
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/openOrders`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                console.log('Failed request', errorData);
                return;
            }

            const successResponse = await response.json();
            setData(successResponse);
            console.log(successResponse);

        } catch (err) {
            setError('an unknown error occured');
            console.log('An Unknown Error occured: ', err)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles['orders-content-page']}>
            <div className={styles['orders-nav']}>
                <p onClick={() => navigate('/orders')}>All</p>
                <p onClick={() => navigate('/orders/open')} className={styles['active-tab']}>Open</p>
                <p onClick={() => navigate('/orders/closed')}>Closed</p>
            </div>
            <h3>Open Orders</h3>
            {loading ?
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '10px', fontSize: '15px', margin: '30px 0' }}><Loader color={'#115ffc'} size={28} /> Loading . . .</div>
                :
                error ?
                    <p style={{ color: 'red', fontSize: '14px', margin: '10px 0' }}>{error}</p>
                    :
                    <div className={styles['orders-box']}>
                        {data?.open_orders.map((order, index) => (
                            <SingleOrderBox order={order} key={index} />
                        ))}

                    </div>
            }
        </div>
    )
}

export default OpenOrders