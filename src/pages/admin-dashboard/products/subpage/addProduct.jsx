import React, { useEffect, useRef, useState } from 'react'
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
import Loader from '../../../../components/loader/loader';


const AddProduct = () => {
  // /admin/category


  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [dataCategory, setDataCategory] = useState(null);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [ErrorCategory, setErrorCategory] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [featureList, setFeatureList] = useState([]);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [thumbnailImage, setThumbnailImage] = useState(null);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {

    const files = Array.from(event.target.files);
    console.log(files)
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file), // Create preview URL
    }));
    setImages((prevImages) => [...prevImages, ...newImages]); // Append new images

    // Set the first image as thumbnail if none exists
    if (newImages.length > 0 && images.length === 0) {
      setThumbnailImage(newImages[0].file);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };


  const [feature, setFeature] = useState('');

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    setDataCategory(null)
    setLoadingCategory(true);
    setErrorCategory(null);
    const accessToken = localStorage.getItem('accessToken');
    console.log('loading starts ')

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/category`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorCategory(errorData.message);
        console.log('Failed request', errorData.message)
        return;
      }

      const successResponse = await response.json();
      setDataCategory(successResponse);
      console.log(successResponse);

    } catch (err) {
      setErrorCategory('an unknown error occured');
      console.log('An Unknown Error occured: ', err)
    } finally {
      setLoadingCategory(false);
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

  const submitProduct = async () => {

    // ---  validation ---
    if (!name) {
      setError('Product name is required');
      return;
    } else if (!description) {
      setError('Product description is required');
      return;
    } else if (!featureList.length) {
      setError('Add at least one feature ');
      return;
    } else if (!price) {
      setError('Product price is required');
      return;
    } else if (!stock) {
      setError('Product stock is required');
      return;
    } else if (!images.length) {
      setError('Product image is required');
      return;
    } else if (!category) {
      setError('Product category is required');
      return;
    }

    setData(null);
    setLoading(true);
    setError(null);
    const accessToken = localStorage.getItem('accessToken');

    console.log('loading starts ');

    setLoading(true);

    try {

      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price.toString());
      formData.append('stock', stock.toString());
      formData.append('category_id', Number(category));
      formData.append('features', featureList.join(', '));
      formData.append('productimage', thumbnailImage);

      images.forEach((imageObj, index) => {
        formData.append(`productgalleryimages[${index}]`, imageObj.file);
      });

      const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/admin/products`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        const error_field = Object.keys(errorData.errors)[0];
        setError(errorData['errors'][error_field]);
        console.log('Failed request', errorData);
        return;
      }

      const successResponse = await response.json();
      setData(successResponse.message);
      setTimeout(() => {
        navigate('/admin/products')
      }, 1000);
      console.log(successResponse);
    } catch (err) {
      setError('An unknown error occurred');
      console.log('An Unknown Error occurred: ', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles['product-form']}>

      {/* -- Form header -- */}
      <div className={styles['product-form-head']}>
        <p className={styles['product-form-head-text']}> <IoArrowBack onClick={() => navigate('/admin/products')} size={26} className={styles['back']} /> Add Product</p>
        <button id={styles['desktop-add-btn']} onClick={submitProduct}>{loading ? <Loader size={20} /> : <><MdOutlineDone size={20} />Add Product</>}</button>
      </div>
      {error && <p className={styles['error-msg']}>{error}</p>}
      {data && <p className={styles['success-msg']}>{data}</p>}

      {/* -- Form Body -- */}
      <div className={styles['product-form-body']}>

        {/* -- Left Section -- */}
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

        </div>

        {/* -- Right Content -- */}
        <div className={styles['product-form-body-right']}>

          {/* -- Image section -- */}
          <div className={styles['form-group']}>
            <p className={styles['form-group-text']}>Upload Image</p>
            <div className={styles['active-product-image']}>
              <img src={upload_pic} alt="" onClick={() => fileInputRef.current.click()} />
              <input type="file" accept="image/*" multiple ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
              <p onClick={() => fileInputRef.current.click()}>Click to upload image</p>
            </div>

            <div className={styles['small-product-image-container']}>
              {images.map((image, index) => (
                <div key={index} className={styles['small-product-image']}>
                  <img src={image.preview} alt="hi" />
                  <IoCloseCircle size={20} className={styles['small-product-image-close']} onClick={() => removeImage(index)} /></div>
              ))}
              <div className={styles['add-icon-container']} onClick={() => fileInputRef.current.click()}><IoAdd size={28} className={styles['add-icon']} /></div>
            </div>

          </div>

          {/* -- Category Section -- */}
          <div className={styles['form-group']}>
            <p className={styles['form-group-text']}>Category</p>
            <div className={styles['form-field-box']}>
              <label htmlFor="Product Category">Product Category</label>
              <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
                <option value="">-- select --</option>
                {dataCategory?.map((category, index) => (
                  <option value={category.id} key={index}>{category.name}</option>
                ))}
                {loadingCategory && <option>Loading ...</option>}
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