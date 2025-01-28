import React, { useState } from 'react'
import styles from './orderContent.module.css'
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
import OrderDetails from '../orderDetails/orderDetails';

const SingleOrderBox = ({ order }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalType, setModalType] = useState();
    const [paymentReceipt, setPaymentReceipt] = useState(null);

    const openModal = (modal_type) => {
        setModalType(modal_type);
        onOpen();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a preview URL for the uploaded file
            const fileURL = URL.createObjectURL(file);
            setPaymentReceipt(fileURL); // Update state with the file URL
        }
    };

    return (
        <div className={styles['single-order-box']}>
            
            <div className={styles['box-header']}>
                <div>
                    <h4>ORDER ID: {order?.orderId}</h4>
                    <p className={styles['order-status']}>Status : <span className={order?.orderStatus === 'pending' ? styles['orange'] : order?.orderStatus === 'processing' ? styles['blue'] : styles['green']}>{order?.orderStatus}</span></p>
                </div>
                <button onClick={() => openModal('track')}>Track Order</button>
            </div>
            <div className={styles['box-row1']}>
                <p>{order?.numOfProduct} Products</p>
                <p>{order?.orderDate}</p>
            </div>
            <div className={styles['box-row2']}>
                <p>Delivery Zone: {order?.deliveryZone}</p>

                <p>Payment : <span className={order?.paymentStatus === 'pending' ? styles['orange'] : order?.paymentStatus === 'submitted' ? styles['blue'] : order?.paymentStatus === 'verified' ? styles['green'] : styles['red']} >{order?.paymentStatus}</span></p>
            </div>
            <div className={styles['box-total']}>
                <p>Total : {order?.totalPrice}</p>
                <div className={styles['box-buttons']}>
                    <button onClick={() => openModal('pay')}>Make Payment</button>
                    <button onClick={() => openModal('view')}>View Details</button>
                </div>
            </div>

            {/* --- MODAL --- */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered={modalType === 'track' ? true : false}>
                <ModalOverlay />
                <ModalContent style={{margin: '30px 0'}} >
                    <ModalHeader style={{textAlign: 'center'}}>
                        {modalType === 'track' && 'Track Order'}
                        {modalType === 'pay' && 'Make Payment'}
                        {modalType === 'view' && 'Order Details'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody style={{padding: '10px', marginTop: '-10px', borderTop: '1.5px solid #f2f2f2'}}>

                        {modalType === 'track' && <div className={styles['track-message']}>
                            {order.orderStatus === 'pending' && order.paymentStatus === 'pending' && <div>
                                <p>Your Order is pending. Click <span onClick={() => openModal('pay')} style={{ color: '#115ffc', textDecoration: 'underline', cursor: 'pointer' }}>Make payment</span> to proceed.</p>
                            </div>}
                            {order.orderStatus === 'pending' && order.paymentStatus === 'submitted' && <div>
                                <p>Your Order is pending, and your payment is being validated. Please check back later.</p>
                            </div>}
                            {order.orderStatus === 'pending' && order.paymentStatus === 'declined' && <div>
                                <p>Your order is pending. Your payment was rejected. Please confirm your bank transfer and re-upload your payment receipt.</p>
                            </div>}
                            {order.orderStatus === 'processing' && order.paymentStatus === 'verified' && <div>
                                <p>Your payment has been verified, and your order is being processed. Our dispatch riders will reach out to you soon via phone call. Please be reachable.</p>
                            </div>}
                            {order.orderStatus === 'delivered' && order.paymentStatus === 'verified' && <div>
                                <p>Your order has been delivered and hence closed.</p>
                            </div>}
                        </div>}

                        {modalType === 'pay' && <div className={styles['payment-message']}>
                            <div className={styles['account-info']}><p>Account Name:</p><p>BK PRODUCTS </p></div>
                            <div className={styles['account-info']}><p>Account Number:</p><p>0123456789 </p></div>
                            <div className={styles['account-info']}><p>Bank Name:</p><p>GT Bank </p></div>
                            
                            <div className={styles['upload-section']}>
                                <div className={styles['payment-amount-message']}>Pay the sum of $2,000.00 to the account above</div>
                                {paymentReceipt && <img src={paymentReceipt} alt="" />}
                                {!paymentReceipt && <>
                                    <p>Upload your bank transfer receipt</p>
                                    <label htmlFor="upload" className={styles['upload-btn']}>Select File</label>
                                </>}

                                {paymentReceipt && <button className={styles['upload-btn']}>upload</button>}

                            </div>

                            <input type="file" name="" id="upload" onChange={handleFileChange} style={{ display: 'none' }} />
                        
                        </div>}

                        {modalType === 'view' &&
                            <OrderDetails />
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default SingleOrderBox