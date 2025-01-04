import React from 'react'
import styles from './signup.module.css'
import Navbar from '../../components/navbar/navbar'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

  const navigate = useNavigate();

  return (
    <div className={styles['sign-in-page']}>
      <Navbar />
      <div className={styles['content']}>
        <div className={styles['form']}>
          <h4>Sign Up</h4>
          <p>Have an account already ? <span onClick={() => navigate('/sign-in')}>Sign in</span></p>
          <div className={styles['form-content']}>
            <div className={styles['input-box']} style={{width: '48%'}}>
              <label htmlFor="">First Name</label>
              <input type="text" placeholder='Enter your first name' />
            </div>
            <div className={styles['input-box']} style={{width: '48%'}}>
              <label htmlFor="">Last Name</label>
              <input type="text" placeholder='Enter your last name' />
            </div>
            <div className={styles['input-box']}>
              <label htmlFor="">Email</label>
              <input type="email" placeholder='Enter your email' />
            </div>
            <div className={styles['input-box']} style={{width: '48%'}}>
              <label htmlFor="">Password</label>
              <input type="password" placeholder='Enter your password' />
            </div>
            <div className={styles['input-box']} style={{width: '48%'}}>
              <label htmlFor="">Confrim Password</label>
              <input type="password" placeholder='confirm password' />
            </div>
            <div className={styles['input-box']} style={{width: '48%'}}>
              <label htmlFor="">Phone no.</label>
              <input type="number" placeholder='Enter your phone number' />
            </div>
            <div className={styles['input-box']} style={{width: '48%'}}>
              <label htmlFor="">Role</label>
              <input type="text" placeholder='Enter role' />
            </div>


          </div>
          <button>Sign up</button>
        </div>
      </div>
    </div>
  )
}

export default SignUp