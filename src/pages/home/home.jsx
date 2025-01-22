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
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate();

    return (
        <div>
            <Navbar active={'home'}/>
            <div className={styles['content-page']}>
                <Hero />
                <div onClick={() => navigate('/search')}>
                    <SearchBar top='50px' />
                </div>
                
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