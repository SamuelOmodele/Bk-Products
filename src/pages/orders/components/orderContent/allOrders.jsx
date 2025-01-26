import React from 'react'
import styles from './orderContent.module.css'

const AllOrders = () => {

  return (
    <div className={styles['orders-content-page']}>
        <h3>All Orders</h3>
        <div className={styles['orders-box']}>
            <div className={styles['single-order-box']}>
                <div className={styles['box-header']}>
                    <div>
                        <h4>ORDER ID: #5MAS029D8</h4>
                        <p className={styles['status']}>Status: pending</p>
                    </div>
                    
                    
                    <button>Track Order</button>
                </div>
                <div className={styles['box-row1']}>
                    <p>2 Products</p>
                    <p>12 Dec</p>
                </div>
                <div className={styles['box-row2']}>
                    <p>Shipping Zone: Ikeja, Lagos State</p>
                    
                    <p>Payment : pending</p>
                </div>
                <div className={styles['box-total']}>
                    <p>Total : $2,000.00</p>
                    <div className={styles['box-buttons']}>
                        <button>Pay</button>
                        <button>View Details</button>
                    </div>
                </div>
            </div>

            <div className={styles['single-order-box']}>
                <div className={styles['box-header']}>
                    <div>
                        <h4>ORDER ID: #5MAS029D8</h4>
                        <p className={styles['status']}>Status: pending</p>
                    </div>
                    
                    
                    <button>Track Order</button>
                </div>
                <div className={styles['box-row1']}>
                    <p>2 Products</p>
                    <p>12 Dec</p>
                </div>
                <div className={styles['box-row2']}>
                    <p>Shipping Zone: Ikeja, Lagos State</p>
                    
                    <p>Payment : pending</p>
                </div>
                <div className={styles['box-total']}>
                    <p>Total : $2,000.00</p>
                    <div className={styles['box-buttons']}>
                        <button>Pay</button>
                        <button>View Details</button>
                    </div>
                </div>
            </div>

            <div className={styles['single-order-box']}>
                <div className={styles['box-header']}>
                    <div>
                        <h4>ORDER ID: #5MAS029D8</h4>
                        <p className={styles['status']}>Status: pending</p>
                    </div>
                    
                    
                    <button>Track Order</button>
                </div>
                <div className={styles['box-row1']}>
                    <p>2 Products</p>
                    <p>12 Dec</p>
                </div>
                <div className={styles['box-row2']}>
                    <p>Shipping Zone: Ikeja, Lagos State</p>
                    
                    <p>Payment : pending</p>
                </div>
                <div className={styles['box-total']}>
                    <p>Total : $2,000.00</p>
                    <div className={styles['box-buttons']}>
                        <button>Pay</button>
                        <button>View Details</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AllOrders