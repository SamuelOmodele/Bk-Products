import React from 'react'
import styles from './productInfo.module.css'
import product_image from '../../assets/wrist-watch.jpg'
import { FaRegHeart } from 'react-icons/fa6'
import ProductCard from '../productCard/productCard'

const ProductInfo = () => {
    return (
        <div className={styles['product-info-page']}>
            <div className={styles['product-info-section']}>
                <div className={styles['left-section']}>
                    <p>Products {'>'} Gadgets</p>
                    <div className={styles['product-images']}>
                        <img src={product_image} alt="" className={styles['main-image']}/>
                        <div className={styles['smaller-images']}>
                            <img src={product_image} alt="" />
                            <img src={product_image} alt="" />
                            <img src={product_image} alt="" />
                            <img src={product_image} alt="" />
                            <img src={product_image} alt="" />
                        </div>
                    </div>
                </div>
                <div className={styles['right-section']}>
                    <h3 className={styles['product-name']}>SUN8 Generic Mens Wrist Watch</h3>
                    <p className={styles['product-description']}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores debitis voluptatum impedit porro autem ad qui consequuntur ullam suscipit itaque?</p>
                    <p className={styles['product-price']}>$250.00</p>
                    <div className={styles['quantity-stock']}>
                        <div className={styles['quantity']}>
                            <p>-</p>
                            <p>1</p>
                            <p>+</p>
                        </div>
                        <p className={styles['stock']}> <span className={styles['stock-no']}>20 items</span> available in stock</p>
                    </div>
                    <div className={styles['cart-btn']}>
                        <button>Add to cart</button>
                        <FaRegHeart className={styles['like-icon']} />
                    </div>
                </div>
            </div>
            <div className={styles['similar-product-container']}>
                <h3>Similar Products</h3>
                <div className={styles['similar-product-card-container']}>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </div>
    )
}

export default ProductInfo