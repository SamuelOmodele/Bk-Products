import React from 'react'
import styles from './forgotPassword.module.css'
import Navbar from '../../components/navbar/navbar'
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const navigate = useNavigate();

  return (
    <div className={styles['sign-in-page']}>
      <Navbar />
      <div className={styles['content']}>
        <div className={styles['form']}>
          <h4>Forgot Password</h4>
          <p>Please Enter your email to reset your password</p>
          <div className={styles['input-box']}>
            <label htmlFor="">Email</label>
            <input type="email" placeholder='Enter your email' />
          </div>
          <button style={{marginTop: '0px'}}>Continue</button>
          <div>
            <p>Don't have an account ? <span onClick={() => navigate('/sign-up')}>Sign up</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword