import React from 'react'
import styles from './bkLogo.module.css'

const BkLogo = ({imageSize, headTextSize, smallTextSize}) => {
  return (
    <div className={styles['logo-container']}>
        <img src="/BK_logo.png" alt="logo" style={{width: imageSize, height: imageSize}} />
        <div className={styles['logo-texts']}>
          <p className={styles['head-text']} style={{fontSize: headTextSize}}>BK Products</p>
          <p className={styles['small-text']} style={{fontSize: smallTextSize}}> -experience innovation with BK -</p>
        </div>
    </div>
  )
}

export default BkLogo