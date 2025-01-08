import React from 'react'
import styles from './hero.module.css'
import image from '../../assets/couple-image.png'

const Hero = () => {
    return (
        <div className={styles['hero-section']}>
            <div className={styles['hero-text']}>
                <h2>Effortless <span className={styles['gold']}>Shopping</span>, Pure Convienence</h2>
                <p>Shop from the comfort of your home and enjoy a stress-free experience. Explore a world of endless options and find exactly what you need in just a few clicks!</p>
                <button>Shop now</button>
            </div>
            <img src={image} alt="" />
        </div>
    )
}

export default Hero