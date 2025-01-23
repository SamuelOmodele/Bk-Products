import React from 'react'
import styles from './about.module.css'
import Navbar from '../../components/navbar/navbar'
import AboutUs from '../../components/aboutUs/aboutUs'
import StayUpdated from '../../components/stayUpdated/stayUpdated'
import Footer from '../../components/footer/footer'


const About = () => {
  return (
    <div>
      <Navbar active={'about'} />
      <div className={styles['content-page']}>
        <AboutUs />
        <StayUpdated />
        <Footer />
      </div>

    </div>
  )
}

export default About