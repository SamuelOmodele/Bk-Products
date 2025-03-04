import React, { useEffect, useState } from 'react'
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
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsSignedIn, setRole } from '../../redux/authSlice';

const Cart = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedZoneId, setSelectedZoneId] = useState();
  const [selectedZonePrice, setSelectedZonePrice] = useState();
  const [selectedZoneName, setSelectedZoneName] = useState();
  const [zoneError, setZoneError] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => (
    window.scrollTo({
      top: 0
    })
  ), []);

  const deliveryZones = [
    {
      id: 1,
      name: 'Ikeja, Lagos State',
      price: '20.00'
    },
    {
      id: 2,
      name: 'Victoria Island, Lagos State',
      price: '30.00'
    },
    {
      id: 3,
      name: 'Ikorodu, Lagos State',
      price: '25.00'
    },
    {
      id: 4,
      name: 'Ikoyi, Lagos State',
      price: '35.00'
    },
    {
      id: 5,
      name: 'Ibadan, Oyo State',
      price: '50.00'
    },
  ]

  const confirmCheckout = () => {
    if (!selectedZoneId) {
      setZoneError(true);
      return;
    }

    setSelectedZoneName(deliveryZones.find((zone) => zone.id === Number(selectedZoneId))?.name)
    setSelectedZonePrice(deliveryZones.find((zone) => zone.id === Number(selectedZoneId))?.price)
    setZoneError(false);

    onOpen();
  }

  const logout = () => {
    localStorage.removeItem('accessToken');
    dispatch(setRole(null));
    dispatch(setIsSignedIn(false));
    navigate('/sign-in')
  }

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
            <button onClick={() => navigate('/orders')}>My Orders</button>
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
              <select name="" id="" onChange={(e) => setSelectedZoneId(e.target.value)}>
                <option value="">-- Select --</option>
                {deliveryZones.map((zone, index) => (
                  <option key={index} value={zone.id}>{zone.name}</option>
                ))}
              </select>
              <div className={styles['delivery-fee']}>{selectedZoneId && <p>Delivery fee is <span className={styles['bold-blue']}>{`$${deliveryZones.find((zone) => zone.id === Number(selectedZoneId))?.price}` || "N/A"}</span></p>} {zoneError && !selectedZoneId && <p style={{ color: 'red' }}>Select a Zone</p>}</div>
              <button onClick={confirmCheckout}>Proceed to Checkout</button>
            </div>
          </div>
          <p onClick={logout} style={{ marginTop: '10px', fontSize: '14px' }}>Logout</p>

        </div>

        {/* --- CHECK OUT MODAL --- */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent style={{ padding: '0' }}>
            <ModalHeader style={{ textAlign: 'center' }}>Confirm Checkout</ModalHeader>
            <ModalCloseButton />
            <ModalBody style={{ padding: '0 10px 10px' }}>
              <div className={styles['cart-summary']}>
                <h3>Cart Summary</h3>
                <div><p>Cart Subtotal: </p><p>$1000.00</p></div>
                <div><p>Delivery fee: </p><p>{selectedZonePrice || "N/A"}</p></div>
                <div><p>Delivery Zone: </p><p>{selectedZoneName || "Nil"}</p></div>
                <div className={styles['total']}><p>Cart Total: </p><p>{`$${(1000.00 + Number(selectedZonePrice)).toFixed(2)}`}</p></div>
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