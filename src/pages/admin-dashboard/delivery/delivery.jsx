import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setActiveSidebarMenu } from '../../../redux/sidebarSlice';
import styles from './delivery.module.css'
import { IoAdd } from "react-icons/io5";
import map from '../../../assets/map2.jpg'
import locationIcon from '../../../assets/location-icon.png'
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
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
import Loader from '../../../components/loader/loader';
import { MdOutlineRefresh } from "react-icons/md";

const Delivery = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [addData, setAddData] = useState(null);
    const [addLoading, setAddLoading] = useState(false);
    const [addError, setAddError] = useState(null);

    const [deleteData, setDeleteData] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const [modalAction, setModalAction] = useState(null);
    const [currentZoneId, setCurrentZoneId] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const openModal = (action, zone_id) => {
        setCurrentZoneId(zone_id);
        setModalAction(action);
        onOpen();
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveSidebarMenu('delivery'));
    }, []);

    useEffect(() => {
        fetchDelizeryZones();
    }, []);

    const fetchDelizeryZones = async () => {
        setData(null)
        setLoading(true);
        setError(null);
        const accessToken = localStorage.getItem('accessToken');
        console.log('loading starts ')

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/shipping-zones`, {
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
            console.log(successResponse);

        } catch (err) {
            setError('an unknown error occured');
            console.log('An Unknown Error occured: ', err)
        } finally {
            setLoading(false);
        }
    }

    const deleteZone = async (id) => {
        setDeleteData(null)
        setDeleteLoading(true);
        setDeleteError(null);
        const accessToken = localStorage.getItem('accessToken');
        console.log('loading starts ')

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/shipping-zones/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                setDeleteError(errorData.message);
                console.log('Failed request', errorData);
                return;
            }

            const successResponse = await response.json();
            setDeleteData(successResponse.message);
            console.log(successResponse);

        } catch (err) {
            setDeleteError('an unknown error occured');
            console.log('An Unknown Error occured: ', err)
        } finally {
            setDeleteLoading(false);
        }
    }

    const addDeliveryZone = async () => {
        setAddData(null)
        setAddLoading(true);
        setAddError(null);
        const accessToken = localStorage.getItem('accessToken');
        console.log('loading starts ')

        try {

            const formData = new FormData();

            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);

            const url = `${process.env.REACT_APP_BACKEND_BASE_URL}/admin/shipping-zones`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                const error_field = Object.keys(errorData.errors)[0];
                setAddError(errorData['errors'][error_field]);
                console.log('Failed request', errorData);
                return;
            }

            const successResponse = await response.json();
            setAddData(successResponse);
            console.log(successResponse);
        } catch (err) {
            setAddError('An unknown error occurred');
            console.log('An Unknown Error occurred: ', err);
        } finally {
            setAddLoading(false);
        }
    }

    const closeModal = () => {
        onClose();
        clearAddFeatureStates();
        clearDeleteFeatureStates();
    }

    const clearAddFeatureStates = () => {
        setTitle('');
        setDescription('');
        setPrice('');
        setAddData(null);
        setAddLoading(false);
        setAddError(null);
    }

    const clearDeleteFeatureStates = () => {
        setDeleteData(null);
        setDeleteLoading(false);
        setDeleteError(null);
    }

    return (
        <div className={styles['delivery-page']}>
            <p className={styles['main-text']}>Delivery</p>
            <div className={styles['delivery-container']}>
                <div className={styles['delivery-container-header']}>
                    <p>Delivery Zones</p>
                    <button onClick={() => openModal('add')}><IoAdd size={20} /> Add Delivery Zone</button>
                    <button onClick={() => openModal('add')} id={styles['add-short']}><IoAdd size={20} /></button>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div className={styles['filter-box']}>
                        <input type="text" name="" id="" placeholder='Search delivery zone . . . ' />
                        <button>Search</button>
                    </div>
                    <MdOutlineRefresh className={styles['refresh-icon']} onClick={fetchDelizeryZones} />
                </div>

                <div className={styles['delivery-content-box']}>
                    {error && <p style={{ fontSize: '14px', color: 'red', marginBottom: '15px' }}>{error}</p>}
                    {loading ?
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: '10px', fontSize: '15px', margin: '20px 0' }}>
                            <Loader size={32} color={'#115ffc'} /> Loading . . .
                        </div>
                        :
                        <>
                            {!data?.length && <p style={{ fontSize: '14px', color: '#555' }}>no data</p>}
                            {data?.map((zone, index) => (
                                <div className={styles['single-delivery-box']} key={index}>
                                    <img src={map} alt="" />
                                    <img src={locationIcon} className={styles['location-icon']} alt="" />
                                    <div>
                                        <p className={styles['delivery-title']}>{zone.title}</p>
                                        <p className={styles['delivery-description']}>{zone.description}</p>
                                        <p className={styles['delivery-price']}>Delivery fee: ${Number(zone.price).toLocaleString()}</p>
                                    </div>
                                    <div className={styles['single-delivery-action-box']}>
                                        <RiEditLine size={28} className={styles['action-icon']} onClick={() => openModal('edit', zone.id)} />
                                        <RiDeleteBin6Line size={28} className={styles['action-icon']} onClick={() => openModal('delete', zone.id)} />
                                    </div>
                                </div>
                            ))}
                        </>
                    }

                </div>
            </div>

            {/* --- MODAL --- */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered >
                <ModalOverlay />
                {(modalAction === 'add') && <ModalContent>
                    <ModalHeader className={styles['modal-header']}>Add Delivery Zone</ModalHeader>
                    <ModalCloseButton onClick={closeModal} />
                    <ModalBody>
                        {addError && <p className={styles['error-msg']}>{addError}</p>}
                        {addData ?

                            <>
                                <p className={styles['success-msg']}>Zone created successfully</p>
                                <button className={styles['ok-btn']} onClick={closeModal} style={{ borderRadius: '5px' }}>Ok</button>
                            </>
                            :
                            <>
                                <div className={styles['form-field-box']}>
                                    <label htmlFor="">Title</label>
                                    <input type="text" placeholder='Enter Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className={styles['form-field-box']}>
                                    <label htmlFor="">Description</label>
                                    <input type="text" placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className={styles['form-field-box']}>
                                    <label htmlFor="">Price</label>
                                    <input type="number" placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <button className={styles['modal-button']} onClick={addDeliveryZone}>{addLoading ? <Loader size={24} /> : 'Add Delivery Zone'}</button>
                            </>
                        }
                    </ModalBody>
                </ModalContent>}

                {(modalAction === 'edit') && <ModalContent>
                    <ModalHeader className={styles['modal-header']}>Edit Delivery Zone</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <div className={styles['form-field-box']}>
                            <label htmlFor="">Title</label>
                            <input type="text" placeholder='Enter Title' />
                        </div>
                        <div className={styles['form-field-box']}>
                            <label htmlFor="">Description</label>
                            <input type="text" placeholder='Enter Description' />
                        </div>
                        <div className={styles['form-field-box']}>
                            <label htmlFor="">Price</label>
                            <input type="number" placeholder='Enter Price' />
                        </div>
                        <button className={styles['modal-button']}>Save Changes</button>

                    </ModalBody>
                </ModalContent>}

                {(modalAction === 'delete') && <ModalContent>
                    <ModalHeader className={styles['modal-header']}>Delete Delivery Zone</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {deleteError && <p className={styles['error-msg']}>{deleteError}</p>}
                        {deleteData ?
                            <>
                                <p className={styles['success-msg']}>{deleteData}</p>
                                <button className={styles['ok-btn']} onClick={closeModal} style={{ borderRadius: '5px' }}>Ok</button>
                            </>
                            :
                            <>
                                <p style={{ fontSize: '15px' }}>Are you sure you want to delete this delivery zone ?</p>
                                <button className={styles['modal-button']} onClick={() => deleteZone(currentZoneId)}>{deleteLoading ? <Loader size={24} /> : 'Delete zone'}</button>
                            </>
                        }
                    </ModalBody>
                </ModalContent>}
            </Modal>
        </div>
    )
}

export default Delivery