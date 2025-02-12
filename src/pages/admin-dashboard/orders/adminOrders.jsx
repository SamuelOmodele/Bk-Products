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
import Loader from '../../../components/loader/loader';
import { MdOutlineRefresh } from "react-icons/md";
import AdminOrderDetails from '../../orders/components/orderDetails/adminOrderDetails';


const AdminOrders = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveSidebarMenu('orders'));
  }, []);

  useEffect(() => {
    fetchOrders("pending", '');
  }, []);

  // --- STATES FOR FETCHING ALL ORDERS ---
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- STATES FOR FETCHING SINGLE ORDER ---
  const [singleOrder, setSingleOrder] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const [error2, setError2] = useState(null);

  // --- OTHER STATES ---
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderStatus, setOrderStatus] = useState('pending');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [search, setSearch] = useState('');
  const [showRefresh, setShowRefresh] = useState(true);
  const [showExitSearch, setShowExitSearch] = useState(false);

  // --- FETCH ORDERS ---
  const fetchOrders = async (order_status, payment_status) => {

    setData(null);

    const accessToken = localStorage.getItem('accessToken');
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/orders?order_status=${order_status}&payment_status=${payment_status}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        console.log('Failed request', errorData.message)
        return;
      }

      const successResponse = await response.json();
      setData(successResponse.orders);
      console.log(successResponse);

    } catch (error) {
      setError('an unknown error occured');
      console.log('An Unknown Error occured: ', error)
    } finally {
      setLoading(false);
    }
  }

  // --- FETCH SINGLE ORDERS ---
  const fetchSingleOrder = async (order_id) => {

    const accessToken = localStorage.getItem('accessToken');
    setSingleOrder(null);
    setLoading2(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/order/${order_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError2(errorData.message);
        console.log('Failed request in getting single order: ', errorData.message)
        return;
      }

      const successResponse = await response.json();
      setSingleOrder(successResponse);
      console.log('single order retrieved', successResponse);

    } catch (error) {
      setError2('an unknown error occured');
      console.log('An Unknown Error occured while fetching single order: ', error)
    } finally {
      setLoading2(false);
    }
  }

  // --- SEARCH ORDER BY ID ---
  const searchOrderbyId = async (search) => {
    const accessToken = localStorage.getItem('accessToken');
    setData(null);
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/orders/OrderById`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ order_id: search })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        console.log('Failed request in searching order ', errorData.message)
        return;
      }

      const successResponse = await response.json();
      setData([successResponse]);
      console.log('search successful', successResponse);

    } catch (error) {
      setError('an unknown error occured');
      console.log('An Unknown Error occured while searching for order: ', error)
    } finally {
      setLoading(false);
    }
  }


  // --- format order date function ---
  const formatDate = (raw_date) => {
    const date = new Date(raw_date);

    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    return formattedDate;
  }

  // --- change order status function
  const changeOrderStatus = (new_status) => {
    setOrderStatus(new_status);
    setPaymentStatus('');
    setSearch('');
    setShowRefresh(true);
    setShowExitSearch(false);
    fetchOrders(new_status, '')
  }

  // --- change payment status function ---
  const changePaymentStatus = (new_status) => {
    setPaymentStatus(new_status);
    setSearch('');
    fetchOrders('pending', new_status)
  }

  // --- view single order function ---
  const viewOrder = (order_id) => {
    console.log(order_id);
    onOpen();
    fetchSingleOrder(order_id);
  }

  // ---  refresh ---
  const refresh = () => {
    if (orderStatus === 'pending'){
      fetchOrders(orderStatus, paymentStatus);
      return;
    }
    fetchOrders(orderStatus, '');
  }

  // --- search order function ---
  const searchOrder = () => {
    setPaymentStatus('');
    setShowRefresh(false);
    setShowExitSearch(true);
    searchOrderbyId(search);
  }

  // --- exit search function ---
  const exitSearch = () => {
    setPaymentStatus('');
    setSearch('');
    setShowRefresh(true);
    setShowExitSearch(false);
    fetchOrders(orderStatus, '')
  }

  return (
    <div className={styles['order-page']}>
      <div className={styles['order-tab']}>
        <p className={orderStatus === 'pending' ? styles['active-order-tab'] : styles['']} onClick={() => changeOrderStatus('pending')}> <MdOutlinePendingActions size={22} className={styles['order-tab-icon']} />Pending <span className={styles['order-text']}>Orders</span> </p>
        <p className={orderStatus === 'processing' ? styles['active-order-tab'] : styles['']} onClick={() => changeOrderStatus('processing')}> <FaArrowsRotate size={18} className={styles['order-tab-icon']} /> Processing <span className={styles['order-text']}>Orders</span></p>
        <p className={orderStatus === 'delivered' ? styles['active-order-tab'] : styles['']} onClick={() => changeOrderStatus('delivered')}> <AiOutlineFileDone size={22} className={styles['order-tab-icon']} /> Delivered <span className={styles['order-text']}>Orders</span></p>
      </div>

      <p className={styles['main-text']}>Orders</p>

      {/* --- ORDER TABLE --- */}

      <div className={styles['overflow-container']}>
        <div className={styles['order-table-container']}>

          {/* -- Filter --- */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div className={styles['order-status']}>Order Status : <p className={orderStatus === 'pending' ? styles['pending'] : orderStatus === 'processing' ? styles['processing'] : styles['delivered']}>{orderStatus}</p></div>
            {orderStatus === 'pending' &&
              <div className={styles['filter-select-field']}>
                <p>Payment Status</p>
                <select onChange={(e) => changePaymentStatus(e.target.value)}>
                  <option value="">all</option>
                  <option value="pending" selected={paymentStatus === 'pending'}>pending</option>
                  <option value="submitted" selected={paymentStatus === 'submitted'}>submitted</option>
                  <option value="rejected" selected={paymentStatus === 'rejected'}>rejected</option>
                </select>
                {/* <MdKeyboardArrowDown size={26} className={styles['select-arrow']} /> */}
              </div>}
          </div>

          <div className={styles["order-filter-container"]}>

            <div className={styles['left']}>
              <div className={styles["filter-input-field"]}>
                <input type="text" placeholder='search by order id . . .' value={search} onChange={(e) => setSearch(e.target.value)} />
                <button onClick={searchOrder}>search</button>
              </div>
              {showExitSearch && <button style={{color: '#115ffc', fontWeight: '500', fontSize: '14px'}} onClick={exitSearch}>Exit search </button>}
            </div>

            <div className={styles['right']}>
              <p className={styles['total-order-number']}>Total : {data?.length}</p>
            </div>
          </div>

          {/* --- Table Head --- */}
          <div className={styles["order-table-head"]}>
            <div className={styles["table-head-data"]} id={styles['order-id-cell']}><input type='checkbox' /> Order Id</div>
            <div className={styles["table-head-data"]} id={styles['customer-cell']}>Customer</div>
            <div className={styles["table-head-data"]} id={styles['payment-status-cell']}>Payment status</div>
            <div className={styles["table-head-data"]} id={styles['amount-cell']}>Amount</div>
            <div className={styles["table-head-data"]} id={styles['date-cell']}>Date</div>
            {showRefresh && <div className={styles["table-head-data"]} id={styles['view-cell']}><MdOutlineRefresh className={styles['refresh-icon']} onClick={refresh}/></div>}
          </div>
          {/* #21A168 */}

          {/* -- Order Data --- */}
          {loading ?
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: '10px', fontSize: '15px', margin: '30px 0' }}><Loader color={'#115ffc'} size={28} /> Loading . . .</div>
            :
            <>
            {!data?.length && <p style={{color: '#555'}}>No result </p>}
              {data?.map((order, index) => (
                <div className={styles['order-row']} key={index}>
                  <div className={styles['order-row-data']} id={styles['order-id-cell']}> <input type="checkbox" name="" id="" />{order.order_id}</div>
                  <div className={styles['order-row-data']} id={styles['customer-cell']}>{order.firstname} {order.lastname}</div>
                  <div className={styles['order-row-data']} id={styles['payment-status-cell']} style={{ color: order.payment_status === 'pending' ? '#F77C27' : order.payment_status === 'submitted' ? '#115FFC' : order.payment_status === "verified" ? '#21A168' : 'red', fontSize: '14px', fontWeight: '300' }}>{order.payment_status}</div>
                  <div className={styles['order-row-data']} id={styles['amount-cell']}>&#8358;{Number(order.total_amount).toLocaleString()}</div>
                  <div className={styles['order-row-data']} id={styles['date-cell']}>{formatDate(order.created_at)}</div>
                  <div className={styles['order-row-data']} id={styles['view-cell']} onClick={() => viewOrder(order.order_id)}>view</div>
                </div>
              ))}
            </>
          }

        </div>
      </div>

      {/* --- ORDER MODAL --- */}
      <Modal isOpen={isOpen} onClose={onClose}  >
        <ModalOverlay />
        <ModalContent sx={{ maxWidth: '450px' }} position="absolute" className={styles['modal-content']} >
          <ModalHeader className={styles['modal-header']}>Order no. {singleOrder?.order_id} </ModalHeader>
          <ModalCloseButton className={styles['modal-close-button']} />

          {loading2 ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: '10px', fontSize: '15px', margin: '30px 0' }}><Loader color={'#115ffc'} size={28} /> Loading . . .</div>
            :
            <ModalBody>
              <AdminOrderDetails order={singleOrder} />
            </ModalBody>


            // <ModalBody>

            //   {/* --- MODAL TAB --- */}
            //   <div className={styles['modal-tab-container']}>
            //     <p className={modalTab === '1' ? styles['active-modal-tab'] : styles['']} onClick={() => setModalTab('1')}><FiInfo size={20} /> Order Info</p>
            //     <p className={modalTab === '2' ? styles['active-modal-tab'] : styles['']} onClick={() => setModalTab('2')}> <FaBoxOpen size={20} />Products</p>
            //     <p className={modalTab === '3' ? styles['active-modal-tab'] : styles['']} onClick={() => setModalTab('3')}> <FaShippingFast size={20} />Delivery</p>
            //   </div>

            //   {/* --- ORDER INFO TAB --- */}
            //   {modalTab === '1' && <div>
            //     <div className={styles['order-info-tab-section']}>
            //       <p className={styles['order-info-tab-heading']}>Customer info</p>

            //       <p className={styles['order-info-tab-label']}><span>Name</span> <span>Omodele Samuel</span></p>
            //       <p className={styles['order-info-tab-label']}><span>Email</span> <span>abc@gmail.com</span></p>
            //       <p className={styles['order-info-tab-label']}><span>Phone no.</span> <span>08012347890</span></p>
            //     </div>
            //     <div className={styles['order-info-tab-section']}>
            //       <p className={styles['order-info-tab-heading']}>Order info</p>

            //       <p className={styles['order-info-tab-label']}><span>Order date</span> <span>Dec 6, 2024, 10:00AM</span></p>
            //       <p className={styles['order-info-tab-label']}><span>Status</span> <span style={{ color: '#F77C27' }}>pending</span></p>
            //       <p className={styles['order-info-tab-label']}><span>Product Amount</span> <span>$75,000</span></p>
            //       <p className={styles['order-info-tab-label']}><span>Shipping fee</span> <span>$400</span></p>
            //       <p className={styles['order-info-tab-label']}><span>Total</span> <span>$75,400</span></p>
            //       <p className={styles['order-info-tab-label']}><span>Payment status</span> <span style={{ color: '#F77C27' }}>submitted</span></p>
            //     </div>

            //     <div className={styles['order-info-tab-section']}>
            //       <p className={styles['order-info-tab-heading']}>Payment Proof</p>
            //       <img src={payment_receipt} className={styles['payment-receipt-image']} alt="" />
            //       <div className={styles['validate-payment-container']}>
            //         <p className={styles['validate-payment-text']}>validate payment</p>
            //         <button className={styles['verify']}>Verify</button>
            //         <button className={styles['reject']}>Reject</button>
            //       </div>
            //     </div>

            //   </div>}

            //   {modalTab === '2' && <div>
            //     <div className={styles['order-info-tab-section']}>
            //       <p className={styles['order-info-tab-heading']}>Items</p>


            //       <div className={styles['order-info-tab-label']} style={{ alignItems: 'center', marginBottom: '20px' }}>
            //         <div style={{ display: 'flex', gap: '10px' }}>
            //           <div style={{ width: '60px' }}><img src={watchImage} alt="" className={styles['product-image']} /></div>

            //           <div>
            //             <p style={{ fontSize: '15px', fontWeight: '500' }}>Wrist Watch</p>
            //             <p style={{ fontSize: '13px' }}>Accessories</p>
            //             <p style={{ fontSize: '13.5px' }}>$2,500/unit</p>
            //           </div>
            //         </div>
            //         <p>2 units</p>
            //         <p>$5,000</p>
            //       </div>
            //       <div className={styles['order-info-tab-label']} style={{ alignItems: 'center', marginBottom: '20px' }}>
            //         <div style={{ display: 'flex', gap: '10px' }}>
            //           <div style={{ width: '60px' }}><img src={watchImage} alt="" className={styles['product-image']} /></div>

            //           <div>
            //             <p style={{ fontSize: '15px', fontWeight: '500' }}>Wrist Watch</p>
            //             <p style={{ fontSize: '13px' }}>Accessories</p>
            //             <p style={{ fontSize: '13.5px' }}>$2,500/unit</p>
            //           </div>
            //         </div>
            //         <p>2 units</p>
            //         <p>$5,000</p>
            //       </div>
            //       <div className={styles['order-info-tab-label']} style={{ alignItems: 'center', marginBottom: '20px' }}>
            //         <div style={{ display: 'flex', gap: '10px' }}>
            //           <div style={{ width: '60px' }}><img src={watchImage} alt="" className={styles['product-image']} /></div>

            //           <div>
            //             <p style={{ fontSize: '15px', fontWeight: '500' }}>Wrist Watch</p>
            //             <p style={{ fontSize: '13px' }}>Accessories</p>
            //             <p style={{ fontSize: '13.5px' }}>$2,500/unit</p>
            //           </div>
            //         </div>
            //         <p>2 units</p>
            //         <p>$5,000</p>
            //       </div>

            //     </div>
            //     <div className={styles['order-info-tab-label']} style={{ alignItems: 'center', fontSize: '15.5px', fontWeight: '500', marginBottom: '15px' }}>
            //       <p>Total Product amount:</p>
            //       <p>$15,000</p>
            //     </div>
            //   </div>}

            //   {modalTab === '3' && <div style={{ marginBottom: '15px', position: 'relative' }}>
            //     <img src={map} alt="" style={{ height: '150px', width: '100%', borderRadius: '10px', marginBottom: '10px', border: '1.5px solid rgba(17, 95, 252, 0.2)' }} />
            //     <img src={locationIcon} alt="" style={{ position: 'absolute', top: '30px', left: '150px', width: '80px' }} />
            //     <p style={{ fontSize: '20px', fontWeight: '600' }}>Lagos State</p>
            //     <p style={{ fontSize: '13px', padding: '5px 0' }}>Delivery takes 4 - 5 working days </p>
            //     {/* <p style={{ fontSize: '13px', padding: '5px 0' }}>Delivery date: Jan 1 2025 (1:00PM)</p> */}
            //     <p style={{ fontSize: '16px', fontWeight: '500', display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid #E6E6E6', padding: '10px 0', marginTop: '10px' }}><span>Shipping Fee</span><span>$450</span></p>
            //   </div>}

            // </ModalBody>
          }
        </ModalContent>
      </Modal>
    </div>
  )
}

export default AdminOrders