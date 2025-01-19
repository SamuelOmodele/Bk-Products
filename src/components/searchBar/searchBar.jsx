import React from 'react'
import styles from './searchBar.module.css'
import { IoIosSearch } from "react-icons/io";


const SearchBar = () => {
    return (
        <div className={styles['search-container']}>
            <div className={styles['search-box']}>
                <input type="text" placeholder='Search Product ...' />
                <IoIosSearch className={styles['search-icon']}/>
            </div>
        </div>
    )
}

export default SearchBar