import React, { useState } from 'react'
import styles from './cart.module.css'
import Navbar from '../../components/navbar/navbar'
import CartProductRow from '../../components/cartProductRow/cartProductRow'

const Cart = () => {

  const [deliveryZone, setDeliveryZone] = useState('')

  return (
    <div>
      <Navbar />
      <div className={styles['content-page']}>
        <div className={styles['cart-page']}>
          <div className={styles['head-container']}>
            <div className={styles['left']}>
              <h3>Shopping Cart</h3>
              <p><span className={styles['bold-blue']}>2 items</span> in your cart.</p>
            </div>
            <button>My Orders</button>
          </div>
          <div className={styles['lower-content']}>

            <div className={styles['product-overflow-container']}>

            
              <div className={styles['product-container']}>

                <div className={styles['product-container-head']}>
                  <p>Product</p>
                  <p>Price</p>
                  <p>Quantity</p>
                  <p>Total Price</p>
                </div>

                <CartProductRow />
                <CartProductRow />
                <p>Total : <span className={styles['total-amount']}>$1000.00</span></p>

              </div>
            </div>

            <div className={styles['checkout-container']}>
              <h3>Add Delivery Zone</h3>
              <select name="" id="" onChange={(e) => setDeliveryZone(e.target.value)}>
                <option value="">-- Select --</option>
                <option value="lagos">Lagos</option>
                <option value="Oyo">Oyo</option>
              </select>
              <div className={styles['delivery-fee']}>{deliveryZone && <p>Delivery fee is <span className={styles['bold-blue']}>$20.00</span></p>}</div>
              <button>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart