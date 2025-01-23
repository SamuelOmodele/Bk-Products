import React, { useEffect, useState } from 'react'
import styles from './bkLogo.module.css'

const BkLogo = ({imageSize, headTextSize, smallTextSize}) => {

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 500);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth > 500);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles['logo-container']}>
        <img src="/BK_logo.png" alt="logo" style={{width: isLargeScreen ? imageSize : '40px', height: isLargeScreen ? imageSize : '40px'}} />
        <div className={styles['logo-texts']}>
          <p className={styles['head-text']} style={{fontSize: isLargeScreen ? headTextSize : '16px'}}>BK Products</p>
          <p className={styles['small-text']} style={{fontSize: isLargeScreen ? smallTextSize : '10px'}}>experience innovation with BK -</p>
        </div>
    </div>
  )
}

export default BkLogo