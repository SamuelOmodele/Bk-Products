import React, { useState, useEffect } from 'react'
import styles from './productInfo.module.css'
import product_image1 from '../../assets/wrist-watch.jpg'
import product_image2 from '../../assets/watch2.jpeg'
import product_image3 from '../../assets/watch3.avif'
import product_image4 from '../../assets/watch4.webp'
import product_image5 from '../../assets/watch5.jpg'
import { FaRegHeart } from 'react-icons/fa6'
import ProductCard from '../productCard/productCard'
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { useParams } from 'react-router-dom'
import Loader from '../loader/loader'

const ProductInfo = () => {

    const { id } = useParams();

    const [images, setImages] = useState([product_image1, product_image2, product_image3, product_image4, product_image5])
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const availableQuantity = 20;
    const [selectedQuantity, setSelectedQualtity] = useState(1);
    const product_features = [
        "Dial Design: Black dial with luminous hands and elegant markers for easy readability.",
        "Day and Date Functionality: Stay organized with a clear day and date display at the 3 o'clock position.",
        "Material: High-quality stainless steel strap with a polished gold and silver finish.",
        "Water-Resistant: Built to withstand everyday splashes and brief water exposure.",
        "Precision Movement: Powered by a reliable quartz movement for accurate timekeeping."
    ]

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

    useEffect(() => {
        window.scrollTo({
            top: 0
        });
        fetchProductDetails();
    }, [id]);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProductDetails = async () => {
        setData(null)
        setLoading(true);
        setError(null);
        setCurrentImageIndex(0);
        console.log('loading starts')

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/products/${id}`, {
                method: 'GET',
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                console.log('Failed request', errorData);
                return;
            }

            const successResponse = await response.json();
            setData(successResponse.data);
            console.log(successResponse);

        } catch (err) {
            setError('an unknown error occured');
            console.log('An Unknown Error occured: ', err)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles['product-info-page']}>
            {loading ?
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: '10px', fontSize: '16px', margin: '40px 0' }}>
                    <Loader size={35} color={'#115ffc'} /> Loading . . .
                </div>
                :
                <>
                    <div className={styles['product-info-section']}>
                        <div className={styles['left-section']}>
                            <p>Products {'>'} {data?.category || 'Gadgets'} </p>
                            <div className={styles['product-images']}>
                                <img src={data?.media[currentImageIndex]?.gallery} alt="" className={styles['main-image']} />
                                <div className={styles['smaller-images']}>
                                    {data?.media.map((image, index) => (
                                        <img src={image.gallery} key={index} alt="" onClick={() => setCurrentImageIndex(index)} style={{ border: (currentImageIndex === index) ? "2px solid #354666" : '' }} />
                                    ))}

                                </div>
                            </div>
                        </div>
                        <div className={styles['right-section']}>
                            <h3 className={styles['product-name']}>{data?.name || 'SUN8 Generic Mens Wrist Watch'} </h3>
                            <p className={styles['product-description']}>
                                {data?.description || 'Luxury Gold and Black Wristwatch with Day and Date Display'}
                            </p>
                            <div className={styles['product-features']}>
                                <p className={styles['features-head']}>Features</p>
                                {product_features.map((feature, index) => (
                                    <li key={index} className={styles['each-feature']}>{feature}</li>
                                ))}

                            </div>
                            <p className={styles['product-price']}>&#8358;{Number(data?.price).toLocaleString() || '250.00'} <span className={styles['per-unit-text']}>per unit</span></p>
                            <div className={styles['quantity-stock']}>
                                <div className={styles['quantity']}>
                                    <p><FiMinus onClick={decrementQuantity} className={styles['icon']} /></p>
                                    <p>{selectedQuantity}</p>
                                    <p><FiPlus onClick={incrementQuantity} className={styles['icon']} /></p>
                                </div>
                                <p className={styles['stock']}> <span className={styles['stock-no']}>{data?.stock || '25'} items</span> left</p>
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
                            {data?.similar_products.map((product, index) => (
                                <ProductCard key={index} id={product.id} image={product.productimage} name={product.name} category={product.category} description={product.description} price={product.price} stock={product.stock} />
                            ))}
                        </div>
                    </div>
                </>}
        </div>
    )
}

export default ProductInfo