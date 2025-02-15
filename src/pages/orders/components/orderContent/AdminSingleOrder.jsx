import React from 'react'

const AdminSingleOrder = () => {
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
            <Modal isOpen={isOpen} onClose={onClose} >
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
                            {order.orderStatus === 'pending' && order.paymentStatus === 'pending' && <div>
                                <p>Your order is pending. Click <span onClick={() => openModal('pay')} style={{ color: '#115ffc', textDecoration: 'underline', cursor: 'pointer' }}>Make payment</span> to proceed.</p>
                            </div>}
                            {order.orderStatus === 'pending' && order.paymentStatus === 'submitted' && <div>
                                <p>Your order is currently pending as we validate your payment. Please check back later for an update.</p>
                            </div>}
                            {order.orderStatus === 'pending' && order.paymentStatus === 'declined' && <div>
                                <p>Your payment was rejected, and your order is still pending. Please verify your bank transfer and re-upload your payment receipt.</p>
                            </div>}
                            {order.orderStatus === 'processing' && order.paymentStatus === 'verified' && <div>
                                <p>Your payment has been verified, and your order is now being processed. Our dispatch riders will contact you soon via phone call, so please stay reachable.</p>
                            </div>}
                            {order.orderStatus === 'delivered' && order.paymentStatus === 'verified' && <div>
                                <p>Your order has been successfully delivered and marked as closed.</p>
                            </div>}
                        </div>}

                        {modalType === 'pay' && <div className={styles['payment-message']}>
                            <div className={styles['account-info']}><p>Account Name:</p><p>BK PRODUCTS </p></div>
                            <div className={styles['account-info']}><p>Account Number:</p><p>0123456789 </p></div>
                            <div className={styles['account-info']}><p>Bank Name:</p><p>GT Bank </p></div>

                            <div className={styles['upload-section']}>
                                <div className={styles['payment-amount-message']}>Your Order amount is <span style={{ fontWeight: '600', color: '#115ffc', fontSize: '15px' }}>{order.totalPrice}</span>. Proceed to make a bank transfer to the account above and incude your order ID - <span style={{ fontWeight: '600', color: '#115ffc', fontSize: '15px' }}>{order.orderId}</span> in the description.</div>
                                {paymentReceiptPreview && <img src={paymentReceiptPreview} alt="" />}
                                {!paymentReceiptPreview && <>
                                    <p>Upload your bank transfer receipt</p>
                                    <label htmlFor="upload" className={styles['upload-btn']}>Select File</label>
                                </>}

                                {paymentReceiptPreview && <div style={{ display: 'flex', gap: '10px' }}>
                                    <label htmlFor="upload" className={styles['upload-btn']}>Select another File</label>
                                    <button className={styles['upload-btn']}>upload</button>
                                </div>}

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

export default AdminSingleOrder