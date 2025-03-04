import React from 'react'
import styles from './productDetails.module.css'
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/footer'
import ProductInfo from '../../components/productInfo/productInfo'

const ProductDetails = () => {
    return (
        <div style={{minHeight: '100vh' }}>
            <Navbar active={''} />
            <div className={styles['content-page']}>
                <ProductInfo />
                <Footer />
            </div>
        </div>
    )
}

export default ProductDetails