import React from 'react'
import styles from './shop.module.css'
import Navbar from '../../components/navbar/navbar'
import AllProducts from '../../components/allProducts/allProducts'
import StayUpdated from '../../components/stayUpdated/stayUpdated'
import Footer from '../../components/footer/footer'

const Shop = () => {
    return (
        <div>
            <Navbar active={'shop'} />
            <div className={styles['content-page']}>
                <AllProducts />
                <Footer />
            </div>

        </div>
    )
}

export default Shop