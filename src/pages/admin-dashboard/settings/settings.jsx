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

const Settings = () => {

    const dispatch = useDispatch();

    const [modalAction, setModalAction] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const openModal = (action) => {
        setModalAction(action);
        onOpen();
    }

    useEffect(() => {
        dispatch(setActiveSidebarMenu('settings'));
    }, [])

    return (
        <div className={styles['account-page']}>
            <p className={styles['main-text']}>Settings</p>
            <div className={styles['profile-container']}>
                <p className={styles['profile-text']}>My Profile</p>
                <div className={styles['content-box']}>

                    {/* --- Personal Information Section --- */}
                    <div className={styles['box1']}>
                        <p className={styles['box-text']}>Personal Information</p>
                        <div className={styles['box-edit']} onClick={() => openModal('personal-information')}>
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
                </div>
            </div>

            {/* --- MODAL --- */}
            <Modal isOpen={isOpen} onClose={onClose}  >
                <ModalOverlay />

                {/* -- Personal Information Modal -- */}
                <ModalContent sx={{ maxWidth: '600px' }}>
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
                            <div className={styles['form-field-box']} style={{flexBasis: '100%'}}>
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
                </ModalContent>

            </Modal>

        </div>
    )
}

export default Settings