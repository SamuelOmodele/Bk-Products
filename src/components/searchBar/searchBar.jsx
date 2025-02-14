import React, { useEffect, useRef, useState } from 'react'
import styles from './searchBar.module.css'
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


const SearchBar = ({ top = '0px', focus, width}) => {

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

    const navigate =useNavigate();

    return (
        <div className={styles['search-container']} style={{ marginTop : isLargeScreen ? top : '30px'}}>
            <div className={styles['search-box']} style={{width: width}}>
                <input type="text" placeholder='Search Product . . .' ref={searchInputRef} />
                <IoIosSearch className={styles['search-icon']} onClick={() => navigate('/search')} />
            </div>
        </div>
    )
}

export default SearchBar