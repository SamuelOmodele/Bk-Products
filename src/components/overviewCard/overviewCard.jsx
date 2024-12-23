import React from 'react'
import styles from './overviewCard.module.css'
import { TbCurrencyDollar } from "react-icons/tb";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { FaSackDollar } from "react-icons/fa6";
import { IoIosTrendingUp } from "react-icons/io";
import { IoIosTrendingDown } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";

const OverviewCard = ({ name, amount }) => {
    return (
        <div className={styles['overview-card']}>
            <BsThreeDots size={15} className={styles['dots']}/>

            {name === 'Products' &&
                <div className={styles['card-icon']} style={{backgroundColor: '#F4F5F6'}}>
                    <AiOutlineProduct size={28} style={{ color: '#335AFA' }} />
                </div>}
            {name === 'Orders' &&
                <div className={styles['card-icon']} style={{backgroundColor: '#FFFBEF'}}>
                    <MdOutlineShoppingCart size={28} style={{ color: '#FAD986' }} />
                </div>}
            {name === 'Sales' &&
                <div className={styles['card-icon']} style={{backgroundColor: '#EDF9FC'}}><FaSackDollar size={26} style={{ color: '#389F70' }} />
                </div>}
            <div>
                <p style={{ color: '#7A7A7A', fontSize: '14px' }}>Total {name}</p>
                <p style={{ color: '#212D5A', fontSize: '28px', fontWeight: '600' }}>{amount}</p>
                <div style={{ color: '#7A7A7A', fontSize: '12px', display: 'flex', gap: '5px'}}> <div style={{color: '#299868', fontWeight: '500'}}>+27%</div> since last month</div>
            </div>
            <IoIosTrendingUp size={48} className={styles['trend']}/>
        </div>
    )
}

export default OverviewCard