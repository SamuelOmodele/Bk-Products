import React from 'react';
import styles from './productCard.module.css'
import { FaRegHeart } from "react-icons/fa";
import product_img from '../../assets/wrist-watch.jpg'
import { useNavigate } from 'react-router-dom';

const ProductCard = () => {

  const navigate = useNavigate();

  return (
    <div className={styles['product-card']}>
        <div className={styles['card-image']}>
            <img src={product_img} alt="" />
            <FaRegHeart className={styles['like-icon']}/>
        </div>
        <div className={styles['name-price']}>
            <p className={styles['name']}>SUN8 Generic Men Wrist Watch</p>
            <div className={styles['category']}>clothing</div>
        </div>
        <div className={styles['description']}>Lorem ipsum dolor sit amet consectetur.</div>
        
        <p className={styles['price']}>$250.00</p>
        <button onClick={() => navigate('/product-detail')}>View Product</button>
    </div>
  )
}

export default ProductCard