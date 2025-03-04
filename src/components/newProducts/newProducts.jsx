import React, { useEffect, useState } from 'react'
import styles from './newProducts.module.css'
import ProductCard from '../productCard/productCard'
import { GoArrowRight } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import Loader from '../loader/loader'

const NewProducts = () => {

    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setData(null)
        setLoading(true);
        setError(null);
        console.log('loading starts')

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/products`, {
                method: 'GET',
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                console.log('Failed request', errorData);
                return;
            }

            const successResponse = await response.json();
            setData(successResponse);
            console.log(successResponse);

        } catch (err) {
            setError('an unknown error occured');
            console.log('An Unknown Error occured: ', err)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles['featured-product-container']}>
            <div className={styles['featured-head-text']}>

                <h2>New Products</h2>
                <div className={styles['view-all-text']} onClick={() => navigate('/shop')}>
                    View all Products
                    <GoArrowRight size={22} />
                </div>
            </div>
            <div className={styles['product-card-container']} style={{marginBottom: loading ? '30px': ''}}>
                {error && <p style={{ fontSize: '14px', color: 'red', marginBottom: '20px' }}>{error}</p>}
                {loading ?
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%', gap: '10px', fontSize: '16px', margin: '10px 0'}}>
                        <Loader size={35} color={'#115ffc'} /> Loading . . .
                    </div>
                    :
                    <>
                        {data?.data.map((product, index) => (
                            <ProductCard key={index} id={product.id} image={product.productimage} name={product.name} category={product.category} description={product.description} price={product.price} stock={product.stock} />
                        ))}
                        {(data?.data.length === 0 && !error) && <p>No product available</p>}
                    </>
                }

            </div>
            <button className={styles['view-all-btn']} onClick={() => navigate('/shop')}>View all Products</button>
        </div>
    )
}

export default NewProducts