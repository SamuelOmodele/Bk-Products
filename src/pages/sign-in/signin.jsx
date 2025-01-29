import React from 'react'
import styles from './signin.module.css'
import Navbar from '../../components/navbar/navbar'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {

  const navigate = useNavigate();

  return (
    <div className={styles['sign-in-page']}>
      <Navbar />
      <div className={styles['content']}>
        <div className={styles['form']}>
          <h4>Sign In</h4>
          <p>Welcome, Enter email and password to continue</p>
          <div className={styles['input-box']}>
            <label htmlFor="">Email</label>
            <input type="email" placeholder='Enter your email' />
          </div>
          <div className={styles['input-box']}>
            <label htmlFor="">Password</label>
            <input type="password" placeholder='Enter your password' />
          </div>
          <span onClick={() => navigate('/forgot-password')} style={{float: 'right', fontWeight: '500', fontSize: '14px'}}>Forgot Password</span>
          <button>Sign in</button>
          <div>
            <p>Don't have an account ? <span onClick={() => navigate('/sign-up')}>Sign up</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn