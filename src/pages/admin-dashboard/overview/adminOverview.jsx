import React, { useEffect, useState } from 'react'
import styles from './adminOverview.module.css'
import OverviewCard from '../../../components/overviewCard/overviewCard'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import wristWatch from '../../../assets/wrist-watch.jpg'
import { useDispatch } from 'react-redux';
import { setActiveSidebarMenu } from '../../../redux/sidebarSlice';
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/loader/loader';


const AdminOverview = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  // --- data ---
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    dispatch(setActiveSidebarMenu('overview'));
  }, []);

  useEffect(() => {
    getDashboardStatistic();
  }, []);

  const getDashboardStatistic = async () => {

    setLoading(true);
    console.log('loading starts here ...');

    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": 'application/json'
      }

      const [res1, res2, res3, res4, res5] = await Promise.all([
        fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/totalProducts`, { headers }).then(res => res.json()),
        fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/totalOrders`, { headers }).then(res => res.json()),
        fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/ordersOverviewByMonth`, { headers }).then(res => res.json()),
        fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/mostSellingProducts`, { headers }).then(res => res.json()),
        fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/orders`, { headers }).then(res => res.json()),
      ])

      // console.log('response 1: ', res1);
      // console.log('response 2: ', res2);
      // console.log('response 3: ', res3);
      console.log('response 4: ', res4);
      console.log('response 5: ', res5.orders.slice(-3).reverse());
      setData({ totalProducts: res1, totalOrders: res2, totalRevenue: res2, topProducts: res4, orderList: res5.orders.reverse() });

    } catch (error) {
      console.log('An Error Occured', error);
      setError('Failed to fetch data')
    } finally {
      setLoading(false);
    }
  }

  // --- hard coded data ---
  const chart_data = [
    { name: 'January', sales: 3000 },
    { name: 'February', sales: 2000 },
    { name: 'March', sales: 4000 },
    { name: 'April', sales: 5000 },
    { name: 'May', sales: 2500 },
    { name: 'June', sales: 4500 },
  ];

  const top_product_data = [
    { image: wristWatch, product_name: 'SUN8 Generic Men Wrist Watch', total_sold: '100', percentage: '60%' },
    { image: wristWatch, product_name: 'SUN8 Generic Men Wrist Watch', total_sold: '90', percentage: '50%' },
    { image: wristWatch, product_name: 'SUN8 Generic Men Wrist Watch', total_sold: '80', percentage: '40%' },
    // { image: wristWatch, product_name: 'Wrist Watch', fraction: '70 items sold', percentage: '50%' },
  ];

  const orders = [
    { order_id: 'TDGN2L6BMY', customer_name: 'Omodele Samuel', payment_status: 'pending', amount: '$17,800', date: 'Dec 12' },
    { order_id: 'TDGN2L6BMY', customer_name: 'Omodele Samuel', payment_status: 'pending', amount: '$17,800', date: 'Dec 12' },
    { order_id: 'TDGN2L6BMY', customer_name: 'Omodele Samuel', payment_status: 'verified', amount: '$17,800', date: 'Dec 12' },

  ]

  const formatDate = (raw_date) => {
    const date = new Date(raw_date);

    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    return formattedDate;
  }


  return (
    <>
      {!loading ? <div className={styles['overview-container']}>
        {error && <p style={{ fontSize: '14px', color: 'red' }}>{error}</p>}
        <p className={styles['section-name']}>Overview</p>

        {/* --- OVERVIEW CARDS --- */}
        <div className={styles['overview-card-container']}>
          <OverviewCard name={'Products'} amount={data?.totalProducts.total_products || 0} this_month={data?.totalProducts.this_month || 0} />
          <OverviewCard name={'Orders'} amount={data?.totalOrders.total_orders || 0} this_month={data?.totalOrders.this_month || 0}/>
          <OverviewCard name={'Sales'} amount={Number(data?.totalRevenue.total_revenue).toLocaleString() || 0} this_month={Number(data?.totalRevenue.this_month_revenue).toLocaleString() || 0}/>
        </div>

        {/* --- LOWER CONTENT --- */}
        <div className={styles['lower-content']}>

          {/* -- BAR CHART CONTAINER -- */}
          <div className={styles['chart-container']}>
            <p className={styles['orders-overview-text']}>Orders Overview</p>

            <div className={styles['chart-box']}>
              <div className={styles["month-box"]} style={{ width: 'fit-content', marginLeft: 'auto', marginBottom: '10px' }} >last 6 months </div>

              {/* -- bar chart -- */}
              <ResponsiveContainer width="100%" height={288.5}>
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

              {/* -- month  box -- */}
              <div className={styles["head-section"]}>
                <div className={styles["month-box"]} > January  </div>
                <BsThreeDots size={15} />
              </div>

              {/* -- TOP PRODUCT LIST -- */}
              {data?.topProducts.most_selling_products.slice(0, 3).map((product, index) => (
                <div className={styles["top-product"]} key={index}>
                  <img src={product.product.productimage} alt="" />
                  {/* {console.log('product image url: ', product.product.productimage)} */}
                  <div className={styles["right-content"]}>
                    <div className={styles["name-percent-container"]}>
                      <p className={styles["name"]}>{product.product.name}</p>
                      <div className={styles["percent-container"]}>
                        <p>{product.total_sold} items sold</p>
                        {/* <div className={styles["percent"]}>{product.percentage}</div> */}
                      </div>
                    </div>
                    <div className={styles["outer-bar"]}>
                      <div className={styles["inner-bar"]} style={{ width: product.percentage }}></div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>

        {/* --- ORDER HISTORY --- */}
        <div className={styles['order-history']}>
          <p className={styles['order-history-text']}>Orders History</p>

          <div className={styles['overflow-container']}>
            <div className={styles['order-table-container']}>
              {/* --- Table Head --- */}
              <div className={styles["order-table-head"]}>
                <div className={styles["table-head-data"]} id={styles['id-cell']}><input type="checkbox" name="" id="" />Order Id</div>
                <div className={styles["table-head-data"]} id={styles['customer-cell']}>Customer</div>
                <div className={styles["table-head-data"]} id={styles['payment-cell']}>Payment status</div>
                <div className={styles["table-head-data"]} id={styles['amount-cell']}>Amount</div>
                <div className={styles["table-head-data"]} id={styles['date-cell']}>Date</div>
              </div>

              {/* -- Order Data --- */}
              {data?.orderList.map((order, index) => (
                <div className={styles['order-row']} key={index}>
                  <div className={styles['order-row-data']} id={styles['id-cell']}><input type="checkbox" name="" id="" />{order.order_id}</div>
                  <div className={styles['order-row-data']} id={styles['customer-cell']}>{order.firstname} {order.lastname}</div>
                  <div className={styles['order-row-data']} style={{ color: order.payment_status === 'Pending' ? '#F77C27' : order.payment_status === 'Submitted'? '#115FFC' : order.payment_status === "Verified" ? '#21A168' : 'red', fontSize: '14px', fontWeight: '300' }} id={styles['payment-cell']}>{order.payment_status}</div>
                  <div className={styles['order-row-data']} id={styles['amount-cell']}>{Number(order.total_amount).toLocaleString()}</div>
                  <div className={styles['order-row-data']} id={styles['date-cell']}>{formatDate(order.created_at)}</div>
                </div>
              ))}
              <span onClick={() => navigate('/admin/orders')} className={styles['view-all-text']}>view all <FaLongArrowAltRight size={16} /></span>
            </div>
          </div>

        </div>

      </div> :
        // --- LOADER ---
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: '10px', fontSize: '15px', margin: '50px 0'}}><Loader color={'#115ffc'} size={38} /> Loading . . .</div>
      }
    </>
  )
}

export default AdminOverview