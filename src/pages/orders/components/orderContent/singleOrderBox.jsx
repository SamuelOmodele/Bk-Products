import React, { useEffect, useState } from 'react'
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
import Loader from '../../../../components/loader/loader';

const SingleOrderBox = ({ order, fetchOrders }) => {
    const [customMargin, setCustomMargin] = useState('auto');


    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalType, setModalType] = useState();

    const [paymentReceiptPreview, setPaymentReceiptPreview] = useState(null);
    const [paymentReceiptImage, setPaymentReceiptImage] = useState(null);


    const openModal = (modal_type) => {

        setModalType(modal_type);
        if (modal_type === 'pay') {
            fetchBankDetails();
        }
        onOpen();
    }

    const closeModal = () => {
        setPaymentReceiptImage(null);
        setPaymentReceiptPreview(null);
        setUploadError(null);
        if (uploadMessage) {
            fetchOrders();
        } else {
            onClose();
        }
    }

    const handleFileChange = (e) => {

        const file = e.target.files[0];
        if (file) {

            const fileURL = URL.createObjectURL(file);
            setPaymentReceiptPreview(fileURL);
            setPaymentReceiptImage(file);
        }
    };
    // --- format order date function ---
    const formatDate = (raw_date) => {
        const date = new Date(raw_date);

        const formattedDate = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });

        return formattedDate;
    }

    const [bankData, setBankData] = useState(null);
    const [bankLoading, setBankLoading] = useState(false);
    const [bankError, setBankError] = useState(null);

    const fetchBankDetails = async () => {
        setBankData(null)
        setBankLoading(true);
        setBankError(null);
        console.log('loading starts')
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/bank-details`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                setBankError(errorData.message);
                console.log('Failed request', errorData);
                return;
            }

            const successResponse = await response.json();
            setBankData(successResponse.bank_details[0]);
            console.log(successResponse);

        } catch (err) {
            setBankError('an unknown error occured');
            console.log('An Unknown Error occured: ', err)
        } finally {
            setBankLoading(false);
        }
    }

    const [uploadMessage, setUploadMessage] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const uploadPaymentReceipt = async () => {
        setUploadMessage(null)
        setUploadLoading(true);
        setUploadError(null);
        console.log('loading starts')
        const accessToken = localStorage.getItem('accessToken');

        if (!paymentReceiptImage) {
            setUploadError("Please select a payment receipt to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('proof_of_payment', paymentReceiptImage)

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/orders/${order?.order_id}/upload-proof`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                setUploadError(errorData.message);
                console.log('Failed request', errorData);
                return;
            }

            const successResponse = await response.json();
            setUploadMessage(successResponse.message);
            console.log(successResponse);

        } catch (err) {
            setUploadError('an unknown error occured');
            console.log('An Unknown Error occured: ', err)
        } finally {
            setUploadLoading(false);
        }
    }

    return (
        <div className={styles['single-order-box']}>

            <div className={styles['box-header']}>
                <div>
                    <h4>ORDER ID: {order?.order_id}</h4>
                    <p className={styles['order-status']}>Status : <span className={order?.order_status.toLowerCase() === 'pending' ? styles['orange'] : order?.order_status.toLowerCase() === 'processing' ? styles['blue'] : order?.order_status.toLowerCase() === 'delivered' ? styles['green'] : styles['red']}>{order?.order_status}</span></p>
                </div>
                <button onClick={() => openModal('track')}>Track Order</button>
            </div>
            <div className={styles['box-row1']}>
                <p>{order?.quantity} Products</p>
                <p>{formatDate(order?.created_at)}</p>
            </div>
            <div className={styles['box-row2']}>
                <p>Delivery Zone: {order?.shipping_zone}</p>

                <p>Payment : <span className={order?.payment_status.toLowerCase() === 'pending' ? styles['orange'] : order?.payment_status.toLowerCase() === 'submitted' ? styles['blue'] : order?.payment_status.toLowerCase() === 'verified' ? styles['green'] : styles['red']} >{order?.payment_status}</span></p>
            </div>
            <div className={styles['box-total']}>
                <p>Total : &#8358;{Number(order?.total_amount).toLocaleString()}</p>
                <div className={styles['box-buttons']}>
                    <button onClick={() => openModal('pay')}>Make Payment</button>
                    <button onClick={() => openModal('view')}>View Details</button>
                </div>
            </div>

            {/* --- MODAL --- */}
            <Modal isOpen={isOpen} onClose={closeModal} >
                <ModalOverlay />
                <ModalContent margin={customMargin}>
                    <ModalHeader style={{ textAlign: 'center' }}>
                        {modalType === 'track' && 'Track Order'}
                        {modalType === 'pay' && 'Make Payment'}
                        {modalType === 'view' && 'Order Details'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody style={{ padding: '10px', marginTop: '-10px', borderTop: '1.5px solid #f2f2f2' }}>

                        {modalType === 'track' && <div className={styles['track-message']}>
                            {order?.order_status?.toLowerCase() === 'pending' && order?.payment_status?.toLowerCase() === 'pending' && <div>
                                <p>Your order is pending. Click <span onClick={() => openModal('pay')} style={{ color: '#115ffc', textDecoration: 'underline', cursor: 'pointer' }}>Make payment</span> to proceed.</p>
                            </div>}
                            {order?.order_status?.toLowerCase() === 'pending' && order?.payment_status?.toLowerCase() === 'submitted' && <div>
                                <p>Your order is currently pending as we validate your payment. Please check back later for an update.</p>
                            </div>}
                            {order?.order_status?.toLowerCase() === 'pending' && order?.payment_status?.toLowerCase() === 'rejected' && <div>
                                <p>Your payment was rejected, and your order is still pending. Please verify your bank transfer and re-upload your payment receipt.</p>
                            </div>}
                            {order?.order_status?.toLowerCase() === 'processing' && order?.payment_status?.toLowerCase() === 'verified' && <div>
                                <p>Your payment has been verified, and your order is now being processed. Our dispatch riders will contact you soon via phone call, so please stay reachable.</p>
                            </div>}
                            {order?.order_status?.toLowerCase() === 'delivered' && order?.payment_status?.toLowerCase() === 'verified' && <div>
                                <p>Your order has been successfully delivered and marked as closed.</p>
                            </div>}
                        </div>}

                        {modalType === 'pay' && <div className={styles['payment-message']}>
                            {bankLoading ?
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '10px', fontSize: '15px', margin: '30px 0' }}><Loader color={'#115ffc'} size={28} /> Loading . . .</div>
                                :
                                <>
                                    <div className={styles['account-info']}><p>Account Name:</p><p>{bankData?.account_name}</p></div>
                                    <div className={styles['account-info']}><p>Account Number:</p><p>{bankData?.account_number}</p></div>
                                    <div className={styles['account-info']}><p>Bank Name:</p><p>{bankData?.bank_name}</p></div>
                                </>}
                            <div className={styles['upload-section']}>
                                <div className={styles['payment-amount-message']}>Your Order amount is <span style={{ fontWeight: '600', color: '#115ffc', fontSize: '15px' }}>&#8358;{Number(order?.total_amount).toLocaleString()}</span>. Proceed to make a bank transfer to the account above and incude your order ID - <span style={{ fontWeight: '600', color: '#115ffc', fontSize: '15px' }}>{order?.order_id}</span> in the description.</div>
                                {paymentReceiptPreview && <img src={paymentReceiptPreview} alt="" />}
                                {!paymentReceiptPreview && <>
                                    <p>Upload your bank transfer receipt</p>
                                    <label htmlFor="upload" className={styles['upload-btn']}>Select File</label>
                                </>}

                                {uploadError && <p style={{ color: 'red', fontSize: '14px' }}>{uploadError}</p>}
                                {uploadMessage && <p style={{ color: 'green', fontSize: '14px' }}>{uploadMessage}</p>}

                                {uploadMessage ?
                                    <button className={styles['upload-btn']} onClick={closeModal}>Ok</button>
                                    :
                                    paymentReceiptPreview && <div style={{ display: 'flex', gap: '10px' }}>
                                        {!uploadLoading &&
                                            <>
                                                <button className={styles['upload-btn']} style={{ backgroundColor: 'red' }} onClick={() => { setPaymentReceiptImage(null); setPaymentReceiptPreview(null); setUploadError(null) }}>remove</button>
                                                <label htmlFor="upload" className={styles['upload-btn']} onClick={() => setUploadError(null)}>Select another File</label>
                                            </>}
                                        <button className={styles['upload-btn']} onClick={uploadPaymentReceipt}>{uploadLoading ? <Loader size={20} /> : 'upload'}</button>
                                    </div>

                                }

                            </div>

                            <input type="file" name="" id="upload" onChange={handleFileChange} style={{ display: 'none' }} />

                        </div>}

                        {modalType === 'view' &&
                            <OrderDetails order_id={order?.order_id} />
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default SingleOrderBox