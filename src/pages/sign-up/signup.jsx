import React, { useState } from 'react'
import styles from './signup.module.css'
import Navbar from '../../components/navbar/navbar'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/loader';
import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {

  // --- form inputs ---
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [role, setRole] = useState('');

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Enables smooth scrolling
    });
  }

  const signUp = async() => {

    if (!firstName){
      scrollToTop();
      setError(true);
      setErrorMsg('Enter first name');
      return;
    }
    if (!lastName){
      scrollToTop();
      setError(true);
      setErrorMsg('Enter last name ');
      return;
    }
    if (!email){
      scrollToTop();
      setError(true);
      setErrorMsg('Enter email ');
      return;
    }
    if (!password){
      scrollToTop();
      setError(true);
      setErrorMsg('Enter password ');
      return;
    }
    if (!confirmPassword){
      scrollToTop();
      setError(true);
      setErrorMsg('Enter confirm password ');
      return;
    }
    if (!phoneNo){
      scrollToTop();
      setError(true);
      setErrorMsg('Enter phone number ');
      return;
    }
    if (!role){
      scrollToTop();
      setError(true);
      setErrorMsg('Enter role ');
      return;
    }
    if (password !== confirmPassword){
      scrollToTop();
      setError(true);
      setErrorMsg("passwords do not match ");
      return;
    }

    setError(false);
    setErrorMsg('');

    try{
      const formData = new FormData();
      formData.append('firstname', firstName);
      formData.append('lastname', lastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phone', phoneNo);
      formData.append('role', role);

      console.log('Loading . . .')
      setLoading(true);

      const response = await fetch('https://bkproductsonline.com/backend/api/auth/register', {
        method: 'POST',
        body: formData
      })

      // --- error response ---
      if (!response.ok){
        const errorData = await response.json();
        console.error("An error encountered: ", errorData);
        const error_field = Object.keys(errorData.errors)[0]; 
        setError(true);
        setErrorMsg(errorData['errors'][error_field]);
        setLoading(false);
        scrollToTop();
        return;
      }

      // --- success response ---
      const responseData = await response.json();
      console.log("Signup Successful", responseData);
      toast.success('Signup Successful', {
        position: "bottom-right",
        autoClose: 5000,
      })
      setLoading(false)
      clearForm();

    } catch (error){
      console.log(error);
      setError(true);
      setErrorMsg(error.message);
      setLoading(false);
      scrollToTop();
    }
  }

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPhoneNo('');
    setRole('');
  }
  
  const navigate = useNavigate();

  return (
    <div className={styles['sign-in-page']}>
      <Navbar />
      <div className={styles['content']}>
        <div className={styles['form']}>
          <h4>Sign Up</h4>
          <p>Have an account already ? <span onClick={() => navigate('/sign-in')}>Sign in</span></p>
          {error && <div className={styles["error-msg"]}>{errorMsg}</div>}
          <div className={styles['form-content']}>
            <div className={styles['half-input-box']}>
              <label htmlFor="">First Name</label>
              <input type="text" placeholder='Enter your first name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className={styles['half-input-box']}>
              <label htmlFor="">Last Name</label>
              <input type="text" placeholder='Enter your last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className={styles['input-box']}>
              <label htmlFor="">Email</label>
              <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={styles['half-input-box']}>
              <label htmlFor="">Password</label>
              <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className={styles['half-input-box']}>
              <label htmlFor="">Confirm Password</label>
              <input type="password" placeholder='confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            <div className={styles['half-input-box']}>
              <label htmlFor="">Phone no.</label>
              <input type="number" placeholder='Enter your phone number' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}/>
            </div>
            <div className={styles['half-input-box']}>
              <label htmlFor="">Role</label>
              <input type="text" placeholder='Enter role' value={role} onChange={(e) => setRole(e.target.value)} />
            </div>


          </div>
          <button onClick={signUp}>{!loading ? 'Sign up' : <Loader size={28} color={'white'}/>}</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SignUp