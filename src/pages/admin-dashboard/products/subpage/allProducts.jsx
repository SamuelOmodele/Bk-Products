import React, { useState } from 'react';
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

const AllProducts = () => {

    const navigate = useNavigate();
    const [activeProductId, setActiveProductId] = useState(null);

    const products = [
        { id: 'RO9SJ7DS', name: 'Wrist Watch', image: watchImage, category: 'Accessories', price: '30,000', status: 'in stock', stock: '130', date: 'Dec 15' },
        { id: 'RO9SJ7DT', name: 'Wrist Watch', image: watchImage, category: 'Accessories', price: '30,000', status: 'in stock', stock: '130', date: 'Dec 15' },
        { id: 'RO9SJ7DU', name: 'Wrist Watch', image: watchImage, category: 'Accessories', price: '30,000', status: 'in stock', stock: '130', date: 'Dec 15' },
        { id: 'RO9SJ7DV', name: 'Wrist Watch', image: watchImage, category: 'Accessories', price: '30,000', status: 'in stock', stock: '130', date: 'Dec 15' },
    ]

    return (
        <div>
            {/* --- PRODUCT FILTER CONTAINER --- */}
            <div className={styles['filter-container']}>
                <div className={styles['upper-section']}>
                    <div className={styles['search-box']}>
                        <IoSearch className={styles['search-icon']} size={28} />
                        <input type="text" placeholder='Search ...' />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={styles['sort-box']}>Sort by <IoIosArrowDown size={20} /></div>
                        <button className={styles['add-btn']} onClick={() => navigate('/admin/products/add')}> <IoAdd size={24} /> Add new product</button>
                        <button className={styles['add-btn']} onClick={() => navigate('/admin/products/add')}> <IoAdd size={24} /> Add</button>
                    </div>
                </div>
                <div className={styles['lower-section']}>
                    <div className={styles['filter-input-box']} id={styles['category-field']}><label htmlFor="">Category</label> <div><IoIosArrowDown className={styles['filter-input-icon']} /><input type="text" value='All Category' /></div></div>
                    <div className={styles['filter-input-box']} id={styles['price-field']}><label htmlFor="">Price</label><div><IoIosArrowDown className={styles['filter-input-icon']} /><input type="text" value='Price' /></div></div>
                    <div className={styles['filter-input-box']} id={styles['status-field']}><label htmlFor="">Status</label><div><IoIosArrowDown className={styles['filter-input-icon']} /><input type="text" value='Status' /></div></div>
                    <div className={styles['filter-btn']}>
                        <LuFilter />
                        <div>Filter</div>
                    </div>
                </div>
            </div>

            {/* --- PRODUCT LIST TABLE --- */}
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
                    {products.map((product, index) => (
                        <div className={styles['product-row']} key={index}>
                            <div className={styles['product-row-data']} id={styles['info-column']}>
                                <input type="checkbox" name="" id="" />
                                <div className={styles['product-image-name']}>
                                    <img src={product.image} alt="" />
                                    <div>
                                        <p className={styles['product-name']}>{product.name}</p>
                                        <p className={styles['product-id']}>ID: {product.id}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles['product-row-data']} id={styles['category-column']}>{product.category}</div>
                            <div className={styles['product-row-data']} id={styles['price-column']}>${product.price}</div>
                            <div className={styles['product-row-data']} id={styles['status-column']}>{product.status}</div>
                            <div className={styles['product-row-data']} id={styles['stock-column']}>{product.stock}</div>
                            <div className={styles['product-row-data']} id={styles['date-column']}>{product.date}</div>
                            <div className={styles['product-row-data']} style={{ width: '8%', display: 'flex', justifyContent: 'center' }}><BiDotsVerticalRounded style={{ color: '#115FFC', opacity: '0.7', cursor: 'pointer' }} size={20} onClick={() => { activeProductId ? setActiveProductId(null) : setActiveProductId(product.id) }} /></div>

                            {(activeProductId === product.id) && <div className={styles['active-menu']}>
                                <p onClick={() => navigate('/admin/products/view')}><FaBoxOpen /> View</p>
                                <p onClick={() => navigate('/admin/products/edit')}><RiEditLine /> Edit</p>
                                <p><RiDeleteBin6Line /> Delete</p>
                            </div>}
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default AllProducts