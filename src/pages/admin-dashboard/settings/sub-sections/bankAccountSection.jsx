import React, { useEffect, useState } from 'react'
import styles from '../settings.module.css'
import { RiEditLine } from 'react-icons/ri'
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
import Loader from '../../../../components/loader/loader';

const BankAccountSection = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editData, setEditData] = useState(null)
    const [editLoading, setEditLoading] = useState(false)
    const [editError, setEditError] = useState(null)

    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bankName, setBankName] = useState('');

    useEffect(() => {
        fetchBankDetails();
    }, []);

    const fetchBankDetails = async () => {
        setData(null)
        setLoading(true);
        setError(null);
        const accessToken = localStorage.getItem('accessToken');
        console.log('loading starts ')

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/bank-details`, {
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
            setData(successResponse.bank_details[0]);
            setAccountName(successResponse.bank_details[0].account_name);
            setAccountNumber(successResponse.bank_details[0].account_number);
            setBankName(successResponse.bank_details[0].bank_name);
            console.log(successResponse);

        } catch (err) {
            setError('an unknown error occured');
            console.log('An Unknown Error occured: ', err)
        } finally {
            setLoading(false);
        }
    }

    const editBankDetails = async () => {
        setEditData(null);
        setEditLoading(true);
        setEditError(null);
        const accessToken = localStorage.getItem('accessToken');
        console.log('bank details id', data?.id)

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/bank-details/${data?.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    'bank_name': bankName,
                    'account_name': accountName,
                    'account_number': accountNumber
                })
            });

            const responseData = await response.json();
            console.log('Response from server:', responseData);

            if (!response.ok) {
                setEditError(responseData.message);
                return;
            }

            setEditData(responseData.message);

        } catch (err) {
            setEditError('An unknown error occurred');
            console.log('An Unknown Error occurred:', err);
        } finally {
            setEditLoading(false);
        }
    };

    const closeModal = (refresh) => {
        onClose();
        clearEditStates();
        if (refresh) {
            fetchBankDetails();
        }
    }

    const clearEditStates = () => {
        setEditData(null);
        setEditLoading(false);
        setEditError(null);
    }

    return (
        <>
            {loading ?
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: '10px', fontSize: '15px', margin: '20px 0' }}>
                    <Loader size={32} color={'#115ffc'} /> Loading . . .
                </div>
                :
                <div className={styles['box1']}>
                    <p className={styles['box-text']}>Account Details</p>
                    <div className={styles['box-edit']} onClick={onOpen}>
                        Edit
                        <RiEditLine />
                    </div>
                    <div className={styles['box-row']}>
                        <div className={styles['box-info']}>
                            <label htmlFor="">Account Name</label>
                            <p>{data?.account_name}</p>
                        </div>
                        <div className={styles['box-info']}>
                            <label htmlFor=""> Account Number</label>
                            <p>{data?.account_number}</p>
                        </div>
                    </div>
                    <div className={styles['box-row']}>
                        <div className={styles['box-info']}>
                            <label htmlFor="">Bank Name</label>
                            <p>{data?.bank_name}</p>
                        </div>
                    </div>
                </div>
            }

            <p style={{ color: '#ED3E4B', fontSize: '12px', fontWeight: '400', marginTop: '15px' }}>Bank details can only be modified by a super-admin</p>
            
            {/* --- MODAL --- */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                {/* -- Account Details Modal -- */}
                <ModalContent sx={{ maxWidth: '500px' }}>
                    <ModalHeader className={styles['modal-header']}>Edit Bank Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {editError && <p style={{ fontSize: '14px', color: 'red', marginBottom: '20px' }}>{editError}</p>}
                        {editData ?
                            <>
                                <p className={styles['success-msg']}>{editData}</p>
                                <button className={styles['ok-btn']} style={{ borderRadius: '5px' }} onClick={() => closeModal(true)}>Ok</button>
                            </>
                            :
                            <>
                                <div className={styles['modal-form-row']}>
                                    <div className={styles['form-field-box']}>
                                        <label htmlFor="">Bank Name</label>
                                        <input type="text" placeholder='Enter First Name' value={bankName} onChange={(e) => setBankName(e.target.value)} />
                                    </div>
                                    <div className={styles['form-field-box']}>
                                        <label htmlFor="">Account Number</label>
                                        <input type="text" placeholder='Enter Account Number' value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                                    </div>
                                </div>
                                <div className={styles['modal-form-row']}>
                                    <div className={styles['form-field-box']} style={{ flexBasis: '100%' }}>
                                        <label htmlFor="">Account Name</label>
                                        <input type="text" placeholder='Enter Account Name' value={accountName} onChange={(e) => setAccountName(e.target.value)} />
                                    </div>
                                </div>
                                <button className={styles['modal-button']} onClick={editBankDetails}>{editLoading ? <Loader size={24} /> : 'Save'}</button>
                            </>}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default BankAccountSection