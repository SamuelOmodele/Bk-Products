import React from 'react'
import styles from './newProducts.module.css'
import ProductCard from '../productCard/productCard'
import { GoArrowRight } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'

const NewProducts = () => {

    const navigate = useNavigate();

    return (
        <div className={styles['featured-product-container']}>
            <div className={styles['featured-head-text']}>

                <h2>New Products</h2>
                <div className={styles['view-all-text']} onClick={() => navigate('/shop')}>
                    View all Products
                    <GoArrowRight size={22} />
                </div>
            </div>
            <div className={styles['product-card-container']}>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
            <button className={styles['view-all-btn']} onClick={() => navigate('/shop')}>View all Products</button>
        </div>
    )
}

export default NewProducts