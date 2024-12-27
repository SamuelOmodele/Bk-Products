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
  ChakraProvider,
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [singleOrderTab, setSingleOrderTab] = useState('1')

  return (
    <div className={styles['order-page']}>


      <p className={styles['main-text']}>Orders</p>

      <div className={styles['order-table-container']}>

        {/* -- Filter --- */}
        <div className={styles["order-filter-container"]}>
          <div className={styles['filter-input']} style={{ backgroundColor: '#115FFC', color: 'white', border: 'none' }}> Type <MdKeyboardArrowDown size={20} /></div>
          <div className={styles['filter-input']}> Status <MdKeyboardArrowDown size={20} /></div>
          <div className={styles['filter-input']}> Order date <MdKeyboardArrowDown size={20} /></div>
          <p className={styles['total-order-number']}>Total : 50</p>
          {/* <div className={styles['filter-input']}> All filters</div> */}
        </div>


        {/* --- Table Head --- */}
        <div className={styles["order-table-head"]}>
          <div className={styles["table-head-data"]} style={{ width: '20%', display: 'flex', alignItems: 'center', gap: '20px' }}><input type='checkbox' /> Order Id</div>
          <div className={styles["table-head-data"]} style={{ width: '25%' }}>Customer</div>
          <div className={styles["table-head-data"]} style={{ width: '20%' }}>Status</div>
          <div className={styles["table-head-data"]} style={{ width: '20%' }}>Amount</div>
          <div className={styles["table-head-data"]} style={{ width: '10%' }}>Date</div>
        </div>
        {/* #21A168 */}

        {/* -- Order Data --- */}
        <div className={styles['order-row']}>
          <div className={styles['order-row-data']} style={{ width: '20%', display: 'flex', alignItems: 'center', gap: '20px' }}> <input type="checkbox" name="" id="" />TDGN2L6BMY</div>
          <div className={styles['order-row-data']} style={{ width: '25%' }}>Omodele Samuel</div>
          <div className={styles['order-row-data']} style={{ width: '20%', color: '#F77C27', fontSize: '14px' }}>pending</div>
          <div className={styles['order-row-data']} style={{ width: '20%' }}>$17,800</div>
          <div className={styles['order-row-data']} style={{ width: '10%' }}>Dec 12</div>
          <div className={styles['order-row-data']} style={{ width: '5%', fontSize: '13px', color: '#115FFC', opacity: '0.7', cursor: 'pointer' }} onClick={onOpen}>view</div>
        </div>
        <div className={styles['order-row']}>
          <div className={styles['order-row-data']} style={{ width: '20%', display: 'flex', alignItems: 'center', gap: '20px' }}> <input type="checkbox" name="" id="" />TDGN2L6BMY</div>
          <div className={styles['order-row-data']} style={{ width: '25%' }}>Omodele Samuel</div>
          <div className={styles['order-row-data']} style={{ width: '20%', color: '#F77C27', fontSize: '14px' }}>pending</div>
          <div className={styles['order-row-data']} style={{ width: '20%' }}>$17,800</div>
          <div className={styles['order-row-data']} style={{ width: '10%' }}>Dec 12</div>
          <div className={styles['order-row-data']} style={{ width: '5%', fontSize: '13px', color: '#115FFC', opacity: '0.7', cursor: 'pointer' }} onClick={onOpen}>view</div>
        </div>
        <div className={styles['order-row']}>
          <div className={styles['order-row-data']} style={{ width: '20%', display: 'flex', alignItems: 'center', gap: '20px' }}> <input type="checkbox" name="" id="" />TDGN2L6BMY</div>
          <div className={styles['order-row-data']} style={{ width: '25%' }}>Omodele Samuel</div>
          <div className={styles['order-row-data']} style={{ width: '20%', color: '#21A168', fontSize: '14px' }}>verified</div>
          <div className={styles['order-row-data']} style={{ width: '20%' }}>$17,800</div>
          <div className={styles['order-row-data']} style={{ width: '10%' }}>Dec 12</div>
          <div className={styles['order-row-data']} style={{ width: '5%', fontSize: '13px', color: '#115FFC', opacity: '0.7', cursor: 'pointer' }} onClick={onOpen}>view</div>
        </div>

      </div>


      <Modal isOpen={isOpen} onClose={onClose}  >
        <ModalOverlay />
        <ModalContent sx={{ maxWidth: '450px' }} position="absolute" isCentered={false} right={4}>
          <ModalHeader className={styles['modal-header']}>Order no. TDGN2L6BMY </ModalHeader>
          <ModalCloseButton style={{color: '#115FFC', border: '1.5px solid #E6E6E6', borderRadius: '10px'}} />
          <ModalBody>

            <div className={styles['modal-tab']}>
              <p style={{ color: singleOrderTab === '1' ? '#115FFC' : '', backgroundColor: singleOrderTab === '1' ? ' #F1F5FF' : '' }} onClick={() => setSingleOrderTab('1')}><FiInfo size={20}  /> Order Info</p>
              <p style={{ color: singleOrderTab === '2' ? '#115FFC' : '', backgroundColor: singleOrderTab === '2' ? ' #F1F5FF' : ''  }} onClick={() => setSingleOrderTab('2')}> <FaBoxOpen size={20} style={{color: '#115FFC'}} />Products</p>
              <p style={{ color: singleOrderTab === '3' ? '#115FFC' : '', backgroundColor: singleOrderTab === '3' ? ' #F1F5FF' : ''  }} onClick={() => setSingleOrderTab('3')}> <FaShippingFast size={20} style={{color: '#115FFC'}} />Shipping</p>
            </div>

            {singleOrderTab === '1' && <div>
              <div style={{borderBottom: '1.5px solid #F2F5F7', marginBottom: '10px'}}>
                <p style={{color: '#03071A', fontSize: '19px', fontWeight: '500', marginBottom: '15px'}}>Customer info</p>

                <p style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: '500', fontSize: '14px'}}><span style={{color: '#3F4860'}}>Name</span> <span style={{color: '#101014'}}>Omodele Samuel</span></p>
                <p style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: '500', fontSize: '14px'}}><span style={{color: '#3F4860'}}>Email</span> <span style={{color: '#101014'}}>abc@gmail.com</span></p>
                <p style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: '500', fontSize: '14px'}}><span style={{color: '#3F4860'}}>Phone no.</span> <span style={{color: '#101014'}}>08012347890</span></p>
              </div>
              <div style={{borderBottom: '1.5px solid #F2F5F7', marginBottom: '10px'}}>
                <p style={{color: '#03071A', fontSize: '19px', fontWeight: '500', marginBottom: '15px'}}>Order info</p>

                <p style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: '500', fontSize: '14px'}}><span style={{color: '#3F4860'}}>Order date</span> <span style={{color: '#101014'}}>Dec 6, 2024, 10:00AM</span></p>
                <p style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: '500', fontSize: '14px'}}><span style={{color: '#3F4860'}}>Status</span> <span style={{color: '#F77C27', fontWeight: '400'}}>pending</span></p>
                <p style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: '500', fontSize: '14px'}}><span style={{color: '#3F4860'}}>Product Amount</span> <span style={{color: '#101014'}}>$75,000</span></p>
                <p style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: '500', fontSize: '14px'}}><span style={{color: '#3F4860'}}>Shipping fee</span> <span style={{color: '#101014'}}>$400</span></p>
                <p style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: '500', fontSize: '14px'}}><span style={{color: '#3F4860'}}>Total</span> <span style={{color: '#101014'}}>$75,400</span></p>
                <p style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: '500', fontSize: '14px'}}><span style={{color: '#3F4860'}}>Payment status</span> <span style={{color: '#F77C27', fontWeight: '400'}}>submitted</span></p>
              </div>

              <div style={{borderBottom: '1.5px solid #F2F5F7', marginBottom: '10px'}}>
                <p style={{color: '#03071A', fontSize: '19px', fontWeight: '500', marginBottom: '15px'}}>Payment Proof</p>
                <img src={payment_receipt} style={{border: '1px solid #E6E6E6', borderRadius: '5px'}} alt="" />
              
              </div>

            </div> }


            {/* line color #F0F1F5 */}
            {/* text color #747A8B */}
            {/* black text color #2C3035 */}
            {/* line color #E6E6E6 */}
            {/* p text color #5E6675 */}
            {/* p text rght color #8E939D */}

            {/* <>
            <p className={styles['user-info']}>
              <FiUser size={24} /> Omodele Samuel
            </p>
            <p className={styles['user-info']}>
              <HiOutlineMail size={22} /> abc@gmail.com
            </p>
            <p className={styles['user-info']}>
              <FaPhoneAlt size={20} /> 090283992028
            </p>

            

            {singleOrderTab === '1' && <div>
              <div className={styles['order-product']}>
                <img src={watchImage} alt="" />
                <div className={styles['order-description']}>
                  <p style={{ fontWeight: '600', textTransform: 'uppercase' }}>Wrist Watch</p>
                  <p>Order Quantity: 2</p>
                  <p>Price per Quantity: $25,000</p>
                </div>
              </div>
              <div className={styles['order-product']}>
                <img src={phoneImage} alt="" />
                <div className={styles['order-description']}>
                  <p style={{ fontWeight: '600', textTransform: 'uppercase' }}>Google Pixel Phone</p>
                  <p>Order Quantity: 2</p>
                  <p>Price per Quantity: $25,000</p>
                </div>
              </div>
              <div className={styles['order-product']}>
                <img src={phoneImage2} alt="" />
                <div className={styles['order-description']}>
                  <p style={{ fontWeight: '600', textTransform: 'uppercase' }}>Google Pixel Phone</p>
                  <p>Order Quantity: 2</p>
                  <p>Price per Quantity: $25,000</p>
                </div>
              </div>
              <p className={styles['order-price-text']}>Total Order price: $75,000</p>
            </div>}

            {singleOrderTab === '2' && <div className={styles['shipping-location']}>
              <img src={map} alt="" className={styles['map-image']} />
              <div className={styles['shipping-details']}>
                <p style={{fontSize: '20px', fontWeight: '600'}}>Lagos State</p>
                <p><span style={{fontWeight: '500'}}>Address:</span> Ikeja, Lagos</p>
                <p><span style={{fontWeight: '500'}}>Delivery date & time:</span> 26 - 12 - 2024 (4:00PM)</p>
                <p><span style={{fontWeight: '500'}}>Fee:</span> $400</p>
              </div>
            </div>}

            {singleOrderTab === '3' && <div>
              <img src={payment_receipt} style={{border: '1px solid #ccc'}} alt="" />
              
            </div>}

            <div className={styles['total-box']}>
              <p>Total</p>
              <p>$100,000</p>
            </div>
          </> */}
          </ModalBody>
        </ModalContent>
      </Modal>


    </div>
  )
}

export default AdminOrders