import React from 'react'
import styles from './overviewCard.module.css'
import { TbCurrencyDollar } from "react-icons/tb";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { FaSackDollar } from "react-icons/fa6";
import { IoIosTrendingUp } from "react-icons/io";
import { IoIosTrendingDown } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";

const OverviewCard = ({ name, amount, this_month }) => {
    return (
        <div className={styles['overview-card']}>
            <BsThreeDots size={15} className={styles['dots']}/>

            {/* --- card icon --- */}
            {name === 'Products' &&
                <div className={styles['card-icon']} style={{backgroundColor: '#FEF5BC'}}>
                    <AiOutlineProduct size={30} style={{ color: '#C8A823' }} />
                </div>}
            {name === 'Orders' &&
                <div className={styles['card-icon']} style={{backgroundColor: '#F1F5FF'}}>
                    <MdOutlineShoppingCart size={28} style={{ color: '#115FFC' }} />
                </div>}
            {name === 'Sales' &&
                <div className={styles['card-icon']} style={{backgroundColor: '#E8E6FC'}}>
                    <FaSackDollar size={26} style={{ color: '#5443EC' }} />
                </div>}
                
            {/* --- card text --- */}
            <div>
                <p className={styles['card-name-text']}>Total {name}</p>
                <p className={styles['card-amount-text']}>{name === 'Sales' && <span>&#8358;</span>}{amount}</p>
                <div className={styles['card-small-text']}> <div className={styles['card-percent-text']}>{name === 'Sales' && <span>&#8358;</span>}{this_month}</div>{name === 'Products' && 'products'}{name === 'Orders' && 'orders'} this month</div>
            </div>
            {/* <IoIosTrendingUp size={48} className={styles['trend']}/> */}
        </div>
    )
}

export default OverviewCard