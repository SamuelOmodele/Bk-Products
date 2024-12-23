import React from 'react'
import styles from './adminOverview.module.css'
import OverviewCard from '../../../components/overviewCard/overviewCard'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import wallClock from '../../../assets/wall-clock.jpg'


const AdminOverview = () => {

  const data = [
    { name: 'January', sales: 3000 },
    { name: 'February', sales: 2000 },
    { name: 'March', sales: 4000 },
    { name: 'April', sales: 5000 },
    { name: 'May', sales: 2500 },
    { name: 'June', sales: 4500 },
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
      <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
        
        {/* -- BAR CHART -- */}
        <div style={{width: '65%'}}>
          <p style={{ marginBottom: '15px', fontSize: '18px' }}>Sales Overview</p>
          <div className={styles['chart-container']}>
            
          <div className={styles["month-box"]} style={{width: 'fit-content', marginLeft: 'auto', marginBottom: '10px'}} >6 months <IoIosArrowDown size={20} /></div>

            <ResponsiveContainer width="100%" height={273}>
              <BarChart
                data={data}
                margin={{ top: 20, right: 0, left: -15, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" style={{ fontSize: '14px', marginTop: '10px' }} />
                <YAxis style={{ fontSize: '14px' }} />
                <Bar dataKey="sales" fill="#7398FA" barSize={30} radius={[7, 7, 7, 7]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- TOP PRODUCTS --- */}
        <div style={{width: '32%'}}>
            <p style={{ marginBottom: '15px', fontSize: '18px' }}>Top Products</p>
            <div className={styles["top-product-container"]}>
              <div className={styles["head-section"]}>
                <div className={styles["month-box"]} >January <IoIosArrowDown size={20} /></div>
                <BsThreeDots size={15}/>
              </div>
              <div className={styles["top-product"]}>
                <img src={wallClock} alt="" />
                <div className={styles["right-content"]}>
                  <div className={styles["name-percent-container"]}>
                    <p className={styles["name"]}>Wall Clock</p>
                    <div className={styles["percent-container"]}>
                      <p>100/200</p>
                      <div className={styles["percent"]}>50%</div>
                    </div>
                  </div>
                  <div className={styles["outer-bar"]}>
                    <div className={styles["inner-bar"]}></div>
                  </div>
                </div>
              </div>
              <div className={styles["top-product"]}>
                <img src={wallClock} alt="" />
                <div className={styles["right-content"]}>
                  <div className={styles["name-percent-container"]}>
                    <p className={styles["name"]}>Wall Clock</p>
                    <div className={styles["percent-container"]}>
                      <p>100/200</p>
                      <div className={styles["percent"]}>50%</div>
                    </div>
                  </div>
                  <div className={styles["outer-bar"]}>
                    <div className={styles["inner-bar"]}></div>
                  </div>
                </div>
              </div>
              <div className={styles["top-product"]}>
                <img src={wallClock} alt="" />
                <div className={styles["right-content"]}>
                  <div className={styles["name-percent-container"]}>
                    <p className={styles["name"]}>Wall Clock</p>
                    <div className={styles["percent-container"]}>
                      <p>100/200</p>
                      <div className={styles["percent"]}>50%</div>
                    </div>
                  </div>
                  <div className={styles["outer-bar"]}>
                    <div className={styles["inner-bar"]}></div>
                  </div>
                </div>
              </div>
              <div className={styles["top-product"]}>
                <img src={wallClock} alt="" />
                <div className={styles["right-content"]}>
                  <div className={styles["name-percent-container"]}>
                    <p className={styles["name"]}>Wall Clock</p>
                    <div className={styles["percent-container"]}>
                      <p>100/200</p>
                      <div className={styles["percent"]}>50%</div>
                    </div>
                  </div>
                  <div className={styles["outer-bar"]}>
                    <div className={styles["inner-bar"]}></div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>

    </div>
  )
}

export default AdminOverview