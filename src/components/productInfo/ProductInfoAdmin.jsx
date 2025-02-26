import React, { useState, useEffect } from 'react'
import styles from './productInfo.module.css'
import product_image1 from '../../assets/wrist-watch.jpg'
import product_image2 from '../../assets/watch2.jpeg'
import product_image3 from '../../assets/watch3.avif'
import product_image4 from '../../assets/watch4.webp'
import product_image5 from '../../assets/watch5.jpg'

const ProductInfoAdmin = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0
        });
    }, []);

    const [images, setImages] = useState([product_image1, product_image2, product_image3, product_image4, product_image5])
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const product_features = [
        "Dial Design: Black dial with luminous hands and elegant markers for easy readability.",
        "Day and Date Functionality: Stay organized with a clear day and date display at the 3 o'clock position.",
        "Material: High-quality stainless steel strap with a polished gold and silver finish.",
        "Water-Resistant: Built to withstand everyday splashes and brief water exposure.",
        "Precision Movement: Powered by a reliable quartz movement for accurate timekeeping."
    ]


    return (
        <div>
            <div className={styles['product-info-section']} style={{ width: '100%' }}>
                <div className={styles['left-section']}>
                    <p>Gadgets </p>
                    <div className={styles['product-images']}>
                        <img src={images[currentImageIndex]} alt="" className={styles['main-image']} />
                        <div className={styles['smaller-images']}>
                            {images.map((image, index) => (
                                <img src={image} key={index} alt="" onClick={() => setCurrentImageIndex(index)} style={{ border: (currentImageIndex === index) ? "2px solid #354666" : '' }} />
                            ))}

                        </div>
                    </div>
                </div>
                <div className={styles['right-section']}>
                    <h3 className={styles['product-name']}>SUN8 Generic Mens Wrist Watch</h3>
                    <p className={styles['product-description']}>
                        Luxury Gold and Black Wristwatch with Day and Date Display
                    </p>
                    <p className={styles['product-features']}>
                        <p className={styles['features-head']}>Features</p>
                        {product_features.map((feature, index) => (
                            <li key={index} className={styles['each-feature']}>{feature}</li>
                        ))}

                    </p>
                    <p className={styles['product-price']}>
                        $250.00
                        <span className={styles['per-unit-text']}>per unit</span>
                    </p>
                    <p className={styles['stock']}> <span className={styles['stock-no']}>20 items</span> left</p>

                </div>
            </div>
        </div>
    )
}

export default ProductInfoAdmin