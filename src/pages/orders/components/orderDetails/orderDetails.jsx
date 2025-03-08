import React, { useEffect, useState } from 'react'
import styles from './orderDetails.module.css'
import { FiInfo } from 'react-icons/fi';
import { FaBoxOpen, FaShippingFast } from 'react-icons/fa';
import watchImage from '../../../../assets/wrist-watch.jpg'
import payment_receipt from '../../../../assets/payment_receipt.jpg'
import map from '../../../../assets/map2.jpg'
import locationIcon from '../../../../assets/location-icon.png'
import Loader from '../../../../components/loader/loader';

const OrderDetails = ({ order_id }) => {

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

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSingleOrder();
    }, []);

    const fetchSingleOrder = async () => {
        setData(null)
        setLoading(true);
        setError(null);
        console.log('loading starts')
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/orders/${order_id}`, {
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
        <>
            {loading ?
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '10px', fontSize: '15px', margin: '30px 0' }}><Loader color={'#115ffc'} size={28} /> Loading . . .</div>
                :
                error ?
                    <p style={{ color: 'red', fontSize: '14px', margin: '10px 0' }}>{error}</p>
                    :
                    <div>

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

                                <p className={styles['order-info-tab-label']}><span>Name</span> <span>{`${data?.firstname} ${data?.lastname}`}</span></p>
                                <p className={styles['order-info-tab-label']}><span>Email</span> <span>{data?.email}</span></p>
                                <p className={styles['order-info-tab-label']}><span>Phone no.</span> <span>{data?.phone_number}</span></p>
                            </div>
                            <div className={styles['order-info-tab-section']}>
                                <p className={styles['order-info-tab-heading']}>Order info</p>

                                <p className={styles['order-info-tab-label']}><span>Order ID</span> <span>{data?.order_id}</span></p>
                                <p className={styles['order-info-tab-label']}><span>Order date</span> <span>{formatDate(data?.created_at)}</span></p>
                                <p className={styles['order-info-tab-label']}><span>Status</span> <span style={{ color: '#F77C27' }}>pending</span></p>
                                <p className={styles['order-info-tab-label']}><span>Product Amount</span> <span>&#8358;{Number(data?.total_product_amount).toLocaleString()}</span></p>
                                <p className={styles['order-info-tab-label']}><span>Shipping fee</span> <span>&#8358;{Number(data?.shipping_fee).toLocaleString()}</span></p>
                                <p className={styles['order-info-tab-label']}><span>Total</span> <span>&#8358;{Number(data?.total_amount).toLocaleString()}</span></p>
                                <p className={styles['order-info-tab-label']}><span>Payment status</span> <span style={{ color: '#F77C27' }}>submitted</span></p>
                            </div>

                            <div className={styles['order-info-tab-section']}>
                                <p className={styles['order-info-tab-heading']}>Payment Proof</p>
                                {data?.payment_receipt ? <img src={data?.payment_receipt} className={styles['payment-receipt-image']} alt="" /> : <p style={{color: '#444', fontSize: '14px', margin: '-5px 0 15px'}}>No payment receipt </p>}
                            </div>

                        </div>}

                        {modalTab === '2' && <div>
                            <div className={styles['product-section']}>
                                <h3>Items</h3>
                                <div className={styles['product-container']}>
                                    {data?.order_items.map((product, index) => (
                                        <div key={index} className={styles['single-product']}>
                                            <div className={styles['product-image']}><img src={product.product_image} alt="" /></div>
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
                                <p style={{ fontWeight: '600' }}>&#8358;{Number(data?.total_product_amount).toLocaleString()}</p>
                            </div>
                        </div>}

                        {modalTab === '3' && <div style={{ marginBottom: '15px', position: 'relative' }}>
                            <img src={map} alt="" style={{ height: '150px', width: '100%', borderRadius: '10px', marginBottom: '10px', border: '1.5px solid rgba(202, 202, 202, 0.8)' }} />
                            <img src={locationIcon} alt="" style={{ position: 'absolute', top: '30px', left: '150px', width: '80px' }} />
                            <p style={{ fontSize: '20px', fontWeight: '600' }}>{data?.delivery_zone.name}</p>
                            <p style={{ fontSize: '13px', padding: '5px 0' }}>{data?.delivery_zone.description} </p>
                            <p style={{ fontSize: '16px', fontWeight: '500', display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid #E6E6E6', padding: '10px 0', marginTop: '10px' }}><span>Delivery Fee</span><span>&#8358;{Number(data?.shipping_fee).toLocaleString()}</span></p>
                        </div>}

                    </div>
            }

        </>
    )
}

export default OrderDetails