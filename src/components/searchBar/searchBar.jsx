import React, { useEffect, useRef, useState } from 'react'
import styles from './searchBar.module.css'
import { IoIosSearch } from "react-icons/io";


const SearchBar = ({ top = '0px', focus }) => {

    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 500);
    const searchInputRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setIsLargeScreen(window.innerWidth > 500);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {

        if (searchInputRef.current && focus) {
            searchInputRef.current.focus();
        }
    }, []);



    return (
        <div className={styles['search-container']} style={{ marginTop : isLargeScreen ? top : '30px' }}>
            <div className={styles['search-box']}>
                <input type="text" placeholder='Search Product ...' ref={searchInputRef} />
                <IoIosSearch className={styles['search-icon']} />
            </div>
        </div>
    )
}

export default SearchBar