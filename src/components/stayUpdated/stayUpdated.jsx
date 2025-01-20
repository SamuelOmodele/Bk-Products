import React from 'react'
import { GrAnnounce } from "react-icons/gr";
import styles from './stayUpdated.module.css'

const StayUpdated = () => {
  return (
    <div className={styles['stay-updated']}>
      <div className={styles['content']}>
        <h2>Stay Updated with BK Products <GrAnnounce className={styles['icon']} size={40}/></h2>
        <p>Don’t miss out on the latest updates, exclusive deals, and new arrivals.</p>
        <div className={styles['form']}>
          <input type="text" placeholder='Enter your email . . .' />
          <button>Submit</button>
        </div>
      </div>
      {/* <div className={styles['icon']}>
        
      </div> */}
    </div>
  )
}

export default StayUpdated