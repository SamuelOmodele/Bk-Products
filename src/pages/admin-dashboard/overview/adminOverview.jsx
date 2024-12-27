import React from 'react'
import styles from './adminOverview.module.css'
import OverviewCard from '../../../components/overviewCard/overviewCard'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import wallClock from '../../../assets/wall-clock.jpg'
import wristWatch from '../../../assets/wrist-watch.jpg'


const AdminOverview = () => {

  const chart_data = [
    { name: 'January', sales: 3000 },
    { name: 'February', sales: 2000 },
    { name: 'March', sales: 4000 },
    { name: 'April', sales: 5000 },
    { name: 'May', sales: 2500 },
    { name: 'June', sales: 4500 },
  ];

  const top_product_data = [
    { image: wristWatch, product_name: 'Wrist Watch', fraction: '100/200', percentage: '50%' },
    { image: wristWatch, product_name: 'Wrist Watch', fraction: '100/200', percentage: '50%' },
    { image: wristWatch, product_name: 'Wrist Watch', fraction: '100/200', percentage: '50%' },
  ];



  return (
    <div className={styles['overview-container']}>
      <p className={styles['section-name']}>Overview</p>

      {/* --- OVERVIEW CARDS --- */}
      <div className={styles['overview-card-container']}>
        <OverviewCard name={'Products'} amount={276} />
        <OverviewCard name={'Orders'} amount={900} />
        <OverviewCard name={'Sales'} amount={15400} />
      </div>

      {/* --- LOWER CONTENT --- */}
      <div className={styles['lower-content']}>

        {/* -- BAR CHART CONTAINER -- */}
        <div className={styles['chart-container']}>
          <p className={styles['orders-overview-text']}>Orders Overview</p>

          <div className={styles['chart-box']}>
            <div className={styles["month-box"]} style={{ width: 'fit-content', marginLeft: 'auto', marginBottom: '10px' }} >6 months <IoIosArrowDown size={18} /></div>

            {/* -- bar chart -- */}
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chart_data} margin={{ top: 20, right: 0, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" style={{ fontSize: '14px', marginTop: '10px' }} />
                <YAxis style={{ fontSize: '14px' }} />
                <Bar dataKey="sales" fill="#115FFC" barSize={27} radius={[5, 5, 5, 5]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- TOP PRODUCTS --- */}
        <div className={styles['top-product-container']}>
          <p className={styles['top-product-text']}>Top Products</p>
          <div className={styles["top-product-box"]}>

            {/* -- month filter box -- */}
            <div className={styles["head-section"]}>
              <div className={styles["month-box"]} >January <IoIosArrowDown size={18} /></div>
              <BsThreeDots size={15} />
            </div>

            {/* -- TOP PRODUCT LIST -- */}
            {top_product_data.map((product, index) => (
              <div className={styles["top-product"]} key={index}>
                <img src={product.image} alt="" />
                <div className={styles["right-content"]}>
                  <div className={styles["name-percent-container"]}>
                    <p className={styles["name"]}>{product.product_name}</p>
                    <div className={styles["percent-container"]}>
                      <p>{product.fraction}</p>
                      <div className={styles["percent"]}>{product.percentage}</div>
                    </div>
                  </div>
                  <div className={styles["outer-bar"]}>
                    <div className={styles["inner-bar"]}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminOverview