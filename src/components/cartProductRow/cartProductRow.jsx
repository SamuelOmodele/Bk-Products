import React, { useState } from 'react'
import styles from './cartProductRow.module.css'
import product_img from '../../assets/watch3.avif'
import { FiMinus, FiPlus } from 'react-icons/fi'

const CartProductRow = () => {

    const availableQuantity = 20;
    const initialQuantity = 2;
    const [selectedQuantity, setSelectedQualtity] = useState(initialQuantity);

    const incrementQuantity = () => {
        if (selectedQuantity < availableQuantity) {
            setSelectedQualtity(selectedQuantity => selectedQuantity + 1);
        }
    }

    const decrementQuantity = () => {
        if (selectedQuantity > 1) {
            setSelectedQualtity(selectedQuantity => selectedQuantity - 1);
        }
    }

    return (
        <div className={styles['product-row']}>
            <div className={styles['product-data']}>
                <img src={product_img} alt="" />
                <div>
                    <p className={styles['product-category']}>Gadgets</p>
                    <p className={styles['product-name']}>SUN8 Generic Mens Wrist Watch</p>
                    <p className={styles['stock-amount']}><span>{availableQuantity} items</span> left</p>
                </div>
            </div>
            <div className={styles['product-price']}>&#8358;250.00</div>
            <div className={styles['product-quantity']}>
                <FiMinus className={styles['quantity-icon']} onClick={decrementQuantity}/>
                {selectedQuantity}
                <FiPlus className={styles['quantity-icon']} onClick={incrementQuantity}/>
                {selectedQuantity !== initialQuantity && <button className={styles['save']}>Save</button>}
            </div>
            <div className={styles['product-total-price']}>&#8358;500.00</div>
        </div>
    )
}

export default CartProductRow