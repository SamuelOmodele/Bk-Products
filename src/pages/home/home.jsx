import React from 'react'
import styles from './home.module.css'
import Navbar from '../../components/navbar/navbar'
import hero_image from '../../assets/Cart-image2.png'

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className={styles['home-page']}>
                <div className={styles['hero-section']}>
                    <div className={styles['hero-text']}>
                        <p className={styles['hanging-text']} style={{color: '#115FFC'}}>Your Trusted Shopping Platform</p>
                        <h2>Effortless Shopping, Pure Convienence</h2>
                        <p>Shop from the comfort of your home and enjoy a stress-free experience. Explore a world of endless options and find exactly what you need in just a few clicks!</p>
                        <button>Shop now</button>
                    </div>
                    {/* <div className={styles['hero-image']}>
                        <img src={hero_image} alt="" />
                    </div> */}
                </div>
            </div>

        </div>
    )
}

export default Home