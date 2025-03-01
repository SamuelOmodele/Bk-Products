import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setActiveSidebarMenu } from '../../../redux/sidebarSlice';
import profilePic from '../../../assets/profile-image-crop.jpg'
import { RiEditLine } from "react-icons/ri";
import styles from './settings.module.css'

import { RiBankFill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import Loader from '../../../components/loader/loader';
import { FaUserCircle } from "react-icons/fa";
import ProfileSection from './sub-sections/profileSection';
import BankAccountSection from './sub-sections/bankAccountSection';
import ManageAdminSection from './sub-sections/manageAdminSection';

const Settings = () => {

    const dispatch = useDispatch();

    const [settingsTab, setSettingsTab] = useState('profile');

    useEffect(() => {
        dispatch(setActiveSidebarMenu('settings'));
    }, []);

    const setDisplay = (tab) => {
        setSettingsTab(tab);
    }


    return (
        <div className={styles['account-page']}>
            <p className={styles['main-text']}>Settings</p>
            <div className={styles['settings-container']}>
                <div className={styles['settings-sidebar']}>
                    <p className={settingsTab === 'profile' ? styles['active'] : styles['']} onClick={() => setDisplay('profile')}> <FaRegUserCircle size={20} /> Profile</p>
                    <p className={settingsTab === 'bank-details' ? styles['active'] : styles['']} onClick={() => setDisplay('bank-details')}><RiBankFill size={20} /> Bank Details</p>
                    <p className={settingsTab === 'manage-admin' ? styles['active'] : styles['']} onClick={() => setDisplay('manage-admin')}><RiAdminLine size={20} /> Manage Admin</p>
                </div>

                <div className={styles['settings-content']}>
                    <p className={styles['profile-text']}>{settingsTab === 'profile' && 'My Profile'} {settingsTab === 'bank-details' && 'Bank Details'} {settingsTab === 'manage-admin' && 'Manage Admin'} </p>
                    <div className={styles['content-box']}>

                        {/* --- Profile / Personal Information --- */}
                        {(settingsTab === 'profile') &&
                            <ProfileSection />
                        }

                        {/* --- Bank Account Details --- */}
                        {(settingsTab === 'bank-details') &&
                            <BankAccountSection />
                        }

                        {/* --- Add Admin --- */}
                        {(settingsTab === 'manage-admin') &&
                            <ManageAdminSection />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings