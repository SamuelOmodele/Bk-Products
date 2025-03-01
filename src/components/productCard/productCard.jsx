import React from 'react';
import styles from './productCard.module.css'
import { FaRegHeart } from "react-icons/fa";
import product_img from '../../assets/wrist-watch.jpg'
import { useNavigate } from 'react-router-dom';
import { MdAddShoppingCart } from "react-icons/md";

const ProductCard = ({ image, name, category, description, price, stock }) => {

  const navigate = useNavigate();

  return (
    <div className={styles['product-card']}>
      <div className={styles['card-image']}>
        <img src={image || product_img} alt="" />
        <FaRegHeart className={styles['like-icon']} />
      </div>
      <div className={styles['name-price']}>
        <p className={styles['name']}>{name || 'SUN8 Generic Men Wrist Watch'}</p>
        <div className={styles['category-2']}>{category || "gadgets"}</div>
      </div>
      {/* <div className={styles['description']}>{description || product_description}</div> */}

      <p className={styles['price']}>&#8358;{Number(price).toLocaleString()} </p>
      <p className={styles['quantity']}>{stock} items left</p>
      <div className={styles['button-cart']}>
        <button onClick={() => navigate('/product-detail')}>View Product</button>
        <div >
          <MdAddShoppingCart size={24} className={styles['cart']} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard