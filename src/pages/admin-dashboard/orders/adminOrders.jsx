import React, { useEffect, useState } from 'react';
import styles from './adminOrders.module.css'
import { MdKeyboardArrowDown, MdOutlinePendingActions } from 'react-icons/md';
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
import { FiInfo } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { FaBoxOpen, FaPhoneAlt, FaShippingFast } from "react-icons/fa";
import watchImage from '../../../assets/wrist-watch.jpg'
import phoneImage from '../../../assets/phone.jpg'
import phoneImage2 from '../../../assets/phone2.jpg'
import payment_receipt from '../../../assets/payment_receipt.jpg'
import map from '../../../assets/map2.jpg'
import locationIcon from '../../../assets/location-icon.png'
import { FaArrowsRotate } from 'react-icons/fa6';
import { AiOutlineFileDone } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { setActiveSidebarMenu } from '../../../redux/sidebarSlice';



const AdminOrders = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveSidebarMenu('orders'));
  }, [])

  const orders = [
    { order_id: 'TDGN2L6BMY', customer_name: 'Omodele Samuel', payment_status: 'pending', amount: '$17,800', date: 'Dec 12' },
    { order_id: 'TDGN2L6BMY', customer_name: 'Omodele Samuel', payment_status: 'pending', amount: '$17,800', date: 'Dec 12' },
    { order_id: 'TDGN2L6BMY', customer_name: 'Omodele Samuel', payment_status: 'verified', amount: '$17,800', date: 'Dec 12' },
    { order_id: 'TDGN2L6BMY', customer_name: 'Omodele Samuel', payment_status: 'pending', amount: '$17,800', date: 'Dec 12' },
    { order_id: 'TDGN2L6BMY', customer_name: 'Omodele Samuel', payment_status: 'verified', amount: '$17,800', date: 'Dec 12' },
  ]

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalTab, setModalTab] = useState('1')
  const [orderTab, setOrderTab] = useState('1')

  return (
    <div className={styles['order-page']}>

      <div className={styles['order-tab']}>
        <p className={orderTab === '1' ? styles['active-order-tab'] : styles['']} onClick={() => setOrderTab('1')}> <MdOutlinePendingActions size={22} />Pending Orders</p>
        <p className={orderTab === '2' ? styles['active-order-tab'] : styles['']} onClick={() => setOrderTab('2')}> <FaArrowsRotate size={18} /> Processing Orders</p>
        <p className={orderTab === '3' ? styles['active-order-tab'] : styles['']} onClick={() => setOrderTab('3')}> <AiOutlineFileDone size={22} /> Shipped Orders</p>
      </div>

      <p className={styles['main-text']}>Orders</p>

      {/* --- ORDER TABLE --- */}

      <div className={styles['order-table-container']}>

        {/* -- Filter --- */}
        <div className={styles["order-filter-container"]}>
          <div className={styles['filter-input']} style={{ backgroundColor: '#115FFC', color: 'white', border: 'none' }}> Type <MdKeyboardArrowDown size={20} /></div>
          <div className={styles['filter-input']}> Status <MdKeyboardArrowDown size={20} /></div>
          <div className={styles['filter-input']} style={{ width: '140' }}> Order date <MdKeyboardArrowDown size={20} /></div>
          <p className={styles['total-order-number']}>Total : 50</p>
        </div>

        {/* --- Table Head --- */}
        <div className={styles["order-table-head"]}>
          <div className={styles["table-head-data"]} style={{ width: '20%', display: 'flex', alignItems: 'center', gap: '20px' }}><input type='checkbox' /> Order Id</div>
          <div className={styles["table-head-data"]} style={{ width: '25%' }}>Customer</div>
          <div className={styles["table-head-data"]} style={{ width: '20%' }}>Payment status</div>
          <div className={styles["table-head-data"]} style={{ width: '20%' }}>Amount</div>
          <div className={styles["table-head-data"]} style={{ width: '10%' }}>Date</div>
        </div>
        {/* #21A168 */}

        {/* -- Order Data --- */}
        {orders.map((order, index) => (
          <div className={styles['order-row']} key={index}>
            <div className={styles['order-row-data']} style={{ width: '20%', display: 'flex', alignItems: 'center', gap: '20px' }}> <input type="checkbox" name="" id="" />{order.order_id}</div>
            <div className={styles['order-row-data']} style={{ width: '25%' }}>{order.customer_name}</div>
            <div className={styles['order-row-data']} style={{ width: '20%', color: order.payment_status === 'verified' ? '#21A168' : '#F77C27', fontSize: '14px', fontWeight: '300' }}>{order.payment_status}</div>
            <div className={styles['order-row-data']} style={{ width: '20%' }}>{order.amount}</div>
            <div className={styles['order-row-data']} style={{ width: '10%' }}>{order.date}</div>
            <div className={styles['order-row-data']} style={{ width: '5%', fontSize: '13px', color: '#115FFC', opacity: '0.7', cursor: 'pointer' }} onClick={onOpen}>view</div>
          </div>
        ))}

      </div>


      {/* --- SINGLE ORDER MODAL --- */}
      <Modal isOpen={isOpen} onClose={onClose}  >
        <ModalOverlay />
        <ModalContent sx={{ maxWidth: '450px' }} position="absolute" isCentered={false} right={4}>
          <ModalHeader className={styles['modal-header']}>Order no. TDGN2L6BMY </ModalHeader>
          <ModalCloseButton className={styles['modal-close-button']} />
          <ModalBody>

            {/* --- MODAL TAB --- */}
            <div className={styles['modal-tab-container']}>
              <p className={modalTab === '1' ? styles['active-modal-tab'] : styles['']} onClick={() => setModalTab('1')}><FiInfo size={20} /> Order Info</p>
              <p className={modalTab === '2' ? styles['active-modal-tab'] : styles['']} onClick={() => setModalTab('2')}> <FaBoxOpen size={20} />Products</p>
              <p className={modalTab === '3' ? styles['active-modal-tab'] : styles['']} onClick={() => setModalTab('3')}> <FaShippingFast size={20} />Shipping</p>
            </div>

            {/* --- ORDER INFO TAB --- */}
            {modalTab === '1' && <div>
              <div className={styles['order-info-tab-section']}>
                <p className={styles['order-info-tab-heading']}>Customer info</p>

                <p className={styles['order-info-tab-label']}><span>Name</span> <span>Omodele Samuel</span></p>
                <p className={styles['order-info-tab-label']}><span>Email</span> <span>abc@gmail.com</span></p>
                <p className={styles['order-info-tab-label']}><span>Phone no.</span> <span>08012347890</span></p>
              </div>
              <div className={styles['order-info-tab-section']}>
                <p className={styles['order-info-tab-heading']}>Order info</p>

                <p className={styles['order-info-tab-label']}><span>Order date</span> <span>Dec 6, 2024, 10:00AM</span></p>
                <p className={styles['order-info-tab-label']}><span>Status</span> <span style={{ color: '#F77C27' }}>pending</span></p>
                <p className={styles['order-info-tab-label']}><span>Product Amount</span> <span>$75,000</span></p>
                <p className={styles['order-info-tab-label']}><span>Shipping fee</span> <span>$400</span></p>
                <p className={styles['order-info-tab-label']}><span>Total</span> <span>$75,400</span></p>
                <p className={styles['order-info-tab-label']}><span>Payment status</span> <span style={{ color: '#F77C27' }}>submitted</span></p>
              </div>

              <div className={styles['order-info-tab-section']}>
                <p className={styles['order-info-tab-heading']}>Payment Proof</p>
                <img src={payment_receipt} className={styles['payment-receipt-image']} alt="" />
                <div className={styles['validate-payment-container']}>
                  <p className={styles['validate-payment-text']}>validate payment</p>
                  <button className={styles['verify']}>Verify</button>
                  <button className={styles['reject']}>Reject</button>
                </div>
              </div>

            </div>}

            {modalTab === '2' && <div>
              <div className={styles['order-info-tab-section']}>
                <p className={styles['order-info-tab-heading']}>Items</p>


                <div className={styles['order-info-tab-label']} style={{ alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ width: '60px' }}><img src={watchImage} alt="" className={styles['product-image']} /></div>

                    <div>
                      <p style={{ fontSize: '15px', fontWeight: '500' }}>Wrist Watch</p>
                      <p style={{ fontSize: '13px' }}>Accessories</p>
                      <p style={{ fontSize: '13.5px' }}>$2,500/unit</p>
                    </div>
                  </div>
                  <p>2 units</p>
                  <p>$5,000</p>
                </div>
                <div className={styles['order-info-tab-label']} style={{ alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ width: '60px' }}><img src={watchImage} alt="" className={styles['product-image']} /></div>

                    <div>
                      <p style={{ fontSize: '15px', fontWeight: '500' }}>Wrist Watch</p>
                      <p style={{ fontSize: '13px' }}>Accessories</p>
                      <p style={{ fontSize: '13.5px' }}>$2,500/unit</p>
                    </div>
                  </div>
                  <p>2 units</p>
                  <p>$5,000</p>
                </div>
                <div className={styles['order-info-tab-label']} style={{ alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ width: '60px' }}><img src={watchImage} alt="" className={styles['product-image']} /></div>

                    <div>
                      <p style={{ fontSize: '15px', fontWeight: '500' }}>Wrist Watch</p>
                      <p style={{ fontSize: '13px' }}>Accessories</p>
                      <p style={{ fontSize: '13.5px' }}>$2,500/unit</p>
                    </div>
                  </div>
                  <p>2 units</p>
                  <p>$5,000</p>
                </div>

              </div>
              <div className={styles['order-info-tab-label']} style={{ alignItems: 'center', fontSize: '15.5px', fontWeight: '500', marginBottom: '15px' }}>
                <p>Total Product amount:</p>
                <p>$15,000</p>
              </div>
            </div>}

            {modalTab === '3' && <div style={{ marginBottom: '15px', position: 'relative' }}>
              <img src={map} alt="" style={{ height: '150px', width: '100%', borderRadius: '10px', marginBottom: '10px', border: '1.5px solid rgba(17, 95, 252, 0.2)' }} />
              <img src={locationIcon} alt="" style={{ position: 'absolute', top: '30px', left: '150px', width: '80px' }} />
              <p style={{ fontSize: '20px', fontWeight: '600' }}>Lagos State</p>
              <p style={{ fontSize: '13px', padding: '5px 0' }}>18, Orelope Street, Egbeda, Lagos</p>
              <p style={{ fontSize: '13px', padding: '5px 0' }}>Delivery date: Jan 1 2025 (1:00PM)</p>
              <p style={{ fontSize: '16px', fontWeight: '500', display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid #E6E6E6', padding: '10px 0', marginTop: '10px' }}><span>Shipping Fee</span><span>$450</span></p>
            </div>}


            {/* line color #F0F1F5 */}
            {/* text color #747A8B */}
            {/* black text color #2C3035 */}
            {/* line color #E6E6E6 */}
            {/* p text color #5E6675 */}
            {/* p text rght color #8E939D */}

          </ModalBody>
        </ModalContent>
      </Modal>


    </div>
  )
}

export default AdminOrders