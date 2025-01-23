import React, { useEffect } from 'react'
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/footer'
import SearchBar from '../../components/searchBar/searchBar'
import styles from './search.module.css'
import no_result_search_img from '../../assets/no-result-search.jpg'

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
                <SearchBar top='30px' focus={true}/>
                <img src={no_result_search_img} alt="" className={styles['search-img']}/>
                <Footer />
            </div>
        </div>
    )
}

export default Search