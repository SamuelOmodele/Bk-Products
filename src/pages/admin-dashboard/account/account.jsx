import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setActiveSidebarMenu } from '../../../redux/sidebarSlice';
import profilePic from '../../../assets/profile-image-crop.jpg'
import { RiEditLine } from "react-icons/ri";
import styles from './account.module.css'

const Account = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveSidebarMenu('account'));
    }, [])

    return (
        <div className={styles['account-page']}>
            <p className={styles['main-text']}>Account</p>
            <div className={styles['profile-container']}>
                <p className={styles['profile-text']}>My Profile</p>
                <div className={styles['content-box']}>
                    <div className={styles['box2']}>
                        <p className={styles['box-text']}>Personal Information</p>
                        <div className={styles['box-edit']}>
                            Edit
                            <RiEditLine />
                        </div>
                        <img src={profilePic} alt="" />
                        <div className={styles['box-row']}>
                            <div className={styles['box-info']}>
                                <label htmlFor=""> First Name</label>
                                <p>Samuel</p>
                            </div>
                            <div className={styles['box-info']}>
                                <label htmlFor=""> Last Name</label>
                                <p>Omodele</p>
                            </div>
                        </div>
                        <div className={styles['box-row']}>
                            <div className={styles['box-info']}>
                                <label htmlFor="">Email</label>
                                <p>abc@gmail.com</p>
                            </div>
                            <div className={styles['box-info']}>
                                <label htmlFor="">Phone no.</label>
                                <p>08012345678</p>
                            </div>
                        </div>
                        <div className={styles['box-row']}>
                            <div className={styles['box-info']}>
                                <label htmlFor="">Bio</label>
                                <p>Manager</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles['box3']}>
                        <p className={styles['box-text']}>Account Details</p>
                        <div className={styles['box-edit']}>
                            Edit
                            <RiEditLine />
                        </div>
                        <div className={styles['box-row']}>
                            <div className={styles['box-info']}>
                                <label htmlFor="">Account Name</label>
                                <p>Samuel Omodele</p>
                            </div>
                            <div className={styles['box-info']}>
                                <label htmlFor="">Account Number</label>
                                <p>9028377492</p>
                            </div>
                        </div>
                        <div className={styles['box-row']}>
                            <div className={styles['box-info']}>
                                <label htmlFor="">Bank Name</label>
                                <p>Opay</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account