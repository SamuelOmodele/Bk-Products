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
                <h2>Effortless <span className={styles['gold']}>Shopping</span>, Pure Convienence</h2>
                <p>Shop with BK Products from the comfort of your home, and enjoy a seamless and stress-free experience!</p>
                <button onClick={() => navigate('/shop')}>Shop now</button>
            </div>
        </div>
        <div className={styles['sliding-text']}><p>Experience the best deals and quality products at BK Products! Shop with us today . . .</p></div>
        </>
    )
}

export default Hero