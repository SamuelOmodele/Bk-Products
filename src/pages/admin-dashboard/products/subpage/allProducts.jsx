import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { LuFilter } from "react-icons/lu";
import { IoIosArrowDown } from 'react-icons/io';
import { IoAdd } from "react-icons/io5";
import watchImage from '../../../../assets/wrist-watch.jpg'
import styles from './allProducts.module.css'
import { useNavigate } from 'react-router-dom';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaBoxOpen } from "react-icons/fa";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import Loader from '../../../../components/loader/loader';
import { HiOutlineRefresh } from "react-icons/hi";
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
import { FaRegTrashAlt } from "react-icons/fa";

const AllProducts = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [deleteError, setDeleteError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);


    const [category, setCategory] = useState('');
    const [maxPrice, setMaxprice] = useState('');
    const [status, setStatus] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const { isOpen, onOpen, onClose } = useDisclosure();

    // --- format order date function ---
    const formatDate = (raw_date) => {
        const date = new Date(raw_date);

        const formattedDate = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });

        return formattedDate;
    }

    const fetchProducts = async () => {
        setData(null)
        setLoading(true);
        setError(null);
        setCurrentProductName('');
        setActiveProductId(null);
        const accessToken = localStorage.getItem('accessToken');
        console.log('loading starts ')

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/products`, {
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

    const filterProducts = async (category_param, max_price_param, status_param) => {
        setData(null);
        setLoading(true);
        setError(null);
        setCurrentProductName('');
        setActiveProductId(null);
        const accessToken = localStorage.getItem('accessToken');

        console.log('loading starts ');
        console.log(category_param, max_price_param, status_param);

        try {
            // Build query params dynamically
            const params = new URLSearchParams();
            if (category_param) params.append('category', category_param);
            if (max_price_param) params.append('max_price', Number(max_price_param));
            if (max_price_param) params.append('min_price', 0);
            if (status_param) params.append('status', status_param);

            const queryString = params.toString();
            const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/admin/products${queryString ? `?${queryString}` : ''}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                console.log('Failed request', errorData.message);
                return;
            }

            const successResponse = await response.json();
            setData(successResponse);
            console.log(successResponse);
        } catch (err) {
            setError('An unknown error occurred');
            console.log('An Unknown Error occurred: ', err);
        } finally {
            setLoading(false);
        }
    };

    const searchProduct = async (search) => {
        setData(null);
        setLoading(true);
        setError(null);
        const accessToken = localStorage.getItem('accessToken');

        console.log('loading starts ');

        try {
            const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/admin/products/search`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: search }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                console.log('Failed request', errorData.message);
                return;
            }

            const successResponse = await response.json();
            setData(successResponse);
            console.log(successResponse);
        } catch (err) {
            setError('An unknown error occurred');
            console.log('An Unknown Error occurred: ', err);
        } finally {
            setLoading(false);
        }
    };

    const navigate = useNavigate();
    const [currentProductName, setCurrentProductName] = useState('')
    const [activeProductId, setActiveProductId] = useState(null);
    const showDeleteModal = (product_name) => {
        setCurrentProductName(product_name);
        onOpen();
    }

    const deleteProduct = async () => {

        const accessToken = localStorage.getItem('accessToken');
        console.log('loading starts for delete ');

        setDeleteError(null);
        setDeleteLoading(true);
        setDeleteMessage(null);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/products/${activeProductId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                setDeleteError(errorData.message);
                console.log('Failed request', errorData.message)
                return;
            }

            const successResponse = await response.json();
            setDeleteMessage(successResponse.message);
            console.log(successResponse);

        } catch (err) {
            setDeleteError('an unknown error occured');
            console.log('An Unknown Error occured: ', err)
        } finally {
            setDeleteLoading(false);
        }

    }

    const closeModal = () => {
        setDeleteError(null);
        setDeleteLoading(false);
        setDeleteMessage(null);
        onClose();
        fetchProducts();
    }

    return (
        <div>
            {/* --- PRODUCT FILTER CONTAINER --- */}
            <div className={styles['filter-container']}>
                <div className={styles['upper-section']}>
                    <div className={styles['search-box']}>
                        <IoSearch className={styles['search-icon']} onClick={() => searchProduct(search)} size={28} />
                        <input type="text" placeholder='Search ...' value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* <div className={styles['sort-box']}>Sort by <IoIosArrowDown size={20} /></div> */}
                        <button className={styles['add-btn']} onClick={() => navigate('/admin/products/add')}> <IoAdd size={24} /> Add new product</button>
                        <button className={styles['add-btn']} onClick={() => navigate('/admin/products/add')}> <IoAdd size={24} /> Add</button>
                    </div>
                </div>
                <div className={styles['lower-section']}>
                    <div className={styles['filter-input-box']} id={styles['category-field']}><label htmlFor="">Category</label> <div><IoIosArrowDown className={styles['filter-input-icon']} /><input type="text" placeholder='All Category' value={category} onChange={(e) => setCategory(e.target.value)} /></div></div>
                    <div className={styles['filter-input-box']} id={styles['price-field']}><label htmlFor="">Max Price</label><div><IoIosArrowDown className={styles['filter-input-icon']} /><input type="text" placeholder='Max Price' value={maxPrice} onChange={(e) => setMaxprice(e.target.value)} /></div></div>
                    <div className={styles['filter-input-box']} id={styles['status-field']}>
                        <label htmlFor="">Status</label>
                        <div>
                            <IoIosArrowDown className={styles['filter-input-icon']} />
                            <select onChange={(e) => setStatus(e.target.value)}>
                                <option value="">select</option>
                                <option value="available">available</option>
                                <option value="out_of_stock">out of stock</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles['filter-btn']} onClick={() => filterProducts(category, maxPrice, status)}>
                        {(!category && !maxPrice && !status) ?
                            <>
                                <HiOutlineRefresh />
                                <div>Refresh</div>
                            </> :
                            <>
                                <LuFilter />
                                <div>Filter</div>
                            </>
                        }
                    </div>
                </div>
            </div>
            <button className={styles['outter-refresh-btn']} onClick={fetchProducts}>Refresh</button>

            {/* --- PRODUCT LIST TABLE --- */}
            {loading ?
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: '10px', fontSize: '15px', margin: '30px 0' }}><Loader color={'#115ffc'} size={28} /> Loading . . .</div>
                :
                <div className={styles['product-table-container-overflow']}>
                    <div className={styles['product-table-container']}>

                        {/* --- Table Head --- */}
                        <div className={styles["product-table-head"]}>
                            <div className={styles["table-head-data"]} id={styles['info-column']}><input type='checkbox' /> Product Info</div>
                            <div className={styles["table-head-data"]} id={styles['category-column']}>Category</div>
                            <div className={styles["table-head-data"]} id={styles['price-column']}>Price</div>
                            <div className={styles["table-head-data"]} id={styles['status-column']}>Status</div>
                            <div className={styles["table-head-data"]} id={styles['stock-column']}>Stock</div>
                            <div className={styles["table-head-data"]} id={styles['date-column']}>Date</div>
                            <div className={styles["table-head-data"]} id={styles['action-column']}>Action</div>
                        </div>

                        {/* -- Product Data --- */}
                        {data?.map((product, index) => (
                            <div className={styles['product-row']} key={index}>
                                <div className={styles['product-row-data']} id={styles['info-column']}>
                                    <input type="checkbox" name="" id="" />
                                    <div className={styles['product-image-name']}>
                                        <img src={product.productimage} alt="" />
                                        <div>
                                            <p className={styles['product-name']}>{product.name}</p>
                                            <p className={styles['product-id']}>ID: {product.id}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['product-row-data']} id={styles['category-column']}>{product.category}</div>
                                <div className={styles['product-row-data']} id={styles['price-column']}>${Number(product.price).toLocaleString()}</div>
                                <div className={styles['product-row-data']} id={styles['status-column']}>{product.status}</div>
                                <div className={styles['product-row-data']} id={styles['stock-column']}>{product.stock}</div>
                                <div className={styles['product-row-data']} id={styles['date-column']}>{formatDate(product.created_at)}</div>
                                <div className={styles['product-row-data']} style={{ width: '8%', display: 'flex', justifyContent: 'center' }}><BiDotsVerticalRounded style={{ color: '#115FFC', opacity: '0.7', cursor: 'pointer' }} className={styles['threedot']} onClick={() => { activeProductId ? setActiveProductId(null) : setActiveProductId(product.id) }} /></div>

                                {(activeProductId === product.id) && <div className={styles['active-menu']}>
                                    <p onClick={() => navigate(`/admin/products/view/${product.id}`)}><FaBoxOpen /> View</p>
                                    <p onClick={() => navigate(`/admin/products/edit/${product.id}`)}><RiEditLine /> Edit</p>
                                    <p onClick={() => showDeleteModal(product.name)}><RiDeleteBin6Line /> Delete</p>
                                </div>}
                            </div>
                        ))}
                        {!error && !data?.length && <p style={{ fontSize: '15px', color: '#8F9395' }}>No data</p>}
                        {error && <p style={{ fontSize: '15px', color: 'red' }}>{error}</p>}

                    </div>
                </div>}

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader className={styles['modal-head']}><FaRegTrashAlt size={22} /> Delete Product</ModalHeader>
                    <ModalCloseButton onClick={closeModal} />
                    <ModalBody className={styles['modal-body']}>
                        <p>Are you sure you want to delete "<span>{currentProductName}</span>"? </p>
                        {deleteMessage && <p style={{color: 'green', fontSize: '14px', margin: '5px 0'}}>{deleteMessage}</p>}
                        {deleteError && <p style={{color: 'red', fontSize: '14px', margin: '5px 0'}}>{deleteError}</p>}
                        <div>
                            <button className={styles['cancel-btn']} onClick={closeModal}>{deleteMessage ? 'OK' : 'Cancel'}</button>
                            {!deleteMessage && <button className={styles['delete-btn']} onClick={deleteProduct}>{deleteLoading ? <Loader size={20} /> : "Delete"}</button>}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default AllProducts