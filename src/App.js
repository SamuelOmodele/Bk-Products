import './App.css';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './pages/admin-dashboard/adminLayout';
import AdminOverview from './pages/admin-dashboard/overview/adminOverview';
import AdminOrders from './pages/admin-dashboard/orders/adminOrders';
import AdminProducts from './pages/admin-dashboard/products/adminProducts';
import Delivery from './pages/admin-dashboard/delivery/delivery';
import Settings from './pages/admin-dashboard/settings/settings';
import SignIn from './pages/sign-in/signin';
import SignUp from './pages/sign-up/signup';
import Home from './pages/home/home';
import Shop from './pages/shop/shop';
import About from './pages/about/about';
import Search from './pages/search/search';
import Contact from './pages/contact/contact';
import Error404 from './pages/error404/error404';
import ProductDetails from './pages/product-details/productDetails';
import Cart from './pages/cart/cart';
import Orders from './pages/orders/orders';
import AllOrders from './pages/orders/components/orderContent/allOrders';
import OpenOrders from './pages/orders/components/orderContent/openOrders';
import ClosedOrders from './pages/orders/components/orderContent/closedOrders';
import AllProducts from './pages/admin-dashboard/products/subpage/allProducts';
import AddProduct from './pages/admin-dashboard/products/subpage/addProduct'
import EditProduct from './pages/admin-dashboard/products/subpage/editProduct'
import ViewProduct from './pages/admin-dashboard/products/subpage/viewProduct'
import ForgotPassword from './pages/forgot-password/forgotPassword';



function App() {
  return (
    <div className="App">
      <Routes>
        {/* -- CLIENT ROUTES --- */}
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/product-detail' element={<ProductDetails />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/orders' element={<Orders />}>
          <Route index element={<AllOrders />} />
          <Route path='open' element={<OpenOrders />} />
          <Route path='closed' element={<ClosedOrders />} />
        </Route>

        {/* -- ADMIN DASHBOARD ROUTES -- */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='products' element={<AdminProducts />}>
            <Route index element={<AllProducts />} />
            <Route path='add' element={<AddProduct />} />
            <Route path='view' element={<ViewProduct />} />
            <Route path='edit' element={<EditProduct />} />
          </Route>
          <Route path='delivery' element={<Delivery />} />
          <Route path='settings' element={<Settings />} />
          
        </Route>

        {/* -- SIGN IN & SIGN UP ROUTES -- */}
        <Route path='/sign-in' element={<SignIn />}/>
        <Route path='/sign-up' element={<SignUp />}/>
        <Route path='/forgot-password' element={<ForgotPassword />}/>

        {/* -- PAGE NOT FOUND -- */}
        <Route path='*' element={<Error404 />}/>

      </Routes>
    </div>
  );
}

export default App;
