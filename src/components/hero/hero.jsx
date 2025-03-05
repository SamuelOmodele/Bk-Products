import React from 'react'
import styles from './hero.module.css'
import image from '../../assets/couple-image.png'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate();
    return (
        <>
        <div className={styles['hero-section']}>
            <div className={styles['hero-text']}>
                <h2>Innovative <span className={styles['gold']}>Products</span>, Quality you can trust.</h2>
                <p>At BK, we combine innovation with quality to create products that are reliable, durable, and built to perform. Join us today!</p>
                <button onClick={() => navigate('/shop')}>Explore</button>
            </div>
        </div>
        <div className={styles['sliding-text']}><p>Experience the best deals and quality products at BK Products! Shop with us today . . .</p></div>
        </>
    )
}

export default Hero