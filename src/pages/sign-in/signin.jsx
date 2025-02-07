import React, { useState } from 'react'
import styles from './signin.module.css'
import Navbar from '../../components/navbar/navbar'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/loader'
import { toast, ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setIsSignedIn, setRole } from '../../redux/authSlice'

const SignIn = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [data, setData] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState()


  const signIn = async () => {

    // --- Client side validation ---
    if (!email) {
      setError(true);
      setMessage('Fill in your email');
      return;
    }
    if (!password) {
      setError(true);
      setMessage('Fill in your password');
      return;
    }

    setData('');
    setError(false);
    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      console.log('starting...')

      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/login`, {
        method: 'POST',
        body: formData, 
      });

      // --- error response ---
      if (!response.ok) {
        const errorData = await response.json();
        console.error("An error encountered: ", errorData);
        setData('');
        setError(true);
        setLoading(false);
        setMessage(errorData.error);
        return;
      }

      // --- success response ---
      const responseData = await response.json();
      console.log("Signup Successful", responseData);
      toast.success(responseData.message, {
        position: "bottom-right",
        autoClose: 3000,
      })
      localStorage.setItem('accessToken', responseData.access_token);
      dispatch(setRole(responseData.role));
      dispatch(setIsSignedIn(true));

      setTimeout(() => {
          navigate('/')
      }, 1500);
      setError(false);
      setLoading(false);
      setMessage('');

    } catch (error) {
      console.log(error);
      setData('');
      setError(true);
      setLoading(false);
      setMessage(`Error: ${error.message}`);
    }
  }

  return (
    <div className={styles['sign-in-page']}>
      <Navbar />
      <div className={styles['content']}>
        <div className={styles['form']}>
          <h4>Sign In</h4>
          <p>Welcome, Enter email and password to continue</p>
          {error && <div className={styles["error-msg"]}>{message}</div>}
          <div className={styles['input-box']}>
            <label htmlFor="">Email</label>
            <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={styles['input-box']}>
            <label htmlFor="">Password</label>
            <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <span onClick={() => navigate('/forgot-password')} style={{ float: 'right', fontWeight: '500', fontSize: '14px', marginBottom: '10px' }}>Forgot Password</span>
          <button onClick={signIn}>{!loading ? 'Sign in' : <Loader size={28} color={'white'} />}</button>
          <div>
            <p>Don't have an account ? <span onClick={() => navigate('/sign-up')}>Sign up</span></p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SignIn