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
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsSignedIn, setRole } from '../../redux/authSlice';
import Loader from '../../components/loader/loader';
import { BsCartCheck } from "react-icons/bs";

const Cart = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedZoneId, setSelectedZoneId] = useState();
  const [selectedZonePrice, setSelectedZonePrice] = useState();
  const [selectedZoneTitle, setSelectedZoneTitle] = useState();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [zoneError, setZoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {

    window.scrollTo({
      top: 0
    });
    fetchCart();
    fetchDeliveryZones();
  }, []);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [deliveryData, setDeliveryData] = useState(null);
  const [deliveryLoading, setDeliveryLoading] = useState(true);
  const [deliveryError, setDeliveryError] = useState(null);

  const [placeOrderData, setPlaceOrderData] = useState(null);
  const [placeOrderLoading, setPlaceOrderLoading] = useState(false);
  const [placeOrderError, setPlaceOrderError] = useState(null);

  const fetchCart = async () => {
    setData(null)
    setLoading(true);
    setError(null);
    console.log('loading starts')
    const accessToken = localStorage.getItem('accessToken')

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/cart/view`, {
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

  const fetchDeliveryZones = async () => {
    setDeliveryData(null)
    setDeliveryLoading(true);
    setDeliveryError(null);
    console.log('loading starts')
    const accessToken = localStorage.getItem('accessToken')

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/shipping-zones`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        setDeliveryError(errorData.message);
        console.log('Failed request', errorData);
        return;
      }

      const successResponse = await response.json();
      setDeliveryData(successResponse);
      console.log(successResponse);

    } catch (err) {
      setDeliveryError('an unknown error occured');
      console.log('An Unknown Error occured: ', err)
    } finally {
      setDeliveryLoading(false);
    }
  }

  const placeOrder = async () => {
    console.log('delivery address', deliveryAddress);
    console.log('shipping zone', selectedZoneId);
    setPlaceOrderData(null)
    setPlaceOrderLoading(true);
    setPlaceOrderError(null);
    console.log('loading starts')
    const accessToken = localStorage.getItem('accessToken')

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/order/place`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "shipping_zone_id": Number(selectedZoneId),
          "address_line_1": deliveryAddress,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setPlaceOrderError(errorData.message);
        console.log('Failed request', errorData);
        return;
      }

      const successResponse = await response.json();
      setPlaceOrderData(successResponse);
      console.log(successResponse);

    } catch (err) {
      setPlaceOrderError('an unknown error occured');
      console.log('An Unknown Error occured: ', err)
    } finally {
      setPlaceOrderLoading(false);
    }
  }

  // const deliveryZones = [
  //   {
  //     id: 1,
  //     name: 'Ikeja, Lagos State',
  //     price: '20.00'
  //   },
  //   {
  //     id: 2,
  //     name: 'Victoria Island, Lagos State',
  //     price: '30.00'
  //   },
  //   {
  //     id: 3,
  //     name: 'Ikorodu, Lagos State',
  //     price: '25.00'
  //   },
  //   {
  //     id: 4,
  //     name: 'Ikoyi, Lagos State',
  //     price: '35.00'
  //   },
  //   {
  //     id: 5,
  //     name: 'Ibadan, Oyo State',
  //     price: '50.00'
  //   },
  // ]

  const confirmCheckout = () => {
    if (!selectedZoneId) {
      setZoneError(true);
      return;
    }
    if (!deliveryAddress) {
      setAddressError(true);
      return;
    }

    setSelectedZoneTitle(deliveryData?.find((zone) => zone.id === Number(selectedZoneId))?.title)
    setSelectedZonePrice(deliveryData?.find((zone) => zone.id === Number(selectedZoneId))?.price)
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
        {loading ?
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: '10px', fontSize: '16px', margin: '40px 0' }}>
            <Loader size={35} color={'#115ffc'} /> Loading . . .
          </div>
          :
          error ?
            <p className={styles['error-msg']}>{error}</p>
            :
            <div className={styles['cart-page']}>

              {/* --- Head content --- */}
              <div className={styles['head-container']}>
                <div className={styles['left']}>
                  <h3>My Cart</h3>
                  <p><span className={styles['bold-blue']}>{data?.cart_items.length} items</span> in your cart.</p>
                </div>
                <button onClick={() => navigate('/orders')}>My Orders</button>
              </div>

              {/* --- Lower content --- */}
              <div className={styles['lower-content']}>
                <div className={styles['product-overflow-container']}>
                  <div className={styles['product-container']}>

                    <div className={styles['product-container-head']}>
                      <p>Cart items</p>
                      {/* <p id={styles['price-head-text']}>Price</p>
                      <p id={styles['quantity-head-text']}>Quantity</p>
                      <p id={styles['total-price-head-text']}>Total Price</p> */}
                    </div>

                    {data?.cart_items.map((cartItem, index) => (
                      <CartProductRow key={index} cartItem={cartItem} fetchCart={fetchCart} />
                    ))}
                    {data?.cart_items.length > 0 && <p style={{ marginBottom: '10px' }}>Total : <span className={styles['total-amount']}>&#8358;{Number(data?.total_price).toLocaleString()}</span></p>}
                    {!data?.cart_items.length && <p>No items. <Link to={'/shop'} style={{color: '#115ffc', textDecoration: 'underline', fontWeight: '500', fontStyle: 'italic'}}>Browse</Link> products to add </p>}

                  </div>
                </div>

                {data?.cart_items.length > 0 &&
                  <div className={styles['checkout-container']}>
                    <h3>Add Delivery Zone</h3>
                    <select name="" id="" onChange={(e) => setSelectedZoneId(e.target.value)}>
                      <option value="">-- Select --</option>
                      {deliveryData?.map((zone, index) => (
                        <option key={index} value={zone.id}>{zone.title}</option>
                      ))}
                    </select>
                    <input type="text" placeholder='Enter delivery address ' value={deliveryAddress} onChange={(e) => { setDeliveryAddress(e.target.value); if (e) { setAddressError(false) } }} />
                    {(selectedZoneId || zoneError || addressError) && <div className={styles['delivery-fee']}>
                      {selectedZoneId && <p>Delivery fee is <span className={styles['bold-blue']}>{`$${Number(deliveryData.find((zone) => zone.id === Number(selectedZoneId))?.price).toLocaleString()}` || "N/A"}</span></p>}
                      {zoneError && !selectedZoneId && <p style={{ color: 'red' }}>Select a Zone</p>}
                      {addressError && <p style={{ color: 'red' }}>Enter delivery address</p>}</div>
                    }
                    <button onClick={confirmCheckout}>Proceed to Checkout</button>
                  </div>}
              </div>
              {/* <p onClick={logout} style={{ marginTop: '10px', fontSize: '14px' }}>Logout</p> */}
            </div>}

        {/* --- CHECK OUT MODAL --- */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent style={{ padding: '0' }}>
            <ModalHeader style={{ textAlign: 'center' }}>Confirm Checkout</ModalHeader>
            <ModalCloseButton />
            <ModalBody style={{ padding: '0 10px 10px' }}>
              {placeOrderData ?
                <div>
                  <BsCartCheck className={styles['cart-check-icon']} />
                  <p className={styles['modal-p']}>
                    {/* {addData?.success} */}
                    Your order has been successfully created. Please click the "My Orders" button to make payment and track your order status.
                  </p>
                  <button className={styles['modal-btn']} onClick={onClose}>Got it</button>
                </div>
                :
                <div className={styles['cart-summary']}>
                  <h3>Cart Summary</h3>
                  <div><p>Cart Subtotal: </p><p>&#8358;{Number(data?.total_price).toLocaleString()}</p></div>
                  <div><p>Delivery fee: </p><p>{Number(selectedZonePrice).toLocaleString() || "N/A"}</p></div>
                  <div><p>Delivery Zone: </p><p>{selectedZoneTitle || "Nil"}</p></div>
                  <div><p>Address: </p><p style={{ width: '70%', textAlign: 'right' }}>{deliveryAddress || "Nil"}</p></div>
                  <div className={styles['total']}><p>Cart Total: </p><p>{`$${(Number(data?.total_price) + Number(selectedZonePrice)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p></div>
                  <button onClick={placeOrder}>{placeOrderLoading ? <Loader size={25} /> : "Check Out"}</button>
                </div>
              }

            </ModalBody>
          </ModalContent>
        </Modal>

      </div>
    </div>
  )
}

export default Cart