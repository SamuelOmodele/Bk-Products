import React from 'react'
import styles from './editProduct.module.css'
import { MdOutlineDone } from "react-icons/md";
import upload_pic from '../../../assets/upload.png'
import product_image from '../../../assets/cloth.png'
import { IoAdd } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {

  const navigate = useNavigate();

  return (
    <div className={styles['product-form']}>
      <div className={styles['product-form-head']}>
        <p className={styles['product-form-head-text']}> <IoArrowBack onClick={() => navigate('/admin/products')} size={26} className={styles['back']} /> Edit Product</p>
        <button >Save </button>
      </div>
      <div className={styles['product-form-body']}>
        <div className={styles['product-form-body-left']}>
          <div className={styles['form-group']}>
            <p className={styles['form-group-text']}>General Information</p>
            <div className={styles['form-field-box']}>
              <label htmlFor="">Product Name</label>
              <input type="text" placeholder='Product Name' />
            </div>
            <div className={styles['form-field-box']}>
              <label htmlFor="">Product Description</label>
              <textarea name="" id="" placeholder='Product description' rows={8}></textarea>
            </div>
            <div className={styles['form-field-box']}>
              <label htmlFor="" style={{ marginBottom: '10px' }}> Gender </label>
              <input type="radio" name="" id="" /> <span>male</span>
              <input type="radio" name="" id="" style={{ marginLeft: '20px' }} /> <span>female</span>
              <input type="radio" name="" id="" style={{ marginLeft: '20px' }} /><span>all</span>
            </div>
          </div>
          <div className={styles['form-group']}>
            <p className={styles['form-group-text']}>Pricing and Stock</p>
            <div className={styles['form-field-box']}>
              <label htmlFor="">Price</label>
              <input type="text" placeholder='Price' />
            </div>
            <div className={styles['form-field-box']}>
              <label htmlFor="">Stock</label>
              <input type="number" placeholder='Stock amount' />
            </div>
          </div>

        </div>
        <div className={styles['product-form-body-right']}>
          <div className={styles['form-group']}>
            <p className={styles['form-group-text']}>Upload Image</p>
            <div className={styles['active-product-image']}>
              <img src={upload_pic} alt="" />
              <p>Click to upload image</p>
            </div>

            <div className={styles['small-product-image-container']}>
              <div className={styles['small-product-image']}><img src={product_image} alt="" /></div>
              <div className={styles['small-product-image']}><img src={product_image} alt="" /></div>
              <div className={styles['add-icon-container']}><IoAdd size={28} className={styles['add-icon']} /></div>
            </div>

          </div>
          <div className={styles['form-group']}>
            <p className={styles['form-group-text']}>Category</p>
            <div className={styles['form-field-box']}>
              <label htmlFor="Product Category">Product Category</label>
              <select name="" id="">
                <option value="">Accessories</option>
              </select>
              <button className={styles['add-category']}>Add Category</button>
            </div>
          </div>

        </div>

      </div>




    </div>
  )
}

export default EditProduct