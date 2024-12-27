import React, { useState } from 'react';
import styles from './adminOrders.module.css'
import { MdKeyboardArrowDown } from 'react-icons/md';
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
import map from '../../../assets/map.jpg'


const AdminOrders = () => {

  const orders = [
    { order_id: 'TDGN2L6BMY', customer_name: 'Omodele Samuel', payment_status: 'pending', amount: '$17,800', date: 'Dec 12' },
    { order_id: 'TDGN2L6BMY', customer_name: 'Omodele Samuel', payment_status: 'pending', amount: '$17,800', date: 'Dec 12' },
    { order_id: 'TDGN2L6BMY', customer_name: 'Omodele Samuel', payment_status: 'verified', amount: '$17,800', date: 'Dec 12' },
    { order_id: 'TDGN2L6BMY', customer_name: 'Omodele Samuel', payment_status: 'pending', amount: '$17,800', date: 'Dec 12' },
    { order_id: 'TDGN2L6BMY', customer_name: 'Omodele Samuel', payment_status: 'verified', amount: '$17,800', date: 'Dec 12' },
  ]

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalTab, setModalTab] = useState('1')

  return (
    <div className={styles['order-page']}>

      <p className={styles['main-text']}>Orders</p>

      {/* --- ORDER TABLE --- */}
      <div className={styles['order-table-container']}>

        {/* -- Filter --- */}
        <div className={styles["order-filter-container"]}>
          <div className={styles['filter-input']} style={{ backgroundColor: '#115FFC', color: 'white', border: 'none' }}> Type <MdKeyboardArrowDown size={20} /></div>
          <div className={styles['filter-input']}> Status <MdKeyboardArrowDown size={20} /></div>
          <div className={styles['filter-input']}> Order date <MdKeyboardArrowDown size={20} /></div>
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
          <ModalCloseButton className={styles['modal-close-button']}/>
          <ModalBody>

            {/* --- MODAL TAB --- */}
            <div className={styles['modal-tab-container']}>
              <p className={ modalTab === '1' ? styles['active-modal-tab'] : styles['']}  onClick={() => setModalTab('1')}><FiInfo size={20} /> Order Info</p>
              <p className={ modalTab === '2' ? styles['active-modal-tab'] : styles['']} onClick={() => setModalTab('2')}> <FaBoxOpen size={20} style={{ color: '#115FFC' }} />Products</p>
              <p className={ modalTab === '3' ? styles['active-modal-tab'] : styles['']} onClick={() => setModalTab('3')}> <FaShippingFast size={20} style={{ color: '#115FFC' }} />Shipping</p>
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