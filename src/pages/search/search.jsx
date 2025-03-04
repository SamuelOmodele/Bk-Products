import React, { useEffect } from 'react'
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/footer'
import SearchBar from '../../components/searchBar/searchBar'
import styles from './search.module.css'
import no_result_search_img from '../../assets/no-result-search.jpg'
import AllProducts from '../../components/allProducts/allProducts'

const Search = () => {

    useEffect(() => (
        window.scrollTo({
            top: 0
        })
    ), []);
    
    return (
        <div>
            <Navbar active={'shop'} />
            <div className={styles['content-page']}>
                <AllProducts mode={'search'}/>
                <Footer />
            </div>
        </div>
    )
}

export default Search