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
import Loader from '../../../components/loader/loader';
import { FaUserCircle } from "react-icons/fa";

const Settings = () => {

    const dispatch = useDispatch();

    const [settingsTab, setSettingsTab] = useState('profile');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [profileEditData, setProfileEditData] = useState(null)
    const [profileEditLoading, setProfileEditLoading] = useState(false)
    const [profileEditError, setProfileEditError] = useState(null)

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [profilePicPreview, setProfilePicPreview] = useState('');
    const [profilePicImage, setProfilePicImage] = useState('');

    const openModal = () => {
        onOpen();
    }

    useEffect(() => {
        dispatch(setActiveSidebarMenu('settings'));
        fetchProfile();
    }, []);

    const setDisplay = (tab) => {
        setSettingsTab(tab);
        if (tab === 'profile') {
            fetchProfile();
        }
    }

    const fetchProfile = async () => {
        setData(null)
        setLoading(true);
        setError(null);
        const accessToken = localStorage.getItem('accessToken');
        console.log('loading starts ')

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/profile`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                console.log('Failed request', errorData);
                return;
            }

            const successResponse = await response.json();
            setData(successResponse);
            setFirstName(successResponse.firstname);
            setLastName(successResponse.lastname);
            setEmail(successResponse.email);
            setPhone(successResponse.phone);
            setProfilePicPreview(successResponse.profile_picture);
            console.log(successResponse);

        } catch (err) {
            setError('an unknown error occured');
            console.log('An Unknown Error occured: ', err)
        } finally {
            setLoading(false);
        }
    }

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setProfilePicImage(file);
        const imageUrl = URL.createObjectURL(file);
        setProfilePicPreview(imageUrl);
    }

    const editProfile = async () => {
        setProfileEditData(null);
        setProfileEditLoading(true);
        setProfileEditError(null);
        const accessToken = localStorage.getItem('accessToken');

        const formData = new FormData();
        formData.append('firstname', firstName);
        formData.append('lastname', lastName);
        formData.append('email', email);
        formData.append('phone', phone);
        if (profilePicImage) formData.append('profile_picture', profilePicImage)

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/profile/update`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            });

            const responseData = await response.json();
            console.log('Response from server:', responseData);

            if (!response.ok) {
                setProfileEditError(responseData.error);
                return;
            }

            setProfileEditData(responseData.message);

        } catch (err) {
            setProfileEditError('An unknown error occurred');
            console.log('An Unknown Error occurred:', err);
        } finally {
            setProfileEditLoading(false);
        }
    };

    const closeModal = (refresh) => {
        onClose();
        clearEditProfileStates();
        if (refresh) {
            fetchProfile();
        }
    }

    const clearEditProfileStates = () => {
        setProfileEditData(null);
        setProfileEditLoading(false);
        setProfileEditError(null);
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
                            <>
                                {loading ?
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: '10px', fontSize: '15px', margin: '20px 0' }}>
                                        <Loader size={32} color={'#115ffc'} /> Loading . . .
                                    </div>
                                    :
                                    <div className={styles['box1']}>
                                        {error && <p style={{ fontSize: '14px', color: 'red', marginBottom: '15px' }}>{error}</p>}
                                        <p className={styles['box-text']}>Personal Information</p>
                                        <div className={styles['box-edit']} onClick={openModal}>
                                            Edit
                                            <RiEditLine />
                                        </div>
                                        {!data?.profile_picture ?
                                            <FaUserCircle className={styles['default-profile-pic']} />
                                            :
                                            <img src={data.profile_picture} alt="" />
                                        }
                                        <div className={styles['box-row']}>
                                            <div className={styles['box-info']}>
                                                <label htmlFor=""> First Name</label>
                                                <p>{data?.firstname}</p>
                                            </div>
                                            <div className={styles['box-info']}>
                                                <label htmlFor=""> Last Name</label>
                                                <p>{data?.lastname}</p>
                                            </div>
                                        </div>
                                        <div className={styles['box-row']}>
                                            <div className={styles['box-info']}>
                                                <label htmlFor="">Email</label>
                                                <p>{data?.email}</p>
                                            </div>
                                            <div className={styles['box-info']}>
                                                <label htmlFor="">Phone no.</label>
                                                <p>{data?.phone}</p>
                                            </div>
                                        </div>
                                        <div className={styles['box-row']}>
                                            <div className={styles['box-info']}>
                                                <label htmlFor="">Role</label>
                                                <p>admin</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </>
                        }

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
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />

                {/* -- Personal Information Modal -- */}
                {settingsTab === 'profile' && <ModalContent sx={{ maxWidth: '600px' }} >
                    <ModalHeader className={styles['modal-header']}>Personal Information</ModalHeader>
                    <ModalCloseButton onClick={profileEditData ? () => closeModal(true) : () => closeModal(false)}/>
                    <ModalBody>
                        {!profileEditData && <div className={styles['modal-image']}>
                            {!profilePicPreview ?
                                <FaUserCircle className={styles['modal-default-profile-pic']} />
                                :
                                <img src={profilePicPreview} alt="" />
                            }
                            <input type="file" name="" id="file" style={{ display: 'none' }} onChange={(e) => handleImageUpload(e)} />
                            <label htmlFor='file'><div className={styles['modal-button']} style={{ cursor: 'pointer' }}>Select Image</div></label>
                        </div>}
                        {profileEditError && <p style={{ fontSize: '14px', color: 'red', marginBottom: '20px', marginTop: '-15px' }}>{profileEditError}</p>}
                        {profileEditData ?
                            <>
                                <p className={styles['success-msg']}>{profileEditData}</p>
                                <button className={styles['ok-btn']} style={{ borderRadius: '5px' }} onClick={() => closeModal(true)}>Ok</button>
                            </>
                            :
                            <>
                                <div className={styles['modal-form-row']}>
                                    <div className={styles['form-field-box']}>
                                        <label htmlFor="">First Name</label>
                                        <input type="text" placeholder='Enter First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div className={styles['form-field-box']}>
                                        <label htmlFor="">Last Name</label>
                                        <input type="text" placeholder='Enter Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                </div>
                                <div className={styles['modal-form-row']}>
                                    <div className={styles['form-field-box']} style={{ flexBasis: '100%' }}>
                                        <label htmlFor="">Email</label>
                                        <input type="text" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>

                                <div className={styles['modal-form-row']}>
                                    <div className={styles['form-field-box']} style={{ flexBasis: '100%' }}>
                                        <label htmlFor="">Phone no.</label>
                                        <input type="number" placeholder='Enter phone number' value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                </div>
                                <button className={styles['modal-button']} onClick={editProfile}>{profileEditLoading ? <Loader size={24} /> : 'Save'}</button>
                            </>
                        }


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