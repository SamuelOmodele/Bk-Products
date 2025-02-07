import React from 'react'
import styles from './resendVerificationLink.module.css'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';

const ResendVerificationLink = () => {

    const navigate = useNavigate();

    return (
        <div className={styles['sign-in-page']}>
            <Navbar />
            <div className={styles['content']}>
                <div className={styles['form']}>
                    <h4>Verify Email</h4>
                    <p>Please Enter your email to resend verification link</p>
                    <div className={styles['input-box']}>
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder='Enter your email' />
                    </div>
                    <button style={{ marginTop: '0px' }}>Send</button>
                    <div>
                        <p><span onClick={() => navigate('/sign-in')}>Back to login</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResendVerificationLink