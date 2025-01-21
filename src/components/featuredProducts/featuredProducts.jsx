import React from 'react'
import ProductCard from '../productCard/productCard'
import styles from './featuredProducts.module.css'
import { GoArrowRight } from 'react-icons/go'


const FeaturedProducts = () => {
  return (
    <div className={styles['featured-product-container']}>
      <div className={styles['featured-head-text']}>

        <h2>Featured Products</h2>
        <div className={styles['view-all-text']}>
          View all Products
          <GoArrowRight size={22} />
        </div>
      </div>
      <div className={styles['product-card-container']}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <button className={styles['view-all-btn']}>View all Products</button>
    </div>
  )
}

export default FeaturedProducts