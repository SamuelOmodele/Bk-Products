import React, { useRef, useState } from 'react'
import { MdOutlineDone } from "react-icons/md";
import upload_pic from '../../../../assets/upload.png'
import { IoAdd } from "react-icons/io5";
import styles from './addProduct.module.css'
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { IoCloseCircle } from "react-icons/io5";


const AddProduct = () => {

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [feature, setFeature] = useState('');
  const [featureList, setFeatureList] = useState([]);

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

      {/* -- Form header -- */}
      <div className={styles['product-form-head']}>
        <p className={styles['product-form-head-text']}> <IoArrowBack onClick={() => navigate('/admin/products')} size={26} className={styles['back']} /> Add Product</p>
        <button id={styles['desktop-add-btn']}><MdOutlineDone size={20} />Add Product</button>
      </div>

      {/* -- Form Body -- */}
      <div className={styles['product-form-body']}>

        {/* -- Left Section -- */}
        <div className={styles['product-form-body-left']}>
          <div className={styles['form-group']}>
            <p className={styles['form-group-text']}>General Information</p>
            <div className={styles['form-field-box']}>
              <label htmlFor="">Product Name</label>
              <input type="text" placeholder='Product Name' />
            </div>
            <div className={styles['form-field-box']}>
              <label htmlFor="">Product Description</label>
              <textarea name="" id="" placeholder='Product description' rows={4}></textarea>
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

        {/* -- Right Content -- */}
        <div className={styles['product-form-body-right']}>

          {/* -- Image section -- */}
          <div className={styles['form-group']}>
            <p className={styles['form-group-text']}>Upload Image</p>
            <div className={styles['active-product-image']}>
              <img src={upload_pic} alt="" onClick={() => fileInputRef.current.click()} />
              <input type="file" ref={fileInputRef} style={{ display: "none" }} />
              <p onClick={() => fileInputRef.current.click()}>Click to upload image</p>
            </div>

            <div className={styles['small-product-image-container']}>
              {/* <div className={styles['small-product-image']}><img src={product_image} alt="" /></div> */}
              {/* <div className={styles['small-product-image']}><img src={product_image} alt="" /></div> */}
              <div className={styles['add-icon-container']} onClick={() => fileInputRef.current.click()}><IoAdd size={28} className={styles['add-icon']} /></div>
            </div>

          </div>

          {/* -- Category Section -- */}
          <div className={styles['form-group']}>
            <p className={styles['form-group-text']}>Category</p>
            <div className={styles['form-field-box']}>
              <label htmlFor="Product Category">Product Category</label>
              <select name="" id="">
                <option value="">Accessories</option>
              </select>
              <button className={styles['add-category']} onClick={onOpen}>Add Category</button>
            </div>
          </div>

          <div className={styles['product-form-head']} >
            <button id={styles['mobile-add-btn']}><MdOutlineDone size={20} />Add Product</button>
          </div>

          {/* --- ADD CATEGORY MODAL --- */}
          <Modal isOpen={isOpen} onClose={onClose}  >
            <ModalOverlay />
            <ModalContent sx={{ maxWidth: '450px' }}>
              <ModalHeader className={styles['modal-header']}>Add Category</ModalHeader>
              <ModalCloseButton />
              <ModalBody>

                <div className={styles['form-field-box']}>
                  <label htmlFor="">Enter Category</label>
                  <input type="text" placeholder='Enter Category' />
                </div>
                <button className={styles['add-category']} style={{ margin: '0 0 15px' }}>Add Category</button>

              </ModalBody>
            </ModalContent>
          </Modal>


        </div>
      </div>
    </div>
  )
}

export default AddProduct