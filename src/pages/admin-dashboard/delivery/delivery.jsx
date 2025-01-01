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

const Delivery = () => {

    const [modalAction, setModalAction] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const openModal = (action) => {
        setModalAction(action);
        onOpen();
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveSidebarMenu('delivery'));
    }, [])

    return (
        <div className={styles['delivery-page']}>
            <p className={styles['main-text']}>Delivery</p>
            <div className={styles['delivery-container']}>
                <div className={styles['delivery-container-header']}>
                    <p>Delivery Zones</p>
                    <button onClick={() => openModal('add')}><IoAdd size={20} /> Add Delivery Zone</button>
                </div>
                <div className={styles['filter-box']}>
                    <input type="number" name="" id="" placeholder='Min Amount'/>
                    <input type="number" name="" id="" placeholder='Max Amount'/>
                    <button>Filter</button>
                </div>
                <div className={styles['delivery-content-box']}>
                    <div className={styles['single-delivery-box']}>
                        <img src={map} alt="" />
                        <img src={locationIcon} className={styles['location-icon']} alt="" />
                        <div>
                            <p className={styles['delivery-title']}>Ikeja, Lagos State</p>
                            <p className={styles['delivery-description']}>Delivery takes between 4 to 5 working days</p>
                            <p className={styles['delivery-price']}>Delivery fee: $450</p>
                        </div>
                        <div className={styles['single-delivery-action-box']}>
                            <RiEditLine size={28} className={styles['action-icon']} onClick={() => openModal('edit')} />
                            <RiDeleteBin6Line size={28} className={styles['action-icon']} onClick={() => openModal('delete')}/>
                        </div>
                    </div>
                    <div className={styles['single-delivery-box']}>
                        <img src={map} alt="" />
                        <img src={locationIcon} className={styles['location-icon']} alt="" />
                        <div>
                            <p className={styles['delivery-title']}>Ikeja, Lagos State</p>
                            <p className={styles['delivery-description']}>Delivery takes between 4 to 5 working days</p>
                            <p className={styles['delivery-price']}>Delivery fee: $450</p>
                        </div>
                        <div className={styles['single-delivery-action-box']}>
                            <RiEditLine size={28} className={styles['action-icon']} onClick={() => openModal('edit')} />
                            <RiDeleteBin6Line size={28} className={styles['action-icon']} onClick={() => openModal('delete')}/>
                        </div>
                    </div>
                    <div className={styles['single-delivery-box']}>
                        <img src={map} alt="" />
                        <img src={locationIcon} className={styles['location-icon']} alt="" />
                        <div>
                            <p className={styles['delivery-title']}>Ikeja, Lagos State</p>
                            <p className={styles['delivery-description']}>Delivery takes between 4 to 5 working days</p>
                            <p className={styles['delivery-price']}>Delivery fee: $450</p>
                        </div>
                        <div className={styles['single-delivery-action-box']}>
                            <RiEditLine size={28} className={styles['action-icon']} onClick={() => openModal('edit')} />
                            <RiDeleteBin6Line size={28} className={styles['action-icon']} onClick={() => openModal('delete')}/>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- MODAL --- */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered >
                <ModalOverlay />
                { (modalAction === 'add') && <ModalContent>
                    <ModalHeader className={styles['modal-header']}>Add Delivery Zone</ModalHeader>
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
                        <button className={styles['modal-button']}>Add Delivery Zone</button>

                    </ModalBody>
                </ModalContent>}

                { (modalAction === 'edit') && <ModalContent>
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

                { (modalAction === 'delete') && <ModalContent>
                    <ModalHeader className={styles['modal-header']}>Delete Delivery Zone</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p style={{fontSize: '15px'}}>Are you sure you want to delete this delivery zone ?</p>
                        <button className={styles['modal-button']}>Delete</button>

                    </ModalBody>
                </ModalContent>}
            </Modal>
        </div>
    )
}

export default Delivery