import React, { useEffect, useRef, useState } from 'react'
import styles from './searchBar.module.css'
import { IoIosSearch } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';


const SearchBar = ({ top = '0px', focus, width }) => {

    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 500);
    const searchInputRef = useRef(null);
    const searchFormRef = useRef(null);

    const [searchTerm, setSearchTerm] = useState('');

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

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        // if (searchTerm.trim()) {
        //     navigate(`/search/${searchTerm}`);
        // }
        navigate(`/search/${searchTerm}`);

    }

    const handleIconClick = () => {
        if (searchFormRef.current) {
            searchFormRef.current.requestSubmit(); // Triggers form submission
        }
    };

    return (
        <div className={styles['search-container']} style={{ marginTop: isLargeScreen ? top : '30px' }}>
            <form ref={searchFormRef} onSubmit={handleSearch} className={styles['search-box']} style={{ width: width }}>
                <input type="text" placeholder='Search Product . . .' ref={searchInputRef} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <IoIosSearch className={styles['search-icon']} onClick={handleIconClick} />
            </form>
        </div>
    )
}

export default SearchBar