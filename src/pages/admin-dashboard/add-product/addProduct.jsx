import React from 'react'
import './addProduct.module.css'
import { MdOutlineDone } from "react-icons/md";
import upload_vector from '../../../assets/upload-pic.jpg'
import product_image from '../../../assets/hoodie.jpg'
import { IoAdd } from "react-icons/io5";
import styles from './addProduct.module.css'


const AddProduct = () => {
  return (
    <div className={styles['product-form']}>
      <div className={styles['product-form-head']}>
        <p className={styles['product-form-head-text']}>Add Product</p>
        <button ><MdOutlineDone size={20} />Add Product</button>
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
              <label htmlFor="" style={{marginBottom: '10px'}}> Gender </label>
              <input type="radio" name="" id="" /> <span>male</span>
              <input type="radio" name="" id="" style={{marginLeft: '20px'}} /> <span>female</span>
              <input type="radio" name="" id="" style={{marginLeft: '20px'}}/><span>all</span>
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
            <div className={styles['small-product-image-container']}>
              <div><IoAdd /></div>
            </div>
            
          </div>
          <div className={styles['form-group']}>
            <p className={styles['form-group-text']}>Category</p>
            <div>
              <label htmlFor="Product Category">Product Category</label>
              <select name="" id="">
                <option value="">Accessories</option>
              </select>
              <button>Add Category</button>
            </div>
          </div>

        </div>

      </div>




    </div>
  )
}

export default AddProduct