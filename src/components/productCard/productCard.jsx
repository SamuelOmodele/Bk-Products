import React from 'react';
import styles from './productCard.module.css'
import { FaRegHeart } from "react-icons/fa";
import product_img from '../../assets/wrist-watch.jpg'
import { useNavigate } from 'react-router-dom';

const ProductCard = () => {

  const navigate = useNavigate();

  const product_description = 'Luxury Gold and Black Wristwatch with Day and Date Display';
  // const product_description = 'Lorem ipsum dolor sit amet consectetur.';

  const cropDescription = (description) => {
    const words = description.split(" ");
    return words.length > 5 ? words.slice(0, 5).join(" ") + " . . ." : description;
  };


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
        <div className={styles['description']}>{cropDescription(product_description)}</div>
        
        <p className={styles['price']}>$250.00</p>
        <button onClick={() => navigate('/product-detail')}>View Product</button>
    </div>
  )
}

export default ProductCard