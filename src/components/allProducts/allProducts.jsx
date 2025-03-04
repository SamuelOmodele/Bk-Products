import React, { useEffect, useState } from 'react'
import styles from './allProducts.module.css'
import SearchBar from '../searchBar/searchBar'
import ProductCard from '../productCard/productCard'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../loader/loader'
import { IoArrowBackOutline } from 'react-icons/io5';

const AllProducts = ({ mode = 'all-product' }) => {

  const navigate = useNavigate();
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  const { searchTerm } = useParams();

  const nextPage = () => {
    if (nextPageUrl) {
      fetchProducts(nextPageUrl)
    }
  }
  const prevPage = () => {
    if (prevPageUrl) {
      fetchProducts(prevPageUrl)
    }
  }
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
    })
  }

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    scrollUp();
    console.log('mode', mode)
    if (mode === 'search') {
      searchProduct(searchTerm);
    } else {
      fetchProducts(`${process.env.REACT_APP_BACKEND_BASE_URL}/products`);
    }
  }, [searchTerm]);

  const fetchProducts = async (url) => {
    scrollUp();
    setData(null)
    setLoading(true);
    setError(null);
    console.log('loading starts')

    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        console.log('Failed request', errorData);
        return;
      }

      const successResponse = await response.json();
      setData(successResponse);
      setCurrentPage(successResponse.current_page)
      setLastPage(successResponse.last_page)
      setPrevPageUrl(successResponse.prev_page_url);
      setNextPageUrl(successResponse.next_page_url);
      console.log(successResponse);

    } catch (err) {
      setError('an unknown error occured');
      console.log('An Unknown Error occured: ', err)
    } finally {
      setLoading(false);
    }
  }

  const searchProduct = async (search_text) => {
    console.log(search_text);
    scrollUp();
    setData(null)
    setLoading(true);
    setError(null);
    console.log('loading starts')

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/products/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: search_text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        console.log('Failed request', errorData);
        return;
      }

      const successResponse = await response.json();
      setData(successResponse);
      console.log('search response', successResponse);

    } catch (err) {
      setError('an unknown error occured');
      console.log('An Unknown Error occured: ', err)
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={styles['banner']}>Shop with us Today !</div>

      <div className={styles['search']}>
        <SearchBar top='50px' />
      </div>

      <div className={styles['all-product']}>
        {mode === 'all-product' && <div className={styles['filter']}>
          <p>Filter by</p>
          <div>Category <IoIosArrowDown size={17.5} /></div>
          <div>Price <IoIosArrowDown size={17.5} /></div>
          <div className={styles['button']}>Filter</div>
        </div>}
        <div className={styles['all-product-content']}>
          <h3><IoArrowBackOutline onClick={mode === 'search' ? () => navigate('/shop') : () => navigate('/')} size={26} style={{cursor: 'pointer'}} /> {mode === 'search' ? 'Search Result' : 'Our Products'}</h3>
          <div className={styles['product-container']}>
            {error && <p style={{ fontSize: '14px', color: 'red', marginBottom: '20px' }}>{error}</p>}
            {loading ?
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%', gap: '10px', fontSize: '16px', margin: '10px 0' }}>
                <Loader size={35} color={'#115ffc'} /> Loading . . .
              </div>
              :
              <>
                {data?.data.map((product, index) => (
                  <ProductCard key={index} id={product.id} image={product.productimage} name={product.name} category={product.category} description={product.description} price={product.price} stock={product.stock} />
                ))}
                {(data?.data.length === 0 && !error) && <p>No product available</p>}
              </>
            }
          </div>

          {/* --- PAGINATION --- */}
          {mode === 'all-product' && 
          <div className={styles['pagination']}>
            <IoIosArrowBack size={24} onClick={prevPage} style={{ cursor: 'pointer' }} />

            {lastPage === 1 && <div className={styles['pagination-content']}>
              <div className={styles['page-number-box']} id={currentPage === 1 ? styles['active-page-number-box'] : ''}>1</div>
            </div>}

            {lastPage === 2 && <div className={styles['pagination-content']}>
              <div className={styles['page-number-box']} id={currentPage === 1 ? styles['active-page-number-box'] : ''}>1</div>
              <div className={styles['page-number-box']} id={currentPage === 2 ? styles['active-page-number-box'] : ''}>2</div>
            </div>}

            {lastPage >= 3 && <div className={styles['pagination-content']}>
              <div className={styles['page-number-box']} style={{ cursor: 'pointer' }} id={currentPage === 1 ? styles['active-page-number-box'] : ''} onClick={() => fetchProducts(`${process.env.REACT_APP_BACKEND_BASE_URL}/products?page=1`)}>1</div>
              <p>. . .</p>
              {currentPage > 1 && currentPage < lastPage && <div className={styles['pagination-content']}>
                <div className={styles['page-number-box']} id={styles['active-page-number-box']}>{currentPage}</div>
                <p>. . .</p>
              </div>}
              <div className={styles['page-number-box']} style={{ cursor: 'pointer' }} id={currentPage === lastPage ? styles['active-page-number-box'] : ''} onClick={() => fetchProducts(`${process.env.REACT_APP_BACKEND_BASE_URL}/products?page=${lastPage}`)}>{lastPage}</div>
            </div>}

            <IoIosArrowForward size={24} onClick={nextPage} style={{ cursor: 'pointer' }} />
          </div>}
        </div>
      </div>
    </>
  )
}

export default AllProducts