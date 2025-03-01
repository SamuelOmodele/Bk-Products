import React, { Suspense, lazy } from 'react';
import styles from './home.module.css';
import Navbar from '../../components/navbar/navbar';
import Hero from '../../components/hero/hero';
import SearchBar from '../../components/searchBar/searchBar';
import { useNavigate } from 'react-router-dom';

// Lazy load components that aren't needed immediately
const FeaturedProducts = lazy(() => import('../../components/featuredProducts/featuredProducts'));
const NewProducts = lazy(() => import('../../components/newProducts/newProducts'));
const AboutUs = lazy(() => import('../../components/aboutUs/aboutUs'));
const StayUpdated = lazy(() => import('../../components/stayUpdated/stayUpdated'));
const Footer = lazy(() => import('../../components/footer/footer'));

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar active={'home'} />
            <div className={styles['content-page']}>
                <Hero />
                <div className={styles['search']}>
                    <SearchBar top='50px' />
                </div>

                {/* Lazy load the non-critical components */}
                <Suspense fallback={<div>Loading...</div>}>
                    <FeaturedProducts />
                    <NewProducts />
                    <AboutUs />
                    <StayUpdated />
                    <Footer />
                </Suspense>
            </div>
        </div>
    );
}

export default Home;



// import React from 'react'
// import styles from './home.module.css'
// import Navbar from '../../components/navbar/navbar'
// import Hero from '../../components/hero/hero'
// import HomeFeatures from '../../components/homeFeatures/homeFeatures'
// import FeaturedProducts from '../../components/featuredProducts/featuredProducts'
// import NewProducts from '../../components/newProducts/newProducts'
// import SearchBar from '../../components/searchBar/searchBar'
// import AboutUs from '../../components/aboutUs/aboutUs'
// import StayUpdated from '../../components/stayUpdated/stayUpdated'
// import Footer from '../../components/footer/footer'
// import { useNavigate } from 'react-router-dom'

// const Home = () => {

//     const navigate = useNavigate();

//     return (
//         <div>
//             <Navbar active={'home'} />
//             <div className={styles['content-page']}>
//                 <Hero />
//                 <div className={styles['search']}>
//                     <SearchBar top='50px' />
//                 </div>

//                 <Suspense>
//                     <FeaturedProducts />
//                     <NewProducts />
//                     <AboutUs />
//                     <StayUpdated />
//                     <Footer />
//                 </Suspense>

//             </div>

//         </div>
//     )
// }

// export default Home