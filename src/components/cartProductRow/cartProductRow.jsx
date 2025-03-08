import React, { useEffect, useState } from 'react'
import styles from './cartProductRow.module.css'
import product_img from '../../assets/watch3.avif'
import { FiMinus, FiPlus } from 'react-icons/fi'
import Loader from '../loader/loader'
import { useNavigate } from 'react-router-dom'
import { FaTrashAlt } from "react-icons/fa";
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

const CartProductRow = ({ cartItem, fetchCart }) => {

    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [selectedQuantity, setSelectedQualtity] = useState();

    const incrementQuantity = () => {
        if (selectedQuantity < cartItem?.stock) {
            setSelectedQualtity(selectedQuantity => selectedQuantity + 1);
        }
    }

    const decrementQuantity = () => {
        if (selectedQuantity > 1) {
            setSelectedQualtity(selectedQuantity => selectedQuantity - 1);
        }
    }

    useEffect(() => {
        setSelectedQualtity(cartItem?.quantity)
    }, [])

    const [editMessage, setEditMessage] = useState(null);
    const [editLoading, setEditLoading] = useState(false);
    const [editError, setEditError] = useState(null);

    const [deleteMessage, setDeleteMessage] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const editCartItem = async () => {
        setEditMessage(null)
        setEditLoading(true);
        setEditError(null);
        const accessToken = localStorage.getItem('accessToken');
        console.log('loading starts for edit ')

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/cart/items/${cartItem?.id}/update`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'quantity': selectedQuantity
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                setEditError(errorData.message);
                console.log('Failed request', errorData)
                return;
            }

            const successResponse = await response.json();
            setEditMessage(successResponse.message);
            setTimeout(() => {
                fetchCart();
            }, 500)
            console.log(successResponse);

        } catch (err) {
            setEditError('an unknown error occured');
            console.log('An Unknown Error occured: ', err)
        } finally {
            setEditLoading(false);
        }
    }

    const deleteCartItem = async () => {
        setDeleteMessage(null)
        setDeleteLoading(true);
        setDeleteError(null);
        const accessToken = localStorage.getItem('accessToken');
        console.log('loading starts for Delete ')

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/cart/remove/${cartItem?.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                setDeleteError(errorData.message);
                console.log('Failed request', errorData)
                return;
            }

            const successResponse = await response.json();
            setDeleteMessage(successResponse.message);
            fetchCart();
            console.log(successResponse);

        } catch (err) {
            setDeleteError('an unknown error occured');
            console.log('An Unknown Error occured: ', err)
        } finally {
            setDeleteLoading(false);
        }
    }

    return (
        <>
            {/* <div className={styles['product-row']}>
                <div className={styles['product-data']}>
                    <img src={cartItem?.productimage} alt="" />
                    <div>
                        <p className={styles['product-category']}>{cartItem?.category}</p>
                        <p className={styles['product-name']} onClick={() => navigate(`/product-detail/${cartItem?.product_id}`)}>{cartItem?.product_name}</p>
                        <p className={styles['stock-amount']}><span>{cartItem?.stock} items</span> left</p>
                    </div>
                </div>
                <div className={styles['product-price']}>&#8358;{Number(cartItem?.price).toLocaleString()}</div>
                <div className={styles['product-quantity']}>
                    <FiMinus className={styles['quantity-icon']} onClick={decrementQuantity} />
                    {selectedQuantity}
                    <FiPlus className={styles['quantity-icon']} onClick={incrementQuantity} />
                    {selectedQuantity !== cartItem?.quantity &&
                        <div className={styles['save']}>
                            {editMessage ?
                                <p style={{ color: 'green', fontSize: '12px', fontWeight: '500' }}>update successful</p>
                                :
                                <>
                                    {editError && <p style={{ color: 'red', fontSize: '12px', fontWeight: '500' }}>{editError}</p>}
                                    <button className={styles['save-btn']} onClick={editCartItem}>
                                        {editLoading ? <Loader size={20} /> : 'save'}
                                    </button>
                                </>
                            }
                        </div>
                    }
                </div>
                <div className={styles['product-total-price']}>&#8358;{Number(cartItem?.total_price).toLocaleString()}</div>
                <FaTrashAlt className={styles['trash']} onClick={onOpen} />
            </div> */}
            <div className={styles['mobile-product-row']}>
                <img src={cartItem?.productimage} alt="" />
                <div className={styles['mobile-product-details']}>
                    <p className={styles['mobile-product-name']} onClick={() => navigate(`/product-detail/${cartItem?.product_id}`)}>{cartItem?.product_name}</p>
                    <p className={styles['stock-amount']} style={{ margin: '3px 0 7px', fontSize: '14px' }}><span>{cartItem?.stock} items</span> left</p>
                    <div className={styles['bottom']}>
                        <div className={styles['product-quantity']}>
                            <FiMinus className={styles['quantity-icon']} onClick={decrementQuantity} />
                            {selectedQuantity}
                            <FiPlus className={styles['quantity-icon']} onClick={incrementQuantity} />
                            {selectedQuantity !== cartItem?.quantity &&
                                <div className={styles['save']}>
                                    {editMessage ?
                                        <p style={{ color: 'green', fontSize: '12px', fontWeight: '500', textAlign: 'center' }}>update successful</p>
                                        :
                                        <>
                                            {editError && <p style={{ color: 'red', fontSize: '12px', fontWeight: '500' }}>{editError}</p>}
                                            <button className={styles['save-btn']} onClick={editCartItem}>
                                                {editLoading ? <Loader size={20} /> : 'save'}
                                            </button>
                                        </>
                                    }
                                </div>
                            }
                        </div>
                        <div className={styles['mobile-product-price']}>&#8358;{Number(cartItem?.total_price).toLocaleString()}</div>
                    </div>
                </div>
                <FaTrashAlt className={styles['trash']} style={{ right: '0' }} onClick={onOpen} />

            </div>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent margin={'auto'}>
                    <ModalHeader className={styles['modal-header']}>
                        <FaTrashAlt className={styles['icon']} />
                        <p className={styles['modal-head-text']}>Delete</p>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p className={styles['modal-p']}>
                            Delete <b>'{cartItem?.product_name}'</b> from your cart ?
                        </p>
                        {deleteError && <p style={{ fontSize: '14px', color: 'red', marginTop: '5px' }}>{deleteError}</p>}
                        <div className={styles['buttons']}>
                            <button className={styles['modal-btn']} style={{ backgroundColor: 'red' }} onClick={onClose}>Cancel</button>
                            <button className={styles['modal-btn']} onClick={deleteCartItem}>{deleteLoading ? <Loader size={20} /> : 'Delete'}</button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CartProductRow