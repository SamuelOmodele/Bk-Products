import React, { useState, useEffect } from 'react'
import styles from './productInfo.module.css'
import product_image1 from '../../assets/wrist-watch.jpg'
import product_image2 from '../../assets/phone2.jpg'
import product_image3 from '../../assets/cloth.png'
import { FaRegHeart } from 'react-icons/fa6'
import ProductCard from '../productCard/productCard'
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";

const ProductInfo = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0
        });
    }, []);

    const [images, setImages] = useState([product_image1, product_image2, product_image3, product_image1, product_image2])
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const availableQuantity = 20;
    const [selectedQuantity, setSelectedQualtity] = useState(1);

    const incrementQuantity = () => {
        if (selectedQuantity < availableQuantity) {
            setSelectedQualtity(selectedQuantity => selectedQuantity + 1);
        }
    }

    const decrementQuantity = () => {
        if (selectedQuantity > 1) {
            setSelectedQualtity(selectedQuantity => selectedQuantity - 1);
        }
    }

    return (
        <div className={styles['product-info-page']}>
            <div className={styles['product-info-section']}>
                <div className={styles['left-section']}>
                    <p>Products {'>'} Gadgets </p>
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
                    <p className={styles['product-description']}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores debitis voluptatum impedit porro autem ad qui consequuntur ullam suscipit itaque?</p>
                    <p className={styles['product-price']}>$250.00</p>
                    <div className={styles['quantity-stock']}>
                        <div className={styles['quantity']}>
                            <p><FiMinus onClick={decrementQuantity} className={styles['icon']} /></p>
                            <p>{selectedQuantity}</p>
                            <p><FiPlus onClick={incrementQuantity} className={styles['icon']} /></p>
                        </div>
                        <p className={styles['stock']}> <span className={styles['stock-no']}>20 items</span> available in stock</p>
                    </div>
                    <div className={styles['cart-btn']}>
                        <button>Add to cart</button>
                        <FaRegHeart className={styles['like-icon']} />
                    </div>
                </div>
            </div>
            <div className={styles['similar-product-container']}>
                <h3>Similar Products</h3>
                <div className={styles['similar-product-card-container']}>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </div>
    )
}

export default ProductInfo