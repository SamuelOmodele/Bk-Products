import React, { useState } from 'react'
import styles from './cart.module.css'
import Navbar from '../../components/navbar/navbar'
import CartProductRow from '../../components/cartProductRow/cartProductRow'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

const Cart = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deliveryZone, setDeliveryZone] = useState('')

  return (
    <div>
      <Navbar />
      <div className={styles['content-page']}>
        <div className={styles['cart-page']}>

          {/* --- Head content --- */}
          <div className={styles['head-container']}>
            <div className={styles['left']}>
              <h3>Shopping Cart</h3>
              <p><span className={styles['bold-blue']}>2 items</span> in your cart.</p>
            </div>
            <button>My Orders</button>
          </div>

          {/* --- Lower content --- */}
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
              <button onClick={onOpen}>Proceed to Checkout</button>
            </div>
          </div>
        </div>

        {/* --- MODAL --- */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent style={{padding: '0'}}>
            <ModalHeader >Confirm Checkout </ModalHeader>
            <ModalCloseButton />
            <ModalBody style={{padding: '0 10px 10px'}}>
              <div className={styles['cart-summary']}>
                <h3>Cart Summary</h3>
                <div><p>Cart Subtotal: </p><p>$1000.00</p></div>
                <div><p>Delivery fee: </p><p>$20.00</p></div>
                <div><p>Delivery Zone: </p><p>Ikeja, Lagos</p></div>
                <div className={styles['total']}><p>Cart Total: </p><p>$1020.00</p></div>
                <button>Check Out</button>
              </div>

            </ModalBody>
          </ModalContent>
        </Modal>

      </div>
    </div>
  )
}

export default Cart