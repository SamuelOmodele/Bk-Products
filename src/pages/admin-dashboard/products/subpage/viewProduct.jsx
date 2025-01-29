import React, { useState } from 'react'
import styles from './viewProduct.module.css'
import { useNavigate } from 'react-router-dom'
import { MdOutlineDone } from "react-icons/md";
import product_image from '../../../../assets/cloth.png'
import { IoAdd, IoCloseCircle } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { RiEditLine } from 'react-icons/ri';

const ViewProduct = () => {

  const navigate = useNavigate();

    const [feature, setFeature] = useState('');
    const [featureList, setFeatureList] = useState(['feature1', 'feature2', 'feature3']);
  
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
        <p className={styles['product-form-head-text']}> <IoArrowBack onClick={() => navigate('/admin/products')} size={26} className={styles['back']} />Product</p>
        <button onClick={() => navigate('/admin/products/edit')}><RiEditLine size={20} />Edit Product</button>
      </div>
      <div className={styles['product-form-body']}>
        <div className={styles['product-form-body-left']}>
          <div className={styles['form-group']}>
            <p className={styles['form-group-text']}>General Information</p>
            <div className={styles['form-field-box']}>
              <label htmlFor="">Product Name</label>
              <input type="text" placeholder='Product Name' value={'T shirt'} />
            </div>
            <div className={styles['form-field-box']}>
              <label htmlFor="">Product Description</label>
              <textarea name="" id="" placeholder='Product description' value={'Good quality T shirt'} rows={8}></textarea>
            </div>

            <p className={styles['form-group-text']}>Product Features</p>
            <div className={styles['form-field-box']}>
              {featureList && <div className={styles['features-list']}>
                {featureList.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </div>}


            </div>
            
          </div>
          <div className={styles['form-group']}>
            <p className={styles['form-group-text']}>Pricing and Stock</p>
            <div className={styles['form-field-box']}>
              <label htmlFor="">Price</label>
              <input type="text" placeholder='Price' value={'$300'}/>
            </div>
            <div className={styles['form-field-box']}>
              <label htmlFor="">Stock</label>
              <input type="number" placeholder='Stock amount' value={'58'} />
            </div>
          </div>

          {/* <div className={styles['form-group']}>
            
          </div> */}

        </div>
        <div className={styles['product-form-body-right']}>
          <div className={styles['form-group']}>
            <p className={styles['form-group-text']}>Product Image</p>
            <div className={styles['active-product-image']}>
              <img src={product_image} alt="" />
            </div>
            
            <div className={styles['small-product-image-container']}>
              <div className={styles['small-product-image']}><img src={product_image} alt="" /></div>
              <div className={styles['small-product-image']}><img src={product_image} alt="" /></div>
              {/* <div className={styles['add-icon-container']}><IoAdd size={28} className={styles['add-icon']}/></div> */}
            </div>
            
          </div>
          <div className={styles['form-group']}>
            <p className={styles['form-group-text']}>Category</p>
            <div className={styles['form-field-box']}>
              <label htmlFor="Product Category">Product Category</label>
              <select name="" id="">
                <option value="">Accessories</option>
                <option value="" selected>Clothing</option>
              </select>
              {/* <button className={styles['add-category']}>Add Category</button> */}
            </div>
          </div>

        </div>

      </div>




    </div>
  )
}

export default ViewProduct