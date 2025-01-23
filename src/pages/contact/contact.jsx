import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/footer'
import styles from './contact.module.css'
import ContactUs from '../../components/contactUs/contactUs'

const Contact = () => {
  return (
    <div>
      <Navbar active={'contact'} />
      <div className={styles['content-page']}>
        <ContactUs />
        <Footer />
      </div>

    </div>
  )
}

export default Contact