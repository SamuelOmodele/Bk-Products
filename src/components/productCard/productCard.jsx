import React from 'react';
import styles from './productCard.module.css'
import { FaRegHeart } from "react-icons/fa";
import product_img from '../../assets/wrist-watch.jpg'
import { useNavigate } from 'react-router-dom';

const ProductCard = ({image, name, category, description, price, stock}) => {

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
            <img src={image || product_img} alt="" />
            <FaRegHeart className={styles['like-icon']}/>
        </div>
        <div className={styles['name-price']}>
            <p className={styles['name']}>{name || 'SUN8 Generic Men Wrist Watch'}</p>
            {/* <div className={styles['category']}>{category || "gadgets"}</div> */}
        </div>
        {/* <div className={styles['description']}>{description || product_description}</div> */}
        
        <p className={styles['price']}>&#8358;{Number(price).toLocaleString()} <span>&#8358;280.00</span></p>
        <p className={styles['quantity']}>{stock} items left</p>
        <button onClick={() => navigate('/product-detail')}>View Product</button>
    </div>
  )
}

export default ProductCard