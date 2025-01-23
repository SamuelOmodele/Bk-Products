import React, { useState } from 'react'
import styles from './allProducts.module.css'
import SearchBar from '../searchBar/searchBar'
import ProductCard from '../productCard/productCard'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {

  const navigate = useNavigate();

  const [lastPage, setLastPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    setCurrentPage(currentPage => currentPage < lastPage ? currentPage + 1 : currentPage)
  }
  const prevPage = () => {
    setCurrentPage(currentPage => currentPage > 1 ? currentPage - 1 : currentPage)
  }


  return (
    <>
      <div className={styles['banner']}>Shop with us Today !</div>
      
      <div onClick={() => navigate('/search')}>
        <SearchBar top='50px' />
      </div>

      <div className={styles['all-product']}>
        <div className={styles['filter']}>
          <div>Category <IoIosArrowDown size={17.5} /></div>
          <div>Price <IoIosArrowDown size={17.5} /></div>
          <div className={styles['button']}>Filter</div>
        </div>
        <div className={styles['all-product-content']}>
          <h3>Our Products</h3>
          <div className={styles['product-container']}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>

          {/* --- PAGINATION --- */}
          <div className={styles['pagination']}>
            <IoIosArrowBack size={24} onClick={prevPage} />

            {lastPage === 1 && <div className={styles['pagination-content']}>
              <div className={styles['page-number-box']} id={currentPage === 1 ? styles['active-page-number-box'] : ''}>1</div>
            </div>}

            {lastPage === 2 && <div className={styles['pagination-content']}>
              <div className={styles['page-number-box']} id={currentPage === 1 ? styles['active-page-number-box'] : ''}>1</div>
              <div className={styles['page-number-box']} id={currentPage === 2 ? styles['active-page-number-box'] : ''}>2</div>
            </div>}

            {lastPage >= 3 && <div className={styles['pagination-content']}>
              <div className={styles['page-number-box']} id={currentPage === 1 ? styles['active-page-number-box'] : ''}>1</div>
              <p>. . .</p>
              {currentPage > 1 && currentPage < lastPage && <div className={styles['pagination-content']}>
                <div className={styles['page-number-box']} id={styles['active-page-number-box']}>{currentPage}</div>
                <p>. . .</p>
              </div>}
              <div className={styles['page-number-box']} id={currentPage === lastPage ? styles['active-page-number-box'] : ''}>{lastPage}</div>
            </div>}

            <IoIosArrowForward size={24} onClick={nextPage} />
          </div>
        </div>
      </div>
    </>
  )
}

export default AllProducts