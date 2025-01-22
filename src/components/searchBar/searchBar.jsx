import React, { useEffect, useRef } from 'react'
import styles from './searchBar.module.css'
import { IoIosSearch } from "react-icons/io";


const SearchBar = ({top = '0px', focus}) => {

    const searchInputRef = useRef(null);

    useEffect(() => {

        if (searchInputRef.current && focus) {
            searchInputRef.current.focus();
        }
    }, []);



    return (
        <div className={styles['search-container']} style={{marginTop: top}}>
            <div className={styles['search-box']}>
                <input type="text" placeholder='Search Product ...' ref={searchInputRef} />
                <IoIosSearch className={styles['search-icon']}/>
            </div>
        </div>
    )
}

export default SearchBar