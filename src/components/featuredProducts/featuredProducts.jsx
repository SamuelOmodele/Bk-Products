import React from 'react'
import ProductCard from '../productCard/productCard'
import styles from './featuredProducts.module.css'

const FeaturedProducts = () => {
  return (
    <div className={styles['featured-cards']}>
        <h2>Featured Products</h2>
        <div className={styles['product-card-container']}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
    </div>
  )
}

export default FeaturedProducts