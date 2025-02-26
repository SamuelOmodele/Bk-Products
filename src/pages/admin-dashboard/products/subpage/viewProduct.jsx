import React, { useEffect, useState } from 'react'
import styles from './viewProduct.module.css'
import { useNavigate } from 'react-router-dom'
import { MdOutlineDone } from "react-icons/md";
import product_image from '../../../../assets/cloth.png'
import { IoAdd, IoCloseCircle } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { RiEditLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import Loader from '../../../../components/loader/loader';
import product_image1 from '../../../../assets/wrist-watch.jpg'
import product_image2 from '../../../../assets/watch2.jpeg'
import product_image3 from '../../../../assets/watch3.avif'
import product_image4 from '../../../../assets/watch4.webp'
import product_image5 from '../../../../assets/watch5.jpg'

const ViewProduct = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  const fetchSingleProduct = async () => {

    setData(null)
    setLoading(true);
    setError(null);
    const accessToken = localStorage.getItem('accessToken');
    console.log('loading starts ')

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/products/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        console.log('Failed request', errorData.message)
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

  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <>
      {loading ?
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: '10px', fontSize: '15px', margin: '30px 0' }}><Loader color={'#115ffc'} size={28} /> Loading . . .</div>
        :
        error ?
          <p style={{ fontSize: '15px', color: 'red' }}>{error}</p>
          :
          <div>
            <div className={styles['product-info-section']} style={{ width: '100%' }}>
              <div className={styles['left-section']}>
                <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><IoArrowBack onClick={() => navigate('/admin/products')} size={26} className={styles['back']} /> {data?.category.name}</p>
                <div className={styles['product-images']}>
                  <img src={data?.media[currentImageIndex].media_url} alt="" className={styles['main-image']} />
                  <div className={styles['smaller-images']}>
                    {data?.media.map((image, index) => (
                      <img src={image.media_url} key={index} alt="" onClick={() => setCurrentImageIndex(index)} style={{ border: (currentImageIndex === index) ? "2px solid #354666" : '' }} />
                    ))}

                  </div>
                </div>
              </div>
              <div className={styles['right-section']}>
                <h3 className={styles['product-name']}>{data?.name}</h3>
                <p className={styles['product-description']}>
                  {data?.description} <br />
                  {data?.description.length < 20 && <span>Stay powered up wherever you go with this 10,000mAh power bank, designed for convenience and efficiency. With a sleek and lightweight design, it easily fits into your pocket or bag, making it perfect for travel, work, or daily use.
                  Perfect for travelers, professionals, and anyone on the go, this 10,000mAh power bank ensures you never run out of battery when you need it most!</span>}
                </p>
                <div className={styles['product-features']}>
                  <p className={styles['features-head']}>Features</p>
                  {data?.features.map((feature, index) => (
                    <li key={index} className={styles['each-feature']}>{feature}</li>
                  ))}

                </div>
                <p className={styles['product-price']}>
                  ${Number(data?.price).toLocaleString()}
                  <span className={styles['per-unit-text']}> per unit</span>
                </p>
                <p className={styles['stock']}> <span className={styles['stock-no']}>{data?.stock} items</span> left</p>

              </div>
            </div>
          </div>
      }

    </>
  )
}

export default ViewProduct