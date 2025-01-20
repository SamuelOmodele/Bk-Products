import React from 'react'
import styles from './home.module.css'
import Navbar from '../../components/navbar/navbar'
import Hero from '../../components/hero/hero'
import HomeFeatures from '../../components/homeFeatures/homeFeatures'
import FeaturedProducts from '../../components/featuredProducts/featuredProducts'
import NewProducts from '../../components/newProducts/newProducts'
import SearchBar from '../../components/searchBar/searchBar'
import AboutUs from '../../components/aboutUs/aboutUs'
import StayUpdated from '../../components/stayUpdated/stayUpdated'
import Footer from '../../components/footer/footer'

const Home = () => {
    return (
        <div>
            <Navbar active={'home'}/>
            <div className={styles['home-page']}>
                <Hero />
                <SearchBar />
                <FeaturedProducts />
                <NewProducts />
                <AboutUs />
                <StayUpdated />
                <Footer />
            </div>

        </div>
    )
}

export default Home