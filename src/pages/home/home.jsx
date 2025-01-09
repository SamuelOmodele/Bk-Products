import React from 'react'
import styles from './home.module.css'
import Navbar from '../../components/navbar/navbar'
import Hero from '../../components/hero/hero'
import HomeFeatures from '../../components/homeFeatures/homeFeatures'
import FeaturedProducts from '../../components/featuredProducts/featuredProducts'
import NewProducts from '../../components/newProducts/newProducts'

const Home = () => {
    return (
        <div>
            <Navbar active={'home'}/>
            <div className={styles['home-page']}>
                <Hero />
                <HomeFeatures />
                <FeaturedProducts />
                <NewProducts />
            </div>

        </div>
    )
}

export default Home