import React from 'react'
import styles from './signin.module.css'
import Navbar from '../../components/navbar/navbar'

const SignIn = () => {
  return (
    <div className={styles['sign-in-page']}>
      <Navbar />
      <div className={styles['content']}>
        <div className={styles['form']}>
          <h4>Sign In</h4>
          <p>Welcome. Enter email and password to continue</p>
          <div className={styles['input-box']}>
            <label htmlFor="">Email</label>
            <input type="email" placeholder='Enter your email' />
          </div>
          <div className={styles['input-box']}>
            <label htmlFor="">Password</label>
            <input type="password" placeholder='Enter your password' />
          </div>
          <button>Sign in</button>
          <div>
            <p>Don't have an account ? <span>Sign up</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn