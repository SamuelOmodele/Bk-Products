import React, { useEffect, useState } from 'react'
import styles from './editProduct.module.css'
import { MdOutlineDone } from "react-icons/md";
import upload_pic from '../../../../assets/upload.png'
import product_image from '../../../../assets/cloth.png'
import { IoAdd, IoCloseCircle } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../../components/loader/loader';

const EditProduct = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [feature, setFeature] = useState('');
  const [featureList, setFeatureList] = useState([]);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [editMessage, setEditMessage] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

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
      setName(successResponse.name);
      setDescription(successResponse.description);
      setFeatureList(successResponse.features);
      setPrice(successResponse.price);
      setStock(successResponse.stock);
      setData(successResponse);
      console.log(successResponse);

    } catch (err) {
      setError('an unknown error occured');
      console.log('An Unknown Error occured: ', err)
    } finally {
      setLoading(false);
    }
  }

  const editProduct = async () => {
    setEditMessage(null)
    setEditLoading(true);
    setEditError(null);
    const accessToken = localStorage.getItem('accessToken');
    console.log('loading starts for edit ')

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/products/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': name,
          'description': description,
          'price': price,
          'stock': stock,
          'features': featureList.join(', ')
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setEditError(errorData.message);
        console.log('Failed request', errorData)
        return;
      }

      const successResponse = await response.json();
      setEditMessage(successResponse.message);
      console.log(successResponse);

    } catch (err) {
      setEditError('an unknown error occured');
      console.log('An Unknown Error occured: ', err)
    } finally {
      setEditLoading(false);
    }
  }

  const addFeature = () => {
    if (feature) {
      setFeatureList(currentFeatures => [...currentFeatures, feature]);
    }
    setFeature('');
  }

  const removeFeature = (index) => {
    setFeatureList(featureList.filter((_, i) => i !== index));
  };


  return (
    <div className={styles['product-form']}>
      <div className={styles['product-form-head']}>
        <p className={styles['product-form-head-text']}> <IoArrowBack onClick={() => navigate('/admin/products')} size={26} className={styles['back']} /> Edit Product</p>
        <button id={styles['desktop-add-btn']} onClick={editProduct}>{editLoading ? <Loader size={20} color={'#fff'} /> : 'Save'}</button>
      </div>
      {loading ?
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: '10px', fontSize: '15px', margin: '10px 0' }}>
          <Loader size={32} color={'#115ffc'} /> Loading . . .
        </div>
        :
        error ?
          <p style={{ fontSize: '14px', color: 'red' }}>{error}</p>
          :
          <>
            {editError && <p style={{ fontSize: '14px', color: 'red', margin: '-10px 0 20px' }}>{editError}</p>}
            {editMessage && <p style={{ fontSize: '14px', color: 'green', margin: '-10px 0 20px' }}>{editMessage}</p>}
            <div className={styles['product-form-body']}>
              <div className={styles['product-form-body-left']}>
                <div className={styles['form-group']}>
                  <p className={styles['form-group-text']}>General Information</p>
                  <div className={styles['form-field-box']}>
                    <label htmlFor="">Product Name</label>
                    <input type="text" placeholder='Product Name' value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className={styles['form-field-box']}>
                    <label htmlFor="">Product Description</label>
                    <textarea name="" id="" placeholder='Product description' rows={4} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                  </div>

                  <p className={styles['form-group-text']}>Product Features</p>
                  <div className={styles['form-field-box']}>
                    <label htmlFor="">Add Feature</label>
                    <div className={styles['add-feature-input-box']}>
                      <input type="text" placeholder='Enter Product Feature' id={styles['add-feature-input']} value={feature} onChange={(e) => setFeature(e.target.value)} />
                      {feature && <button onClick={addFeature}>Add</button>}
                    </div>
                    {featureList && <div className={styles['features-list']}>
                      {featureList.map((feature, index) => (
                        <li key={index}>{feature} <IoCloseCircle size={20} className={styles['remove']} onClick={() => removeFeature(index)} /></li>
                      ))}
                    </div>}
                  </div>

                </div>

              </div>
              <div className={styles['product-form-body-right']}>
                <div className={styles['form-group']}>
                  <p className={styles['form-group-text']}>Pricing and Stock</p>
                  <div className={styles['form-field-box']}>
                    <label htmlFor="">Price</label>
                    <input type="text" placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
                  </div>
                  <div className={styles['form-field-box']}>
                    <label htmlFor="">Stock</label>
                    <input type="text" placeholder='Stock amount' value={stock} onChange={(e) => setStock(e.target.value)} />
                  </div>
                </div>
                <div className={styles['product-form-head']} >
                  <button id={styles['mobile-add-btn']} onClick={editProduct}>{editLoading ? <Loader size={20} color={'#fff'} /> : 'Save'}</button>
                </div>
              </div>

            </div>
          </>
      }
    </div>
  )
}

export default EditProduct