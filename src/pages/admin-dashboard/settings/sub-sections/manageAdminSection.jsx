import React from 'react'
import styles from '../settings.module.css'
import { FaRegTrashAlt } from 'react-icons/fa'

const ManageAdminSection = () => {

    return (
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
        </>
    )
}

export default ManageAdminSection