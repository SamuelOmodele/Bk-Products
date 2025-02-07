import React, { useState } from 'react'
import styles from './signup.module.css'
import Navbar from '../../components/navbar/navbar'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/loader';
import { ToastContainer, toast } from 'react-toastify';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { IoMdMailUnread } from "react-icons/io";

const SignUp = () => {

  // --- form inputs ---
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [role, setRole] = useState('');

  // const [error, setError] = useState(false);
  // const [status, setStatus] = useState('idle');
  // const [errorMsg, setErrorMsg] = useState('');
  // const [statusMsg, setStatusMsg] = useState('');
  // const [loading, setLoading] = useState(false);

  // --- API STATES ---
  const [data, setData] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Enables smooth scrolling
    });
  }

  const signUp = async () => {

    if (!firstName) {
      scrollToTop();
      setError(true);
      setMessage('Enter first name');
      return;
    }
    if (!lastName) {
      scrollToTop();
      setError(true);
      setMessage('Enter last name ');
      return;
    }
    if (!email) {
      scrollToTop();
      setError(true);
      setMessage('Enter email ');
      return;
    }
    if (!password) {
      scrollToTop();
      setError(true);
      setMessage('Enter password ');
      return;
    }
    if (!confirmPassword) {
      scrollToTop();
      setError(true);
      setMessage('Enter confirm password ');
      return;
    }
    if (!phoneNo) {
      scrollToTop();
      setError(true);
      setMessage('Enter phone number ');
      return;
    }
    if (!role) {
      scrollToTop();
      setError(true);
      setMessage('Enter role ');
      return;
    }
    if (password !== confirmPassword) {
      scrollToTop();
      setError(true);
      setMessage("passwords do not match ");
      return;
    }
    setData('');
    setError(false);
    setMessage('');
    console.log('Loading . . .')
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('firstname', firstName);
      formData.append('lastname', lastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phone', phoneNo);
      formData.append('role', role);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/register`, {
        method: 'POST',
        body: formData
      })

      // --- error response ---
      if (!response.ok) {
        const errorData = await response.json();
        console.error("An error encountered: ", errorData);
        const error_field = Object.keys(errorData.errors)[0];
        setData('');
        setError(true);
        setMessage(errorData['errors'][error_field]);
        setLoading(false);
        scrollToTop();
        return;
      }

      // --- success response ---
      const responseData = await response.json();
      console.log("Signup Successful", responseData);
      // toast.success(responseData.message, {
      //   position: "bottom-right",
      //   autoClose: 5000,
      // })
      setData(responseData);
      setError(false);
      setMessage('');
      setLoading(false)
      onOpen();
      clearForm();

    } catch (error) {
      console.log(error);
      setData('')
      setError(true);
      setMessage(error.message);
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <div className={styles['sign-in-page']}>
      <Navbar />
      <div className={styles['content']}>
        <div className={styles['form']}>
          <h4>Sign Up</h4>
          <p>Have an account already ? <span onClick={() => navigate('/sign-in')}>Sign in</span></p>
          {error && <div className={styles["error-msg"]}>{message}</div>}
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
              <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={styles['half-input-box']}>
              <label htmlFor="">Confirm Password</label>
              <input type="password" placeholder='confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className={styles['half-input-box']}>
              <label htmlFor="">Phone no.</label>
              <input type="number" placeholder='Enter your phone number' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
            </div>
            <div className={styles['half-input-box']}>
              <label htmlFor="">Role</label>
              <input type="text" placeholder='Enter role' value={role} onChange={(e) => setRole(e.target.value)} />
            </div>


          </div>
          <button onClick={signUp}>{!loading ? 'Sign up' : <Loader size={28} color={'white'} />}</button>
          <div>
            <p>Having trouble verifying email ? <span onClick={() => navigate('/resend-verification-link')}>Resend verification link</span></p>
          </div>
        </div>
      </div>
      

      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent margin={'auto'}>
          <ModalHeader style={{ textAlign: 'center' }}> Verify Email </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <IoMdMailUnread className={styles['mail-icon']}/>
            <p className={styles['modal-p']}>
              {data?.message}
              {/* Registration successful. A verification mail has been sent to your email/spam folder. */}
            </p>
            <button className={styles['modal-btn']} onClick={onClose}>Got it</button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default SignUp