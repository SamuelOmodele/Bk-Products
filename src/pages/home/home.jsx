import React from 'react'
import styles from './home.module.css'
import Navbar from '../../components/navbar/navbar'
import Hero from '../../components/hero/hero'
import HomeFeatures from '../../components/homeFeatures/homeFeatures'

const Home = () => {
    return (
        <div>
            <Navbar active={'home'}/>
            <div className={styles['home-page']}>
                <Hero />
                <HomeFeatures />
            </div>

        </div>
    )
}

export default Home