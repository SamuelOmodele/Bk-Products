import React from 'react';
import styles from './productCard.module.css'
import { FaRegHeart } from "react-icons/fa";
import product_img from '../../assets/phone.jpg'

const ProductCard = () => {
  return (
    <div className={styles['product-card']}>
        <div className={styles['card-image']}>
            <img src={product_img} alt="" />
            <FaRegHeart className={styles['like-icon']}/>
        </div>
        <div className={styles['name-price']}>
            <p className={styles['name']}>Google Pixel 9</p>
            <div className={styles['category']}>phone</div>
        </div>
        <div className={styles['description']}>Lorem ipsum dolor sit amet consectetur.</div>
        
        <p className={styles['price']}>$250.00</p>
        <button>View Product</button>
    </div>
  )
}

export default ProductCard