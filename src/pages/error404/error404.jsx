import React from 'react'
import styles from './error404.module.css'
import { useNavigate } from 'react-router-dom'

const Error404 = () => {

  const navigate = useNavigate();

  return (
    <div className={styles['error404']}>
        <img src={'BK_logo.png'} className={styles['logo-img']} alt="logo" />
        <p className={styles['number']}>404</p>
        <p className={styles['main-text']}>Page Not Found</p>
        <p className={styles['description']}>The page you're looking for has been moved, removed, or doesn't exist</p>
        <button onClick={() => navigate('/')} className={styles['home-btn']}>Back to home</button>
    </div>
  )
}

export default Error404