import React, { useEffect, useState } from 'react'
import styles from './cartProductRow.module.css'
import product_img from '../../assets/watch3.avif'
import { FiMinus, FiPlus } from 'react-icons/fi'
import Loader from '../loader/loader'
import { useNavigate } from 'react-router-dom'

const CartProductRow = ({ cartItem, fetchCart }) => {

    const navigate = useNavigate();

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

    return (
        <div className={styles['product-row']}>
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
        </div>
    )
}

export default CartProductRow