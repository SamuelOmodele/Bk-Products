import React from 'react'
import styles from './home.module.css'
import Navbar from '../../components/navbar/navbar'
import Hero from '../../components/hero/hero'
import HomeFeatures from '../../components/homeFeatures/homeFeatures'
import FeaturedProducts from '../../components/featuredProducts/featuredProducts'
import NewProducts from '../../components/newProducts/newProducts'
import SearchBar from '../../components/searchBar/searchBar'

const Home = () => {
    return (
        <div>
            <Navbar active={'home'}/>
            <div className={styles['home-page']}>
                <Hero />
                <SearchBar />
                {/* <HomeFeatures /> */}
                <FeaturedProducts />
                <NewProducts />
            </div>

        </div>
    )
}

export default Home