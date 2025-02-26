import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setActiveSidebarMenu } from '../../../redux/sidebarSlice';
import profilePic from '../../../assets/profile-image-crop.jpg'
import { RiEditLine } from "react-icons/ri";
import styles from './settings.module.css'
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
import { RiBankFill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";

import { FaRegTrashAlt } from "react-icons/fa";

const Settings = () => {

    const dispatch = useDispatch();

    const [settingsTab, setSettingsTab] = useState('profile');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const openModal = () => {
        onOpen();
    }

    useEffect(() => {
        dispatch(setActiveSidebarMenu('settings'));
    }, [])

    return (
        <div className={styles['account-page']}>
            <p className={styles['main-text']}>Settings</p>
            <div className={styles['settings-container']}>
                <div className={styles['settings-sidebar']}>
                    <p className={settingsTab === 'profile' ? styles['active'] : styles['']} onClick={() => setSettingsTab('profile')}> <FaRegUserCircle size={20} /> Profile</p>
                    <p className={settingsTab === 'bank-details' ? styles['active'] : styles['']} onClick={() => setSettingsTab('bank-details')}><RiBankFill size={20} /> Bank Details</p>
                    <p className={settingsTab === 'manage-admin' ? styles['active'] : styles['']} onClick={() => setSettingsTab('manage-admin')}><RiAdminLine size={20} /> Manage Admin</p>
                </div>
                <div className={styles['settings-content']}>
                    <p className={styles['profile-text']}>{settingsTab === 'profile' && 'My Profile'} {settingsTab === 'bank-details' && 'Bank Details'} {settingsTab === 'manage-admin' && 'Manage Admin'} </p>
                    <div className={styles['content-box']}>

                        {/* --- Profile / Personal Information --- */}
                        {(settingsTab === 'profile') && <div className={styles['box1']}>
                            <p className={styles['box-text']}>Personal Information</p>
                            <div className={styles['box-edit']} onClick={() => openModal()}>
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
                        </div>}

                        {/* --- Bank Account Details --- */}
                        {(settingsTab === 'bank-details') && <div className={styles['box1']}>
                            <p className={styles['box-text']}>Account Details</p>
                            <div className={styles['box-edit']} onClick={() => openModal()}>
                                Edit
                                <RiEditLine />
                            </div>
                            <div className={styles['box-row']}>
                                <div className={styles['box-info']}>
                                    <label htmlFor="">Account Name</label>
                                    <p>BK PRODUCTS</p>
                                </div>
                                <div className={styles['box-info']}>
                                    <label htmlFor=""> Account Number</label>
                                    <p>0123456789</p>
                                </div>
                            </div>
                            <div className={styles['box-row']}>
                                <div className={styles['box-info']}>
                                    <label htmlFor="">Bank Name</label>
                                    <p>First Bank PLC</p>
                                </div>
                            </div>
                        </div>}
                        {(settingsTab === 'bank-details') && <p style={{ color: '#ED3E4B', fontSize: '12px', fontWeight: '400', marginTop: '15px' }}>Bank details can only be modified by a super-admin</p>}

                        {/* --- Add Admin --- */}
                        {(settingsTab === 'manage-admin') &&
                            <>
                                <div className={styles['box1']}>
                                    <p className={styles['box-text']}>Add Admin</p>
                                    <input type="text" placeholder='Enter Email' className={styles['add-admin-input']} />
                                    <button className={styles['add-admin-button']}>Add Admin</button>
                                </div>
                                <div className={styles['all-admin-box']}>
                                    <p>All Admin</p>
                                    <div className={styles['admin-list']}>
                                        <div className={styles['single-admin']}>
                                            <p>bkproduct@gmail.com</p>
                                            <p>admin</p>
                                            <FaRegTrashAlt className={styles['delete-icon']} />
                                        </div>
                                        <div className={styles['single-admin']}>
                                            <p>bkproduct@gmail.com</p>
                                            <p>admin</p>
                                            <FaRegTrashAlt className={styles['delete-icon']} />
                                        </div>
                                        <div className={styles['single-admin']}>
                                            <p>bkproduct@gmail.com</p>
                                            <p>admin</p>
                                            <FaRegTrashAlt className={styles['delete-icon']} />
                                        </div>
                                    </div>

                                </div>
                            </>}
                    </div>
                </div>
            </div>

            {/* --- MODAL --- */}
            <Modal isOpen={isOpen} onClose={onClose}  >
                <ModalOverlay />

                {/* -- Personal Information Modal -- */}
                {settingsTab === 'profile' && <ModalContent sx={{ maxWidth: '600px' }}>
                    <ModalHeader className={styles['modal-header']}>Personal Information</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className={styles['modal-image']}>
                            <img src={profilePic} alt="" />
                            <button className={styles['modal-button']}>Upload Image</button>
                        </div>
                        <div className={styles['modal-form-row']}>
                            <div className={styles['form-field-box']}>
                                <label htmlFor="">First Name</label>
                                <input type="text" placeholder='Enter First Name' />
                            </div>
                            <div className={styles['form-field-box']}>
                                <label htmlFor="">Last Name</label>
                                <input type="text" placeholder='Enter Last Name' />
                            </div>
                        </div>
                        <div className={styles['modal-form-row']}>
                            <div className={styles['form-field-box']} style={{ flexBasis: '100%' }}>
                                <label htmlFor="">Email</label>
                                <input type="text" placeholder='Enter Email' />
                            </div>
                        </div>

                        <div className={styles['modal-form-row']}>
                            <div className={styles['form-field-box']}>
                                <label htmlFor="">Phone no.</label>
                                <input type="number" placeholder='Enter phone number' />
                            </div>
                            <div className={styles['form-field-box']}>
                                <label htmlFor="">Bio</label>
                                <input type="text" placeholder='Enter Bio' />
                            </div>
                        </div>
                        <button className={styles['modal-button']}>Save</button>

                    </ModalBody>
                </ModalContent>}

                {/* -- Account Details Modal -- */}
                {settingsTab === 'bank-details' && <ModalContent sx={{ maxWidth: '500px' }}>
                    <ModalHeader className={styles['modal-header']}>Edit Bank Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className={styles['modal-form-row']}>
                            <div className={styles['form-field-box']}>
                                <label htmlFor="">Bank Name</label>
                                <input type="text" placeholder='Enter First Name' />
                            </div>
                            <div className={styles['form-field-box']}>
                                <label htmlFor="">Account Number</label>
                                <input type="text" placeholder='Enter Account Number' />
                            </div>
                        </div>
                        <div className={styles['modal-form-row']}>
                            <div className={styles['form-field-box']} style={{ flexBasis: '100%' }}>
                                <label htmlFor="">Account Name</label>
                                <input type="text" placeholder='Enter Account Name' />
                            </div>
                        </div>
                        <button className={styles['modal-button']}>Save</button>

                    </ModalBody>
                </ModalContent>}

            </Modal>

        </div>
    )
}

export default Settings